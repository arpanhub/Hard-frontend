import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/Blog/BlogList';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    // Authenticated user sees the blog feed
    return (
      <div className="min-h-screen bg-white">
        <BlogList />
      </div>
    );
  }

  // Non-authenticated users see only the CTA section, centered and full screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="w-full">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Ready to start writing?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who are already sharing their stories and connecting with readers around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;