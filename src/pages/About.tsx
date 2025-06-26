import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
          About Hard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We're building a platform where meaningful stories and ideas can flourish, 
          connecting writers and readers in conversations that matter.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            To create a space where great ideas can be shared, discovered, and discussed. 
            We believe that everyone has a story worth telling and insights worth sharing. 
            Our platform empowers writers to reach engaged audiences and helps readers 
            discover content that challenges, informs, and inspires.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Quality First
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We prioritize thoughtful, well-crafted content over quantity. 
              Every story should add value to the conversation.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Community Driven
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We foster meaningful connections between writers and readers, 
              encouraging respectful dialogue and constructive feedback.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Authentic Voice
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We celebrate diverse perspectives and encourage writers to 
              share their unique experiences and insights authentically.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              Hard was born from a simple belief: that sharing ideas and stories 
              makes the world a better place. In an age of information overload, 
              we wanted to create a platform that rewards depth over clicks, 
              substance over sensationalism.
            </p>
            <p className="mb-6">
              We started as a small team of writers and developers who were 
              frustrated with the state of online publishing. We saw great 
              content getting lost in the noise, while clickbait rose to the top. 
              We knew there had to be a better way.
            </p>
            <p>
              Today, Hard is home to writers, thinkers, and storytellers from 
              around the world. From personal essays to technical deep-dives, 
              from creative fiction to industry insights, our platform celebrates 
              the full spectrum of human knowledge and experience.
            </p>
          </div>
        </div>
      </section>

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