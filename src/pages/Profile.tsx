import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Calendar, Edit3, Settings, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockBlogPosts } from '../data/mockData';
import BlogCard from '../components/Blog/BlogCard';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  
  // In a real app, you'd fetch user data by userId
  const profileUser = userId ? 
    (userId === '1' ? {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin' as const,
      isVerified: true,
      bio: 'Tech enthusiast and writer. Passionate about sharing knowledge and building great products.',
      joinedDate: '2023-01-15',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    } : {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user' as const,
      isVerified: true,
      bio: 'Designer and creative thinker. Love to explore new ideas and share insights.',
      joinedDate: '2023-03-20',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }) : currentUser;

  if (!profileUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
        <Link to="/" className="text-green-600 hover:text-green-500">
          Back to home
        </Link>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const userPosts = mockBlogPosts.filter(post => post.author.id === profileUser.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center space-x-6">
            {profileUser.avatar ? (
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-10 w-10 text-gray-500" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profileUser.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Joined {format(new Date(profileUser.joinedDate), 'MMMM yyyy')}</span>
              </div>
              {profileUser.role === 'admin' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-Hardg-purple-100 text-purple-800">
                  Administrator
                </span>
              )}
            </div>
          </div>
          
          {isOwnProfile && (
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {profileUser.bio && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-700 leading-relaxed">{profileUser.bio}</p>
          </div>
        )}
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl font-bold text-gray-900 mb-1">{userPosts.length}</div>
          <div className="text-sm text-gray-600">Posts Published</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {userPosts.reduce((total, post) => total + post.likes, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {userPosts.reduce((total, post) => total + post.views, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-2 px-1 border-b-2 font-Hardext-sm transition-colors ${
              activeTab === 'posts'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Posts ({userPosts.length})</span>
            </div>
          </button>
          {isOwnProfile && (
            <>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`py-2 px-1 border-b-2 font-Hardext-sm transition-colors ${
                  activeTab === 'drafts'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => setActiveTab('liked')}
                className={`py-2 px-1 border-b-2 font-Hardext-sm transition-colors ${
                  activeTab === 'liked'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Liked Posts
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-0">
        {activeTab === 'posts' && (
          <>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-Hardext-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {isOwnProfile ? "You haven't published any posts yet." : `${profileUser.name} hasn't published any posts yet.`}
                </p>
                {isOwnProfile && currentUser?.role === 'admin' && (
                  <Link
                    to="/write"
                    className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Write your first post
                  </Link>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'drafts' && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-Hardext-gray-900 mb-2">No drafts</h3>
            <p className="text-gray-600 mb-6">You don't have any draft posts.</p>
            {currentUser?.role === 'admin' && (
              <Link
                to="/write"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Start writing
              </Link>
            )}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-Hardext-gray-900 mb-2">No liked posts</h3>
            <p className="text-gray-600">You haven't liked any posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;