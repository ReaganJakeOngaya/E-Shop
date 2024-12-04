from app import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    feature = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    images = db.Column(db.Text, nullable=False)  # Store image URLs as a comma-separated string
    category = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
