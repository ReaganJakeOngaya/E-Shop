from marshmallow import Schema, fields, validate, post_load
from datetime import datetime

class OrderItemSchema(Schema):
    id = fields.Int(dump_only=True)
    order_id = fields.Int(dump_only=True)
    product_id = fields.Int(required=True)
    product = fields.Dict(dump_only=True)  # Nested product data
    quantity = fields.Int(required=True, validate=validate.Range(min=1))
    price = fields.Float(required=True, validate=validate.Range(min=0))
    subtotal = fields.Float(dump_only=True)
    
    @post_load
    def make_order_item(self, data, **kwargs):
        return data

class OrderSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    total_amount = fields.Float(dump_only=True)
    status = fields.Str(
        validate=validate.OneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
        default='pending'
    )
    shipping_address = fields.Str(required=True, validate=validate.Length(min=10))
    created_at = fields.DateTime(dump_only=True)
    items = fields.Nested(OrderItemSchema, many=True, dump_only=True)
    
    class Meta:
        ordered = True

# Schema instances
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)
order_item_schema = OrderItemSchema()
order_items_schema = OrderItemSchema(many=True)

# Simplified schemas for specific use cases
class CreateOrderSchema(Schema):
    shipping_address = fields.Str(required=True, validate=validate.Length(min=10))
    
    class Meta:
        ordered = True

class UpdateOrderSchema(Schema):
    status = fields.Str(
        validate=validate.OneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    )
    shipping_address = fields.Str(validate=validate.Length(min=10))
    
    class Meta:
        ordered = True

create_order_schema = CreateOrderSchema()
update_order_schema = UpdateOrderSchema()