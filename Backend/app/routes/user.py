from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.cart import Cart

user_bp = Blueprint('user', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'Email already exists'}), 400

    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    
    # Better admin detection - check for specific admin email pattern
    admin_emails = ['admin@example.com', 'administrator@example.com']  # Add your email here
    if data.get('email') in admin_emails:
        user.is_admin = True
    # Or use a secret key in the request
    elif data.get('admin_key') == 'YOUR_ADMIN_SECRET_KEY':  # Set this in your .env
        user.is_admin = True
    
    db.session.add(user)
    db.session.commit()
    
    # Create a cart for the user
    cart = Cart(user_id=user.id)
    db.session.add(cart)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({
        'message': 'User created successfully',
        'access_token': access_token,
        'user': user.to_dict()
    }), 201

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict()), 200
