import React from 'react';
import { 
  RefreshCw, 
  Clock,
  Package, 
  Shield, 
  Truck,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      icon: RefreshCw,
      title: 'Start Return',
      description: 'Log into your account and go to "My Orders" to start the return process.'
    },
    {
      step: 2,
      icon: Truck,
      title: 'Print Label',
      description: 'Print the prepaid return label and packing slip provided.'
    },
    {
      step: 3,
      icon: Package,
      title: 'Pack Items',
      description: 'Pack the items securely in the original packaging if possible.'
    },
    {
      step: 4,
      icon: CheckCircle,
      title: 'Drop Off',
      description: 'Drop off the package at any designated carrier location.'
    }
  ];

  const returnPolicies = [
    {
      category: 'Most Items',
      period: '30 days',
      condition: 'Unused with tags',
      refund: 'Full refund',
      shipping: 'Free return shipping'
    },
    {
      category: 'Electronics',
      period: '14 days',
      condition: 'Unopened in original packaging',
      refund: 'Full refund',
      shipping: 'Free return shipping for defects'
    },
    {
      category: 'Final Sale Items',
      period: 'Not eligible',
      condition: 'N/A',
      refund: 'No returns',
      shipping: 'N/A'
    },
    {
      category: 'Customized Products',
      period: 'Case by case',
      condition: 'Contact support',
      refund: 'Store credit only',
      shipping: 'Customer responsible'
    }
  ];

  const nonReturnable = [
    'Opened software and digital products',
    'Personal care items (for hygiene reasons)',
    'Gift cards and downloadable content',
    'Items marked as "final sale"',
    'Products without original packaging',
    'Items damaged by customer'
  ];

  const faqs = [
    {
      question: 'How long does it take to process my refund?',
      answer: 'Refunds are processed within 5-7 business days after we receive your return. The time it takes for the refund to appear in your account depends on your payment method and bank.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, you can request an exchange for a different size or color if available. Start the return process and select "Exchange" as your preferred option.'
    },
    {
      question: 'What if I received a damaged or incorrect item?',
      answer: 'Contact our support team immediately. We\'ll arrange for a free return and send you the correct item or process a full refund, including return shipping costs.'
    },
    {
      question: 'Do I need to include the original packaging?',
      answer: 'While not always required, we recommend including the original packaging to ensure the item is protected during return shipping and to qualify for a full refund.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our hassle-free return policy ensures you can shop with confidence.
          </p>
        </div>

        {/* Return Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Easy Return Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step) => (
              <div key={step.step} className="card p-6 text-center relative">
                <div className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -left-3 font-bold">
                  {step.step}
                </div>
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Return Policies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Policies by Category</h2>
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Return Period</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Condition Required</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Refund Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Return Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  {returnPolicies.map((policy, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{policy.category}</td>
                      <td className="py-3 px-4 text-gray-600">{policy.period}</td>
                      <td className="py-3 px-4 text-gray-600">{policy.condition}</td>
                      <td className="py-3 px-4 text-gray-600">{policy.refund}</td>
                      <td className="py-3 px-4 text-gray-600">{policy.shipping}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Non-Returnable Items</h2>
              <div className="card p-6">
                <ul className="space-y-3">
                  {nonReturnable.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Tips</h2>
              <div className="card p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Keep Original Packaging</p>
                    <p className="text-gray-600 text-sm">Items in original packaging are processed faster</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Include All Parts</p>
                    <p className="text-gray-600 text-sm">Make sure to include manuals, cables, and accessories</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Get Tracking</p>
                    <p className="text-gray-600 text-sm">Keep your return tracking number for reference</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Act Quickly</p>
                    <p className="text-gray-600 text-sm">Start returns within the eligible period</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="card p-6">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start space-x-2">
                    <HelpCircle className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-gray-600 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="card p-8 text-center bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Ready to Start a Return?</h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have your order number ready and start the return process through your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Start Return
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

export default Returns;