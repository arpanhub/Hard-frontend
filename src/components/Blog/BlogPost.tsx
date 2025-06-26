import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Bookmark, Share2, MessageCircle, ArrowLeft, User } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from './CommentSection';

const API_URL = import.meta.env.VITE_API_URL;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState('');

  // Fetch post by slug
useEffect(() => {
  const fetchPost = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/posts/${slug}`);
      const data = await res.json();

      if (data.success && data.data) {
        console.log(data);
        setPost(data.data);
        console.log("Featured image: ", data.data.featuredImage);
      } else {
        setError('Post not found');
      }
    } catch (error) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };
  fetchPost();
}, [slug]);


  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      console.log(post.id)
      const res = await fetch(`${API_URL}/posts/${post.id}/like`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPost((prev: any) => ({
          ...prev,
          isLiked: !prev.isLiked,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
        }));
      }
    } catch {}
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/posts/${post._id}/bookmark`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPost((prev: any) => ({
          ...prev,
          isBookmarked: !prev.isBookmarked
        }));
      }
    } catch {}
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist."}</p>
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to={`/profile/${post.author.id}`} className="flex items-center">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-Hard text-gray-900 hover:text-gray-700">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(post.publishedAt), 'MMMM dd, yyyy')} · {post.readTime} min read
                </p>
              </div>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                post.isLiked
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-Hard">{post.likes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-Hard">{post.comments?.length || 0}</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                post.isBookmarked
                  ? 'bg-green-50 text-green-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        
        {post.featuredImage && (
          <div className="mb-8">
            <img
              src="/images/1.jpeg"
              alt={post.title}
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <Link
              key={tag}
              to={`/tag/${tag.toLowerCase()}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Author Bio */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <div className="flex items-start space-x-4">
          <Link to={`/profile/${post.author.id}`}>
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
            )}
          </Link>
          <div className="flex-1">
            <Link to={`/profile/${post.author.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                {post.author.name}
              </h3>
            </Link>
            {post.author.bio && (
              <p className="text-gray-600 mt-1">{post.author.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentSection
          postId={post._id}
          comments={post.comments}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
};

export default BlogPost;