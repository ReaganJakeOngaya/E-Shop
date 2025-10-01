from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.order import Order, OrderItem
from app.models.cart import Cart, CartItem
from app.models.user import User
from app.models.product import Product
from app.schemas.order_schema import order_schema, orders_schema, create_order_schema, update_order_schema

order_bp = Blueprint('order', __name__)

@order_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # Admin can see all orders, regular users only their own
    if user.is_admin:
        orders = Order.query.order_by(Order.created_at.desc()).all()
    else:
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    
    return jsonify(orders_schema.dump(orders)), 200

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    order = Order.query.get_or_404(order_id)
    
    # Check if user owns the order or is admin
    if order.user_id != user_id and not user.is_admin:
        return jsonify({'message': 'Access denied'}), 403
    
    return jsonify(order_schema.dump(order)), 200

@order_bp.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # Validate input data
    errors = create_order_schema.validate(request.json)
    if errors:
        return jsonify({'errors': errors}), 400
    
    data = create_order_schema.load(request.json)
    
    if not user.cart or not user.cart.items:
        return jsonify({'message': 'Cart is empty'}), 400
    
    # Check stock availability and prepare order items
    order_items = []
    total_amount = 0
    
    for cart_item in user.cart.items:
        if cart_item.product.stock < cart_item.quantity:
            return jsonify({
                'message': f'Insufficient stock for {cart_item.product.name}. Available: {cart_item.product.stock}, Requested: {cart_item.quantity}'
            }), 400
        
        # Calculate item total and add to order items
        item_total = cart_item.product.price * cart_item.quantity
        total_amount += item_total
        
        order_items.append({
            'product_id': cart_item.product.id,
            'quantity': cart_item.quantity,
            'price': cart_item.product.price
        })
    
    # Create order
    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        shipping_address=data['shipping_address'],
        status='pending'
    )
    db.session.add(order)
    db.session.flush()  # Get order ID
    
    # Create order items and update stock
    for item_data in order_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item_data['product_id'],
            quantity=item_data['quantity'],
            price=item_data['price']
        )
        db.session.add(order_item)
        
        # Update product stock
        product = Product.query.get(item_data['product_id'])
        product.stock -= item_data['quantity']
    
    # Clear cart
    CartItem.query.filter_by(cart_id=user.cart.id).delete()
    db.session.commit()
    
    return jsonify(order_schema.dump(order)), 201

@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
@jwt_required()
def update_order(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    order = Order.query.get_or_404(order_id)
    
    # Only admin can update orders, or users can update their own pending orders
    if not user.is_admin and (order.user_id != user_id or order.status != 'pending'):
        return jsonify({'message': 'Access denied'}), 403
    
    # Validate input data
    errors = update_order_schema.validate(request.json)
    if errors:
        return jsonify({'errors': errors}), 400
    
    data = update_order_schema.load(request.json)
    
    # Update order fields
    if 'status' in data:
        order.status = data['status']
    if 'shipping_address' in data:
        order.shipping_address = data['shipping_address']
    
    db.session.commit()
    
    return jsonify(order_schema.dump(order)), 200

@order_bp.route('/orders/<int:order_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_order(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    order = Order.query.get_or_404(order_id)
    
    # Check if user owns the order or is admin
    if order.user_id != user_id and not user.is_admin:
        return jsonify({'message': 'Access denied'}), 403
    
    # Only pending or processing orders can be cancelled
    if order.status not in ['pending', 'processing']:
        return jsonify({'message': 'Order cannot be cancelled at this stage'}), 400
    
    # Restore product stock
    for order_item in order.items:
        product = Product.query.get(order_item.product_id)
        product.stock += order_item.quantity
    
    order.status = 'cancelled'
    db.session.commit()
    
    return jsonify(order_schema.dump(order)), 200

@order_bp.route('/orders/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_orders(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    # Only admin can view other users' orders
    if user_id != current_user_id and not current_user.is_admin:
        return jsonify({'message': 'Access denied'}), 403
    
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify(orders_schema.dump(orders)), 200