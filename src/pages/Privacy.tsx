import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const Privacy: React.FC = () => {
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
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect information you provide directly to us, such as when you create 
            an account, write a post, comment on content, or contact us for support.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Personal Information
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Name and email address</li>
            <li>Profile information, including bio and photo</li>
            <li>Content you create, including posts, comments, and messages</li>
            <li>Payment information (processed securely through third-party providers)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Automatically Collected Information
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, interactions)</li>
            <li>Location data (general geographic location based on IP address)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices and security alerts</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent fraudulent or illegal activities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may share information about you in the following circumstances:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Public Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your profile information and content you publish are publicly available 
            and may be viewed by anyone. This includes your name, bio, profile picture, 
            and any posts, comments, or other content you share.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Service Providers
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may share your information with third-party service providers who 
            perform services on our behalf, such as hosting, analytics, and customer support.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Legal Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may disclose your information if required by law or if we believe 
            such disclosure is necessary to protect our rights or the rights of others.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We take reasonable measures to protect your information from loss, theft, 
            misuse, and unauthorized access. However, no internet transmission is 
            completely secure, and we cannot guarantee absolute security.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Security measures we implement include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and authentication measures</li>
            <li>Employee training on data protection practices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Your Rights and Choices
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Access:</strong> Request copies of your personal information</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Objection:</strong> Object to certain processing of your information</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            To exercise these rights, please contact us using the information provided 
            at the end of this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to collect and store 
            information about your interactions with our service. You can control 
            cookies through your browser settings, but disabling cookies may affect 
            the functionality of our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our service is not intended for children under 13 years of age. We do not 
            knowingly collect personal information from children under 13. If you are 
            a parent or guardian and believe your child has provided us with personal 
            information, please contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this privacy policy from time to time. We will notify you 
            of any changes by posting the new privacy policy on this page and updating 
            the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">
              Email: privacy@Hard<br />
              Address: 123 Main Street, City, State 12345<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;