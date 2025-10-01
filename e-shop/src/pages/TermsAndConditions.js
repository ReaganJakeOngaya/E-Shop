import React from 'react';
import { FileText, Scale, AlertTriangle, ShoppingCart, CreditCard, Truck } from 'lucide-react';

const TermsAndConditions = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      icon: ShoppingCart,
      title: 'Account Registration',
      content: `By creating an account with E-Shop, you agree to:

• Provide accurate and complete registration information
• Maintain the security of your password and account
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use

We reserve the right to refuse service, terminate accounts, or remove content at our discretion.`
    },
    {
      icon: CreditCard,
      title: 'Orders & Payments',
      content: `When you place an order:

• All orders are subject to product availability
• Prices are subject to change without notice
• We reserve the right to cancel orders for any reason
• Payment must be completed before order processing
• Sales tax will be added where applicable

Accepted payment methods include credit cards, PayPal, and other specified payment processors.`
    },
    {
      icon: Truck,
      title: 'Shipping & Delivery',
      content: `Shipping terms:

• Delivery times are estimates, not guarantees
• Risk of loss passes to you upon delivery
• You are responsible for providing accurate shipping information
• Additional charges may apply for international shipping
• Some items may require signature upon delivery

We are not responsible for delays caused by shipping carriers or customs.`
    },
    {
      icon: Scale,
      title: 'Returns & Refunds',
      content: `Our return policy:

• Items must be returned within 30 days of delivery
• Products must be in original condition with tags
• Return shipping costs may apply
• Refunds will be issued to the original payment method
• Some items are non-returnable (see Return Policy)

Defective or incorrect items will be replaced at our expense.`
    },
    {
      icon: AlertTriangle,
      title: 'Intellectual Property',
      content: `All content on our website is protected:

• All text, graphics, logos, and software are our property
• You may not reproduce, distribute, or create derivative works
• Product names and descriptions are for identification only
• Third-party trademarks are property of their respective owners

Unauthorized use may violate copyright, trademark, and other laws.`
    },
    {
      icon: FileText,
      title: 'Limitation of Liability',
      content: `To the extent permitted by law:

• We are not liable for indirect, incidental, or consequential damages
• Our total liability shall not exceed the amount you paid for products
• We are not responsible for third-party actions or content
• Some jurisdictions do not allow limitations of liability

This limitation applies to all claims, whether based on warranty, contract, or tort.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Scale className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: {lastUpdated}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our website and services.
          </p>
        </div>

        {/* Introduction */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <div className="text-gray-600 space-y-4">
            <p>
              These Terms and Conditions govern your use of the E-Shop website and services. 
              By accessing or using our services, you agree to be bound by these terms.
            </p>
            <p>
              If you disagree with any part of these terms, you may not access our services. 
              We reserve the right to modify these terms at any time, and continued use 
              constitutes acceptance of the modified terms.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-primary-100 rounded-lg p-3 flex-shrink-0">
                  <section.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
                  <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Clauses */}
        <div className="card p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Terms</h2>
          <div className="text-gray-600 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Governing Law</h3>
              <p>
                These terms shall be governed by and construed in accordance with the laws of 
                the State of California, without regard to its conflict of law provisions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Dispute Resolution</h3>
              <p>
                Any disputes arising from these terms or your use of our services shall be 
                resolved through binding arbitration in San Francisco, California, rather 
                than in court.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Severability</h3>
              <p>
                If any provision of these terms is found to be invalid or unenforceable, 
                the remaining provisions will remain in full force and effect.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Entire Agreement</h3>
              <p>
                These terms constitute the entire agreement between you and E-Shop regarding 
                our services and supersede all prior agreements and understandings.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
              <p>
                For questions about these Terms and Conditions, please contact us at 
                legal@eshop.com.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                These terms affect your legal rights and responsibilities. If you do not 
                understand any part of these terms, please seek legal advice before using 
                our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;