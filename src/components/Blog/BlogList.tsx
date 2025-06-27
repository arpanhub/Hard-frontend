import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';

const API_URL = import.meta.env.VITE_API_URL;

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    let url = `${API_URL}/posts`;
    if (selectedTag) {
      url += `?tag=${encodeURIComponent(selectedTag)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
          console.log(data);
          const tags:any = Array.from(
            new Set(data.data.flatMap((post: any) => post.tags || []))
          ).sort();
          setAllTags(tags);
        } else {
          setPosts([]);
          setAllTags([]);
        }
      })
      .catch(() => {
        setPosts([]);
        setAllTags([]);
      })
      .finally(() => setLoading(false));
  }, [selectedTag]);

  const handleLike = async (postId:string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if(res.ok && data.success){
        setPosts(prevPosts=>
          prevPosts.map(post=>
            post.id === postId
            ?{
              ...post,
              isLiked:!post.isLiked,
              likes:post.isLiked?post.likes-1:post.likes+1
            } : post      
          )
        )
      }
    } catch {}
  };

  const handleBookmark = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const filteredPosts = posts;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedTag === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {selectedTag && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Posts tagged "{selectedTag}"
            </h2>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Blog Posts */}
      <div className="space-y-0">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onLike={()=>handleLike(post.id)}
              onBookmark={handleBookmark}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No posts found{selectedTag ? ` for "${selectedTag}"` : ''}
            </p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-2 text-green-600 hover:text-green-500"
            >
              View all posts
            </button>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredPosts.length > 0 && !loading && (
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
            Load more posts
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;