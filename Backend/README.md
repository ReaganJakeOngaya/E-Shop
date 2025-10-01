# E-Commerce Backend API

## 📋 Project Overview

A comprehensive RESTful backend API for an e-commerce platform built with Flask, featuring user authentication, product management, shopping cart functionality, and order processing. This backend serves as the foundation for a modern e-commerce application with full CRUD operations and secure JWT-based authentication.

---

## 🏗️ Architecture & Project Structure

```
backend/
│
├── app/
│   ├── __init__.py              # Flask application factory and extensions initialization
│   ├── models/                  # Database models (SQLAlchemy ORM)
│   │   ├── __init__.py
│   │   ├── user.py              # User model with authentication
│   │   ├── product.py           # Product catalog management
│   │   ├── cart.py              # Shopping cart and cart items
│   │   └── order.py             # Orders and order items with status tracking
│   ├── routes/                  # API route handlers (Blueprints)
│   │   ├── __init__.py
│   │   ├── user.py              # Authentication and user management
│   │   ├── product.py           # Product CRUD operations
│   │   ├── cart.py              # Shopping cart operations
│   │   └── order.py             # Order processing and management
│   ├── schemas/                 # Data validation and serialization (Marshmallow)
│   │   ├── __init__.py
│   │   ├── user_schema.py       # User data validation
│   │   ├── product_schema.py    # Product data validation
│   │   ├── cart_schema.py       # Cart operations validation
│   │   └── order_schema.py      # Order processing validation
│   └── utils/
│       ├── __init__.py
│       └── helpers.py           # Utility functions and helpers
│
├── migrations/                  # Database migration scripts (Flask-Migrate)
├── instance/                   # Instance-specific configuration
│   └── config.py               # Environment-specific settings
├── tests/                      # Comprehensive test suite
│   ├── test_user.py
│   ├── test_product.py
│   ├── test_cart.py
│   └── __init__.py
├── .env                        # Environment variables
├── .flaskenv                   # Flask environment configuration
├── requirements.txt            # Python dependencies
├── config.py                   # Main application configuration
├── app.py                      # Primary application entry point
├── run.py                      # Alternative entry point
└── README.md                   # Project documentation
```

---

## 🛠️ Technology Stack & Dependencies

### Core Framework
- **Flask 2.3.3**: Micro web framework for Python
- **Flask-SQLAlchemy 3.0.5**: ORM for database operations
- **Flask-Migrate 4.0.5**: Database migration handling
- **Flask-JWT-Extended 4.5.3**: Secure authentication with JSON Web Tokens
- **Flask-CORS 4.0.0**: Cross-Origin Resource Sharing for frontend communication

### Data Handling & Validation
- **Marshmallow 3.20.1**: Data validation, serialization, and deserialization
- **Werkzeug 2.3.7**: Security utilities and password hashing

### Development & Environment
- **python-dotenv 1.0.0**: Environment variable management
- **python-dateutil 2.8.2**: Date and time utilities

### Installation
```bash
# Install all dependencies
pip install -r requirements.txt

# Or install individually
pip install flask flask-sqlalchemy flask-migrate flask-jwt-extended flask-cors marshmallow werkzeug python-dotenv
```

---

## 🗄️ Database Design & Models

### User Model (`app/models/user.py`)
**Purpose**: Manage user accounts, authentication, and authorization
```python
# Key Features:
- Secure password hashing with Werkzeug
- JWT token generation for authentication
- Admin role differentiation
- Cart and order relationships
- Timestamp tracking for user activity
```

### Product Model (`app/models/product.py`)
**Purpose**: Catalog management with inventory tracking
```python
# Key Features:
- Price and stock management
- Category organization
- Image URL support for product media
- Relationships with cart and order items
- Inventory validation
```

### Cart Model (`app/models/cart.py`)
**Purpose**: Shopping cart functionality with session persistence
```python
# Key Features:
- User-cart relationship (one-to-one)
- Cart items with quantity management
- Automatic subtotal calculation
- Real-time stock validation
- Cascade delete operations
```

### Order Model (`app/models/order.py`)
**Purpose**: Order processing with status tracking
```python
# Key Features:
- Multi-status order workflow (pending, processing, shipped, delivered, cancelled)
- Order items with price snapshot
- Total amount calculation
- Shipping address management
- Stock management on order creation/cancellation
```

---

## 🔐 Authentication & Security

### JWT Implementation
- **Token-based authentication** for stateless API
- **1-hour access token expiration** for security
- **Protected routes** with `@jwt_required()` decorator
- **User identity management** through token claims

### Password Security
- **Werkzeug security** for password hashing
- **No plain text passwords** stored in database
- **Secure password validation** during registration/login

### Route Protection
```python
# Example of protected route
@jwt_required()
def protected_route():
    user_id = get_jwt_identity()  # Get user from token
    # Access user-specific data
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|---------|
| POST | `/signup` | User registration | Public |
| POST | `/login` | User login | Public |
| GET | `/profile` | Get user profile | Private |

### Product Routes (`/api`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|---------|
| GET | `/products` | List all products | Public |
| GET | `/products/<id>` | Get product details | Public |
| POST | `/products` | Create new product | Admin |
| PUT | `/products/<id>` | Update product | Admin |
| DELETE | `/products/<id>` | Delete product | Admin |

### Cart Routes (`/api`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|---------|
| GET | `/cart` | Get user cart | Private |
| POST | `/cart` | Add item to cart | Private |
| PUT | `/cart/<item_id>` | Update cart item | Private |
| DELETE | `/cart/<item_id>` | Remove item from cart | Private |
| DELETE | `/cart/clear` | Clear entire cart | Private |

### Order Routes (`/api`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|---------|
| GET | `/orders` | Get user orders | Private |
| GET | `/orders/<id>` | Get order details | Private/Admin |
| POST | `/orders` | Create new order | Private |
| PUT | `/orders/<id>` | Update order status | Private/Admin |
| POST | `/orders/<id>/cancel` | Cancel order | Private/Admin |
| GET | `/orders/user/<user_id>` | Get user's orders | Admin |

---

## 🎯 Key Features & Implementation Details

### 1. Data Validation with Marshmallow
**Why**: Ensure data integrity and proper formatting
**How**: Schema classes for each model with field validation
```python
# Example: Product validation
price = fields.Float(required=True, validate=validate.Range(min=0))
stock = fields.Int(required=True, validate=validate.Range(min=0))
```

### 2. Database Migrations
**Why**: Version control for database schema changes
**How**: Flask-Migrate with Alembic integration
```bash
flask db init          # Initialize migrations
flask db migrate       # Generate migration script
flask db upgrade       # Apply migrations
```

### 3. CORS Configuration
**Why**: Enable communication with React frontend
**How**: Flask-CORS extension for cross-origin requests

### 4. Admin Role System
**Why**: Differentiate between regular users and administrators
**How**: `is_admin` boolean field with route protection
```python
if not user.is_admin:
    return jsonify({'message': 'Admin access required'}), 403
```

### 5. Inventory Management
**Why**: Prevent overselling and maintain stock accuracy
**How**: Real-time stock validation during cart operations and order processing

### 6. Order Status Workflow
**Why**: Track order progress through fulfillment pipeline
**How**: Multi-status system with validation rules
```python
STATUS_FLOW = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
```

---

## 🚀 Installation & Setup

### Step 1: Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Configuration
```bash
# Create environment file
cp .env.example .env

# Edit .env with your configuration
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
DATABASE_URL=sqlite:///ecommerce.db
```

### Step 3: Database Setup
```bash
# Initialize database migrations
flask db init

# Generate initial migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade
```

### Step 4: Run Application
```bash
# Development server
python run.py

# Or using Flask CLI
flask run
```

---

## 🧪 Testing

### Test Structure
- **Unit tests** for individual components
- **Integration tests** for API endpoints
- **Authentication tests** for secure routes

### Running Tests
```bash
python -m pytest tests/ -v
```

### Example Test Case
```python
def test_user_registration(self):
    response = self.client.post('/api/auth/signup', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'password123'
    })
    self.assertEqual(response.status_code, 201)
    self.assertIn('access_token', response.get_json())
```

---

## 🔧 Configuration Management

### Environment-based Configuration
- **Development**: Debug mode enabled, SQLite database
- **Production**: Environment variables, PostgreSQL recommended
- **Testing**: Separate database, optimized for test performance

### Security Configuration
```python
# JWT Settings
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

# Database Configuration
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
```

---

## 📊 API Usage Examples

### User Registration
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Product Creation (Admin)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "name": "Smartphone",
    "description": "Latest smartphone model",
    "price": 699.99,
    "stock": 50,
    "category": "Electronics"
  }'
```

### Order Placement
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "shipping_address": "123 Main St, City, Country"
  }'
```

---

## 🛡️ Security Best Practices

### Implemented Security Measures
1. **Password Hashing**: No plain text passwords stored
2. **JWT Tokens**: Stateless authentication with expiration
3. **Input Validation**: Marshmallow schemas for all inputs
4. **SQL Injection Protection**: SQLAlchemy ORM prevents injection
5. **CORS Configuration**: Controlled cross-origin requests
6. **Environment Variables**: Sensitive data not in codebase

### Recommended Production Security
1. **Use HTTPS** in production
2. **Strong secret keys** for Flask and JWT
3. **Database encryption** for sensitive data
4. **Rate limiting** for API endpoints
5. **Regular dependency updates**

---

## 🔄 Workflow & Development

### Typical Development Flow
1. **Database Changes**: Update models in `app/models/`
2. **Generate Migration**: `flask db migrate -m "description"`
3. **Apply Migration**: `flask db upgrade`
4. **Create/Update Routes**: Implement in `app/routes/`
5. **Add Validation**: Update schemas in `app/schemas/`
6. **Test**: Write and run tests in `tests/`

### Code Organization Principles
- **Separation of Concerns**: Models, routes, and schemas in separate modules
- **Blueprint Architecture**: Modular route organization
- **Factory Pattern**: Application creation with configurable settings
- **Dependency Injection**: Extensions initialized in app factory

---

## 📈 Future Enhancements

### Planned Features
1. **Payment Integration**: Stripe/PayPal payment processing
2. **Email Notifications**: Order confirmations and status updates
3. **Product Reviews**: User rating and review system
4. **Inventory Alerts**: Low stock notifications
5. **Advanced Search**: Elasticsearch integration
6. **Caching**: Redis for performance optimization
7. **API Documentation**: Swagger/OpenAPI specification
8. **Dockerization**: Containerized deployment

### Scalability Considerations
- **Database Indexing** for performance
- **API Pagination** for large datasets
- **Background Tasks** for email and notifications
- **Microservices Architecture** for large-scale deployment

---

## 🤝 Contributing

### Development Guidelines
1. Follow PEP 8 coding standards
2. Write tests for new features
3. Update documentation for API changes
4. Use meaningful commit messages
5. Create pull requests for review

### Code Review Checklist
- [ ] Security considerations addressed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Migration files included (if DB changes)
- [ ] API consistency maintained

---

## 📞 Support & Troubleshooting

### Common Issues
1. **Database Connection**: Check DATABASE_URL in .env
2. **Migration Errors**: Ensure models are properly imported
3. **JWT Errors**: Verify JWT_SECRET_KEY configuration
4. **CORS Issues**: Check frontend URL in CORS configuration

### Debug Mode
```python
# Enable detailed error messages
app.config['DEBUG'] = True

# SQLAlchemy query logging
app.config['SQLALCHEMY_ECHO'] = True
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Flask Community** for the excellent web framework
- **SQLAlchemy Team** for robust ORM capabilities
- **Marshmallow Contributors** for data validation library
- **JWT-Extended Maintainers** for authentication solution

---

*This README documents the complete backend implementation as of the latest version. For specific implementation details, refer to the source code comments and docstrings.*y