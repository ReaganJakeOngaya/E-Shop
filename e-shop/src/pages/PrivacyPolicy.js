import React from 'react';
import { Shield, Eye, User, Lock, Share2, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "January 1, 2024";

  const policySections = [
    {
      icon: User,
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
• Personal information (name, email, phone number)
• Account credentials
• Shipping and billing addresses
• Payment information
• Order history and preferences

We also automatically collect certain information when you use our services:
• Device information and IP address
• Browser type and settings
• Usage data and interaction with our website
• Cookies and similar technologies`
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use the information we collect for various purposes, including:

• Processing and fulfilling your orders
• Providing customer support and services
• Personalizing your shopping experience
• Sending order confirmations and updates
• Marketing communications (with your consent)
• Improving our products and services
• Preventing fraud and ensuring security
• Complying with legal obligations`
    },
    {
      icon: Share2,
      title: 'Information Sharing',
      content: `We do not sell your personal information to third parties. We may share your information with:

• Service providers who assist in our operations (payment processors, shipping carriers)
• Legal authorities when required by law
• Business partners with your explicit consent
• Affiliated companies for business purposes

All third parties are required to protect your information and use it only for the purposes we specify.`
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate security measures to protect your personal information:

• Encryption of sensitive data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication measures
• Secure payment processing through PCI-compliant partners
• Employee training on data protection

While we take reasonable precautions, no method of transmission over the Internet is 100% secure.`
    },
    {
      icon: Globe,
      title: 'Your Rights & Choices',
      content: `You have certain rights regarding your personal information:

• Access and review your personal data
• Correct inaccurate information
• Delete your personal data (subject to legal requirements)
• Opt-out of marketing communications
• Restrict or object to certain processing
• Data portability
• Withdraw consent at any time

To exercise these rights, contact us through your account settings or our support team.`
    },
    {
      icon: Shield,
      title: 'Cookies & Tracking',
      content: `We use cookies and similar technologies to:

• Remember your preferences and settings
• Analyze website traffic and usage patterns
• Deliver personalized content and ads
• Enable shopping cart functionality
• Improve website performance

You can control cookies through your browser settings, but this may affect website functionality.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: {lastUpdated}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to protecting your privacy and being transparent about how we handle your personal information.
          </p>
        </div>

        {/* Introduction */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <div className="text-gray-600 space-y-4">
            <p>
              This Privacy Policy describes how E-Shop ("we," "our," or "us") collects, uses, 
              and shares your personal information when you use our website and services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in 
              accordance with this policy. We may update this policy from time to time, and 
              we will notify you of any material changes.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {policySections.map((section, index) => (
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

        {/* Additional Information */}
        <div className="card p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div className="text-gray-600 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Retention</h3>
              <p>
                We retain your personal information only for as long as necessary to fulfill 
                the purposes outlined in this policy, unless a longer retention period is 
                required or permitted by law.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">International Transfers</h3>
              <p>
                Your information may be transferred to and processed in countries other than 
                your own. We ensure appropriate safeguards are in place to protect your data 
                in accordance with this policy.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Children's Privacy</h3>
              <p>
                Our services are not directed to individuals under 16. We do not knowingly 
                collect personal information from children under 16. If we become aware that 
                we have collected such information, we will take steps to delete it.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at privacy@eshop.com.
              </p>
            </div>
          </div>
        </div>

        {/* Consent Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mt-8 text-center">
          <p className="text-primary-800">
            By using our website and services, you acknowledge that you have read and 
            understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;