import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, X, Bold, Italic, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const WritePost: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async (publish = false) => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || content.substring(0, 150),
          tags,
          featuredImage,
          status: publish ? 'published' : 'draft',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save post');
      setIsSaving(false);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
      setIsSaving(false);
    }
  };

  const formatText = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">Only administrators can create new posts.</p>
        <button
          onClick={() => navigate('/')}
          className="text-green-600 hover:text-green-500"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-Hardext-gray-900">
                Write a new post
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm">{isPreview ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span className="text-sm">Save Draft</span>
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={isSaving || !title.trim() || !content.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-Hardover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
            {error}
          </div>
        )}
        {!isPreview ? (
          <div className="space-y-8">
            {/* Featured Image */}
            <div>
              <label className="block text-sm font-Hardext-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {featuredImage && (
                <div className="mt-4">
                  <img
                    src={featuredImage}
                    alt="Featured preview"
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full text-4xl font-serif font-bold text-gray-900 placeholder-gray-400 border-none outline-none resize-none"
                rows={2}
                style={{ lineHeight: '1.2' }}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-Hardext-gray-700 mb-2">
                Excerpt (optional)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief description of your post..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-4">
              <button
                onClick={() => formatText('bold')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                onClick={() => formatText('list')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="List"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell your story..."
                className="w-full text-lg text-gray-900 placeholder-gray-400 border-none outline-none resize-none leading-relaxed"
                rows={20}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-Hardext-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags (press Enter)"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        ) : (
          /* Preview */
          <div className="space-y-8">
            {featuredImage && (
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            )}
            <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
              {title || 'Untitled'}
            </h1>
            {excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {excerpt}
              </p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="prose prose-lg max-w-none">
              {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritePost;