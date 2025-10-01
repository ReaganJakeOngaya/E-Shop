from marshmallow import Schema, fields

class CartItemSchema(Schema):
    id = fields.Int(dump_only=True)
    product_id = fields.Int(required=True)
    quantity = fields.Int(required=True, strict=True)
    subtotal = fields.Float(dump_only=True)

class CartSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    items = fields.Nested(CartItemSchema, many=True)
    total = fields.Float(dump_only=True)

cart_schema = CartSchema()
cart_item_schema = CartItemSchema()