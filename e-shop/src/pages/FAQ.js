import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Ordering & Payment',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. You\'ll need to create an account or sign in, enter your shipping information, and complete the payment process.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through encrypted channels.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 1 hour of placement. After that, orders enter our processing system and cannot be changed. Contact customer service immediately if you need assistance.'
        },
        {
          question: 'Do you offer installment payments?',
          answer: 'Yes, we offer installment payment options through PayPal Credit and other financing partners. Look for the installment payment option at checkout.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      questions: [
        {
          question: 'What are your shipping options?',
          answer: 'We offer standard shipping (3-5 business days), expedited shipping (2-3 business days), and overnight shipping. Free standard shipping is available on orders over $50.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by location. Additional customs fees may apply.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "My Orders" section.'
        },
        {
          question: 'What if I\'m not home for delivery?',
          answer: 'For most deliveries, the carrier will leave the package at your door or in a secure location. For high-value items, a signature may be required. You can also provide delivery instructions during checkout.'
        }
      ]
    },
    {
      title: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like electronics may have different return windows.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Start the return process through your account dashboard. Print the return label, pack the item securely, and drop it off at the designated carrier location. Refunds are processed within 5-7 business days.'
        },
        {
          question: 'Are return shipping costs covered?',
          answer: 'We provide free return shipping for items that are defective or incorrect. For other returns, return shipping costs are deducted from your refund unless you choose to cover the cost yourself.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive your return. The time it takes for the refund to appear in your account depends on your payment method and bank.'
        }
      ]
    },
    {
      title: 'Account & Technical',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top navigation and fill out the registration form with your email address and a password. You can also create an account during checkout.'
        },
        {
          question: 'I forgot my password. How can I reset it?',
          answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a link to reset your password. Check your spam folder if you don\'t see the email.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log into your account and go to "Profile" in the account menu. Here you can update your personal information, shipping addresses, and communication preferences.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your personal information. Read our Privacy Policy for more details.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    
    setOpenItems(newOpenItems);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 mb-8">
            Find quick answers to common questions about shopping with us.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems.has(key);
                  
                  return (
                    <div key={questionIndex} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 border-t border-gray-200">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="card p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our customer support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Support
            </button>
            <button className="btn-secondary">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;