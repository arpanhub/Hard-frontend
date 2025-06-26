import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '../../data/mockData';

interface BlogCardProps {
  post: BlogPost;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onLike, onBookmark }) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    onLike?.(post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    onBookmark?.(post.id);
  };

  return (
    <article className="py-8 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-4">
          {/* Author Info */}
          <div className="flex items-center mb-3">
            <Link to={`/profile/${post.author.id}`} className="flex items-center">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-Hard text-gray-600">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="ml-2 text-sm text-gray-700 hover:text-gray-900">
                {post.author.name}
              </span>
            </Link>
            <span className="mx-2 text-gray-400">·</span>
            <time className="text-sm text-gray-500">
              {format(new Date(post.publishedAt), 'MMM dd')}
            </time>
          </div>

          {/* Post Content */}
          <Link to={`/post/${post.slug}`} className="block group">
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors leading-tight">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>

          {/* Post Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Tags */}
              <div className="flex space-x-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag.toLowerCase()}`}
                    className="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{post.readTime} min read</span>
                <span>·</span>
                <span>{post.views} views</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`}
                />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`p-1 transition-colors ${
                  post.isBookmarked ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`}
                />
              </button>

              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="flex-shrink-0 ml-4">
            <Link to={`/post/${post.slug}`}>
              <img
                src="/images/1.jpeg"
                alt={post.title}
                className="w-28 h-28 object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;