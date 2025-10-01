from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

def create_app(config_class=None):
    app = Flask(__name__)
    
    # Load configuration
    if config_class is None:
        try:
            from config import Config
            config_class = Config
        except ImportError:
            # Fallback configuration
            class Config:
                SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
                SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///ecommerce.db'
                SQLALCHEMY_TRACK_MODIFICATIONS = False
                JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key-change-in-production'
                JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour in seconds
            
            config_class = Config
        
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    # Register blueprints
    from app.routes.user import user_bp
    from app.routes.product import product_bp
    from app.routes.cart import cart_bp
    from app.routes.order import order_bp

    app.register_blueprint(user_bp, url_prefix='/api/auth')
    app.register_blueprint(product_bp, url_prefix='/api')
    app.register_blueprint(cart_bp, url_prefix='/api')
    app.register_blueprint(order_bp, url_prefix='/api')

    return app