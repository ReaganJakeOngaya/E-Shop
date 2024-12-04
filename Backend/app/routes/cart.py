from flask import Blueprint, request, jsonify
from app.models.cart import Cart
from app import db

bp = Blueprint('cart', __name__, url_prefix='/api/cart')

@bp.route('/', methods=['POST'])
def add_to_cart():
    data = request.json
    new_cart_item = Cart(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity']
    )
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({'message': 'Item added to cart'}), 201

@bp.route('/', methods=['GET'])
def get_cart_items():
    user_id = request.args.get('user_id')
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    result = [
        {
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'feature': item.product.feature,
                'price': item.product.price,
                'images': item.product.images.split(','),  # Convert back to list
                'description': item.product.description
            },
            'quantity': item.quantity
        }
        for item in cart_items
    ]
    return jsonify(result), 200
