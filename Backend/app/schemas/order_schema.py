from marshmallow import Schema, fields

class OrderSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    products = fields.List(fields.Dict(), required=True)  # Expecting a list of product objects
    total_price = fields.Float(required=True)
    status = fields.Str(dump_only=True)
