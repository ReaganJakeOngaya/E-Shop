from marshmallow import Schema, fields

class ProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    feature = fields.Str(required=True)
    price = fields.Float(required=True)
    images = fields.List(fields.Str(), required=True)  # Expecting a list of image URLs
    category = fields.Str(required=True)
    color = fields.Str(required=True)
    description = fields.Str(required=True)
