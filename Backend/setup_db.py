# setup_db.py
from app import app, db, User, Product, Cart
from werkzeug.security import generate_password_hash

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Check if we already have products to avoid duplicates
        if Product.query.first() is None:
            # Add sample products
            products = [
                Product(
                    name='Laptop',
                    description='High-performance laptop for professionals',
                    price=999.99,
                    category='Electronics',
                    image_url='https://placeholder.com/laptop.jpg'
                ),
                Product(
                    name='Smartphone',
                    description='Latest model smartphone',
                    price=699.99,
                    category='Electronics',
                    image_url='https://placeholder.com/phone.jpg'
                ),
                Product(
                    name='Running Shoes',
                    description='Comfortable running shoes for athletes',
                    price=89.99,
                    category='Sports',
                    image_url='https://placeholder.com/shoes.jpg'
                )
            ]
            
            for product in products:
                db.session.add(product)
            
            # Add a test user
            test_user = User(
                email='test@example.com',
                password=generate_password_hash('password123'),
                name='Test User'
            )
            db.session.add(test_user)
            
            # Commit all changes
            db.session.commit()
            print("Database initialized with sample data!")
        else:
            print("Database already contains data!")

if __name__ == '__main__':
    init_db()