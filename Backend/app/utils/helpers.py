from flask import jsonify

def validation_error_response(errors):
    """Helper function to return validation errors."""
    return jsonify({'errors': errors}), 400
