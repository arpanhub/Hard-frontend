import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

const Terms: React.FC = () => {
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
          <Scale className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Terms of Service
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
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using Hardyou accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, 
            please do not use this service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Use License
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Permission is granted to temporarily download one copy of the materials 
            on Hard website for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to reverse engineer any software contained on the website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. User Content
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you post content to Hardyou retain ownership of your content. 
            However, you grant us a non-exclusive, worldwide, royalty-free license to 
            use, modify, publicly perform, publicly display, reproduce, and distribute 
            such content on and through the service.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You are responsible for the content you post and warrant that:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>You own or have the right to use the content</li>
            <li>Your content does not violate any third-party rights</li>
            <li>Your content complies with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Prohibited Uses
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You may not use Hard
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Account Termination
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to terminate or suspend your account and bar access 
            to the service immediately, without prior notice or liability, under our 
            sole discretion, for any reason whatsoever and without limitation, including 
            but not limited to a breach of the Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The information on this website is provided on an "as is" basis. To the 
            fullest extent permitted by law, this Company excludes all representations, 
            warranties, conditions and terms relating to our website and the use of this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Limitations
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In no event shall Hardr its suppliers be liable for any damages 
            (including, without limitation, damages for loss of data or profit, or 
            due to business interruption) arising out of the use or inability to use 
            the materials on Hard website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hardeserves the right to revise these terms of service at any time 
            without notice. By using this website, you are agreeing to be bound by 
            the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">
              Email: legal@Hardom<br />
              Address: 123 Main Street, City, State 12345<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;