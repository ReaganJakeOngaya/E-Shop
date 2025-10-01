import os

class DevelopmentConfig:
    DEBUG = True
    TESTING = False
    SECRET_KEY = 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///ecommerce_dev.db'
    JWT_SECRET_KEY = 'jwt-dev-secret-key'

class ProductionConfig:
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

class TestingConfig:
    TESTING = True
    SECRET_KEY = 'test-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///ecommerce_test.db'
    JWT_SECRET_KEY = 'jwt-test-secret-key'