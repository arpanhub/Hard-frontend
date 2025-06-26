import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Reply, MoreHorizontal, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { Comment } from '../../data/mockData';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onClose: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState(comments);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    setLocalComments([comment, ...localComments]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleLikeComment = (commentId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLocalComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    );
  };

  return (
    <div className="border-t border-gray-200 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Comments ({localComments.length})
        </h3>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            )}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                disabled={isSubmitting}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-Hard hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-3">Sign in to join the conversation</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-Hard hover:bg-green-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {localComments.length > 0 ? (
          localComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onLike={handleLikeComment}
              currentUser={user}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface CommentCardProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  currentUser: any;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onLike, currentUser }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex space-x-3">
      {comment.author.avatar ? (
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-gray-600" />
        </div>
      )}
      
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-Hard text-gray-900">{comment.author.name}</h4>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <time>{format(new Date(comment.createdAt), 'MMM dd, yyyy')}</time>
              <button className="hover:text-gray-700 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <button
            onClick={() => onLike(comment.id)}
            className={`flex items-center space-x-1 transition-colors ${
              comment.isLiked
                ? 'text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
            <span>{comment.likes > 0 ? comment.likes : ''}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;