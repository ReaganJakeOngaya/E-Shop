from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user.cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()
    
    return jsonify(user.cart.to_dict()), 200

@cart_bp.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    product = Product.query.get_or_404(product_id)
    
    if product.stock < quantity:
        return jsonify({'message': 'Insufficient stock'}), 400
    
    # Get or create cart
    if not user.cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()
    
    cart = user.cart
    
    # Check if item already in cart
    cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()
    
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify(cart.to_dict()), 200

@cart_bp.route('/cart/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    
    quantity = data.get('quantity')
    
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=user.cart.id).first_or_404()
    
    if quantity <= 0:
        db.session.delete(cart_item)
    else:
        if cart_item.product.stock < quantity:
            return jsonify({'message': 'Insufficient stock'}), 400
        cart_item.quantity = quantity
    
    db.session.commit()
    return jsonify(user.cart.to_dict()), 200

@cart_bp.route('/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=user.cart.id).first_or_404()
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify(user.cart.to_dict()), 200

@cart_bp.route('/cart/clear', methods=['DELETE'])
@jwt_required()
def clear_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    CartItem.query.filter_by(cart_id=user.cart.id).delete()
    db.session.commit()
    
    return jsonify({'message': 'Cart cleared successfully'}), 200