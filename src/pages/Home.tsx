import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';
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

  // Non-authenticated users see the landing page
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Human stories & ideas
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A place to read, write, and deepen your understanding of the topics that matter most to you.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-Hard:bg-gray-800 transition-all duration-200 group"
              >
                Start reading
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-24 w-24 text-blue-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Beautiful stories await</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Why writers choose our platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a community of writers and readers who are passionate about sharing knowledge and stories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Share your story
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Write about topics that matter to you and reach an engaged audience of readers who care about your perspective.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Connect with others
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with a community of thoughtful readers and writers through comments, likes, and meaningful discussions.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quality content
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover well-crafted articles and stories from writers who take their craft seriously and value quality over quantity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
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
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-Hard:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-Hard:border-gray-400 hover:bg-gray-50 transition-colors"
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
