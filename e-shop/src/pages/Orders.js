import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  Eye,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await ordersAPI.cancel(orderId);
        toast.success('Order cancelled successfully');
        fetchOrders(); // Refresh orders list
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to cancel order';
        toast.error(message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">View your order history and track shipments</p>
        </div>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here.</p>
            <button
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card p-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>{selectedOrder?.id === order.id ? 'Hide' : 'View'} Details</span>
                    </button>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 min-w-0 flex-1">
                        <img
                          src={item.product.image_url || '/api/placeholder/60/60'}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-gray-500 text-sm">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-gray-600 text-sm">
                        Shipping to: {order.shipping_address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <p className="text-lg font-semibold text-gray-900">
                        ${order.total_amount}
                      </p>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {selectedOrder?.id === order.id && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Order Details</h4>
                      
                      {/* Shipping Address */}
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-700 mb-2">Shipping Address</h5>
                        <p className="text-gray-600">{order.shipping_address}</p>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Items</h5>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.product.image_url || '/api/placeholder/50/50'}
                                  alt={item.product.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{item.product.name}</p>
                                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-semibold text-gray-900">
                                ${(item.quantity * item.price).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Timeline */}
                      <div className="mt-6">
                        <h5 className="font-medium text-gray-700 mb-3">Order Status</h5>
                        <div className="space-y-2">
                          {[
                            { status: 'pending', label: 'Order Placed', date: order.created_at },
                            { status: 'processing', label: 'Processing' },
                            { status: 'shipped', label: 'Shipped' },
                            { status: 'delivered', label: 'Delivered' }
                          ].map((step, index) => (
                            <div key={step.status} className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${
                                getStatusIndex(order.status) >= index 
                                  ? 'bg-primary-500' 
                                  : 'bg-gray-300'
                              }`} />
                              <div className="ml-3">
                                <p className={`text-sm ${
                                  getStatusIndex(order.status) >= index
                                    ? 'text-gray-900 font-medium'
                                    : 'text-gray-500'
                                }`}>
                                  {step.label}
                                </p>
                                {step.date && (
                                  <p className="text-xs text-gray-500">
                                    {new Date(step.date).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get status index for timeline
const getStatusIndex = (status) => {
  const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
  return statusOrder.indexOf(status);
};

export default Orders;