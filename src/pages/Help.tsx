import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I create an account?',
      answer: 'Click the "Get started" button on the homepage and fill out the registration form with your name, email, and password. You\'ll receive a verification email to activate your account.'
    },
    {
      question: 'How do I write and publish a post?',
      answer: 'Only administrators can write and publish posts. If you\'re an admin, click the "Write" button in the navigation menu to access the post editor.'
    },
    {
      question: 'Can I edit or delete my comments?',
      answer: 'Yes, you can edit or delete your own comments by clicking on the comment and using the options menu. Comments can be edited within 24 hours of posting.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'On the sign-in page, click "Forgot your password?" and enter your email address. You\'ll receive a password reset link via email.'
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to your profile page and click "Edit Profile" to update your name, bio, and profile picture.'
    },
    {
      question: 'How do I bookmark posts?',
      answer: 'Click the bookmark icon on any post to save it to your reading list. You can access your saved posts from your profile page.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Use the three-dot menu on any post or comment to report content that violates our community guidelines. Our moderation team will review all reports.'
    },
    {
      question: 'How do I delete my account?',
      answer: 'Contact our support team at support@Hardom to request account deletion. This action is permanent and cannot be undone.'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="text-center">
          <HelpCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions and get help with using Hard
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Quick Help
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Getting Started
            </h3>
            <p className="text-gray-600 mb-4">
              Learn the basics of creating an account and using Hard
            </p>
            <button className="text-green-600 hover:text-green-500 font-Medium">
              Learn more →
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Reading & Engaging
            </h3>
            <p className="text-gray-600 mb-4">
              Discover how to find, read, and interact with content
            </p>
            <button className="text-green-600 hover:text-green-500 font-medium">
              Learn more →
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Account Settings
            </h3>
            <p className="text-gray-600 mb-4">
              Manage your profile, privacy, and account preferences
            </p>
            <button className="text-green-600 hover:text-green-500 font-medium">
              Learn more →
            </button>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-Hardext-gray-900">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600">No results found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-green-600 hover:text-green-500 mt-2"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@Hard"
            className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Email Support
          </a>
          <button className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 hover:bg-white transition-colors">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;