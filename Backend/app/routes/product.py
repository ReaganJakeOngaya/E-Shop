from flask import Blueprint, request, jsonify
from app.models.product import Product
from app import db

bp = Blueprint('product', __name__, url_prefix='/api/products')

@bp.route('/', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(
        name=data['name'],
        feature=data['feature'],
        price=data['price'],
        images=','.join(data['images']),  # Convert list to comma-separated string
        category=data['category'],
        color=data['color'],
        description=data['description']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully'}), 201

@bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = [
        {
            'id': product.id,
            'name': product.name,
            'feature': product.feature,
            'price': product.price,
            'images': product.images.split(','),  # Convert back to list
            'category': product.category,
            'color': product.color,
            'description': product.description
        }
        for product in products
    ]
    return jsonify(result), 200
