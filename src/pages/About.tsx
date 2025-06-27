import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're here to read, write, or both, we're excited to have you 
          as part of the Hard community. Let's create something meaningful together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-Hard hover:bg-gray-800 transition-colors"
          >
            Start writing
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-Hard hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;