def validate_required_fields(data, required_fields):
    """Validate that all required fields are present in the data"""
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    return True, ""

def format_error_message(message):
    """Format error messages consistently"""
    return {'error': message}

def calculate_total(items):
    """Calculate total from a list of items with price and quantity"""
    return sum(item.get('price', 0) * item.get('quantity', 0) for item in items)
