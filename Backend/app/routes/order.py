from flask import Blueprint, request, jsonify
from app.models.order import Order
from app import db
import json

bp = Blueprint('order', __name__, url_prefix='/api/orders')

@bp.route('/', methods=['POST'])
def place_order():
    data = request.json
    new_order = Order(
        user_id=data['user_id'],
        products=json.dumps(data['products']),  # Convert list to JSON string
        total_price=data['total_price']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order placed successfully'}), 201

@bp.route('/', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    orders = Order.query.filter_by(user_id=user_id).all()
    result = [
        {
            'id': order.id,
            'products': json.loads(order.products),  # Convert JSON string back to list
            'total_price': order.total_price,
            'status': order.status
        }
        for order in orders
    ]
    return jsonify(result), 200
