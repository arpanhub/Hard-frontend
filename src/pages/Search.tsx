import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import BlogCard from '../components/Blog/BlogCard';
import { searchPosts } from '../data/mockData';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const searchResults = searchPosts(searchQuery);
    setResults(searchResults);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-gray-50 rounded-full px-6 py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <SearchIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for articles, authors, or topics..."
              className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="ml-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Searching...</span>
        </div>
      )}

      {!isLoading && hasSearched && (
        <div className="mb-6">
          <p className="text-gray-600">
            {results.length > 0 
              ? `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${searchParams.get('q')}"`
              : `No results found for "${searchParams.get('q')}"`
            }
          </p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="space-y-0">
          {results.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!isLoading && hasSearched && results.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-Hard text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or explore our latest posts.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Browse all posts
          </Link>
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-Hard text-gray-900 mb-2">Search our articles</h3>
          <p className="text-gray-600">
            Enter keywords to find articles, authors, or topics you're interested in.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;