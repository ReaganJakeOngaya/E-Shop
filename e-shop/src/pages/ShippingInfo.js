import React from 'react';
import { 
  Truck, 
  Clock, 
  Package, 
  MapPin,
  Shield,
  RefreshCw
} from 'lucide-react';

const ShippingInfo = () => {
  const shippingOptions = [
    {
      icon: Truck,
      name: 'Standard Shipping',
      price: '$4.99',
      freeThreshold: 'Free on orders over $50',
      deliveryTime: '3-5 business days',
      description: 'Our most economical shipping option for non-urgent deliveries.'
    },
    {
      icon: Clock,
      name: 'Expedited Shipping',
      price: '$9.99',
      freeThreshold: 'Not available for free shipping',
      deliveryTime: '2-3 business days',
      description: 'Faster delivery for when you need your items sooner.'
    },
    {
      icon: Package,
      name: 'Overnight Shipping',
      price: '$19.99',
      freeThreshold: 'Not available for free shipping',
      deliveryTime: '1 business day',
      description: 'Get your items delivered the next business day.'
    }
  ];

  const internationalShipping = [
    {
      region: 'Canada',
      cost: '$14.99',
      deliveryTime: '5-7 business days',
      notes: 'Additional customs fees may apply'
    },
    {
      region: 'Europe',
      cost: '$19.99',
      deliveryTime: '7-10 business days',
      notes: 'VAT included for EU countries'
    },
    {
      region: 'Asia Pacific',
      cost: '$24.99',
      deliveryTime: '10-14 business days',
      notes: 'Delivery times may vary by country'
    },
    {
      region: 'Rest of World',
      cost: '$29.99',
      deliveryTime: '14-21 business days',
      notes: 'Subject to customs clearance'
    }
  ];

  const importantNotes = [
    {
      icon: MapPin,
      title: 'Delivery Address',
      description: 'Please ensure your delivery address is correct. We cannot redirect packages once shipped.'
    },
    {
      icon: Shield,
      title: 'Package Insurance',
      description: 'All shipments include basic insurance. Additional insurance is available for high-value items.'
    },
    {
      icon: RefreshCw,
      title: 'Delivery Attempts',
      description: 'Carriers will typically attempt delivery 3 times before returning the package to us.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about our shipping options, delivery times, and policies to make informed shopping decisions.
          </p>
        </div>

        {/* Domestic Shipping Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Domestic Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                <div className="text-2xl font-bold text-primary-600 mb-2">{option.price}</div>
                <p className="text-green-600 font-medium mb-2">{option.freeThreshold}</p>
                <p className="text-gray-600 mb-3">{option.deliveryTime}</p>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free Shipping Banner */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary-900 mb-1">Free Standard Shipping</h3>
              <p className="text-primary-700">
                Enjoy free standard shipping on all orders over $50. No code needed - automatically applied at checkout!
              </p>
            </div>
            <Truck className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        {/* International Shipping */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">International Shipping</h2>
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Region</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Shipping Cost</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Delivery Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {internationalShipping.map((region, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{region.region}</td>
                      <td className="py-3 px-4 text-gray-600">{region.cost}</td>
                      <td className="py-3 px-4 text-gray-600">{region.deliveryTime}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{region.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Processing Time */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Processing</h2>
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Standard Orders:</span>
                    <span className="font-medium">1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customized Items:</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pre-orders:</span>
                    <span className="font-medium">Varies by product</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Days</h3>
                <p className="text-gray-600 mb-3">
                  We process and ship orders Monday through Friday, excluding major holidays. 
                  Orders placed after 2 PM EST will be processed the next business day.
                </p>
                <p className="text-gray-600">
                  Delivery times are estimates and may be affected by weather, carrier delays, 
                  or other factors beyond our control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importantNotes.map((note, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <note.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{note.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{note.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tracking & Support */}
        <div className="card p-8 text-center bg-gradient-to-br from-primary-50 to-primary-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help With Your Order?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have questions about your shipment or need assistance with tracking? 
            Our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Track Your Order
            </button>
            <button className="btn-secondary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;