##  This is the Backend for this E-commerce website
backend/ 
│
├── app/
│   ├── __init__.py         # App and extensions initialization
│   ├── models/
│   │   ├── __init__.py     # Import all models for easy access
│   │   ├── user.py         # User-related models
│   │   ├── product.py      # Product-related models
│   │   ├── cart.py         # Cart-related models
│   │   └── order.py        # Order-related models (if applicable)
│   ├── routes/
│   │   ├── __init__.py     # Import all routes for easy access
│   │   ├── user.py         # User-related routes
│   │   ├── product.py      # Product-related routes
│   │   ├── cart.py         # Cart-related routes
│   │   └── order.py        # Order-related routes
│   ├── schemas/            # Optional: For data validation with Marshmallow
│   │   ├── __init__.py
│   │   ├── user_schema.py
│   │   ├── product_schema.py
│   │   └── cart_schema.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py      # Utility functions
│
├── migrations/             # For database migrations (if using Flask-Migrate)
├── instance/
│   └── config.py           # Instance-specific configuration
├── tests/
│   ├── test_user.py        # Tests for user functionality
│   ├── test_product.py     # Tests for product functionality
│   ├── test_cart.py        # Tests for cart functionality
│   └── __init__.py
├── .env                    # Environment variables
├── requirements.txt        # Dependencies
├── config.py               # App configurations
├── run.py                  # Entry point to run the application
└── README.md               # Project documentation


## Dependancies
 -- pip install 
 1. flask 
 2. flask-sqlalchemy (for Object-Relational-Mapping)
 3. flask-migrate 
 4. flask-jwt-extended (for authentication and authorization)
 5. flask-cors (for communication with ReactJS frontend)
 6. marshmallow (for data validation and serialization on the schemas)
 7. werkzeug

## Database setup
# Migrations
---The migrations/ directory is created automatically when running flask db init. It manages database migrations.

   # Initialize migrations:
     flask db init

   # Generate migration scripts:
     flask db migrate -m "Initial migration"

   # Apply migrations:
     flask db upgrade

## API Endpoints:

   POST /api/auth/signup - Create a new user.
   POST /api/auth/login - Log in and get JWT token.
   POST /api/products - Add products 
   GET /api/products - List all products
   POST /api/cart - Add item to cart
   GET /api/cart - View cart 
   POST /api/orders - Place an order
   GET /api/orders - View orders 

## Run the server:

   python run.py