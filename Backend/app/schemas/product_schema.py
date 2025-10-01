from marshmallow import Schema, fields, validate

class ProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str()
    price = fields.Float(required=True, validate=validate.Range(min=0))
    stock = fields.Int(required=True, validate=validate.Range(min=0))
    image_url = fields.Str()
    category = fields.Str()
    created_at = fields.DateTime(dump_only=True)

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
