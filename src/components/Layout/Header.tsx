import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, PenTool, Bell, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-gray-900">
              Hard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-sm"
                />
              </div>
            </form>

            {user ? (
              <>
                {/* Write Button */}
                <Link
                  to="/write"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <PenTool className="h-4 w-4" />
                  <span className="text-sm">Write</span>
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Search className="h-4 w-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent flex-1 outline-none text-sm"
                  />
                </div>
              </form>

              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/write"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PenTool className="h-5 w-5" />
                    <span>Write</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-4">
                  <Link
                    to="/login"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;