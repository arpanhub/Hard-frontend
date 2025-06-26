import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-lg font-serif font-bold text-gray-900">
              Hard
            </Link>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link to="/about" className="hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link to="/help" className="hover:text-gray-900 transition-colors">
                Help
              </Link>
              <Link to="/terms" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            © 2024 Hard Clone. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;