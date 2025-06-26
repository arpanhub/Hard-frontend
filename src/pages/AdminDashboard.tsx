import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import EditPostAdmin from '../pages/EditPostAdmin';
const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
      </div>
    );
  }

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <Link
                to="/admin"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/admin'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Overview</span>
              </Link>
              <Link
                to="/admin/posts"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('posts')
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Posts</span>
              </Link>
              <Link
                to="/admin/users"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('users')
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </Link>
              <Link
                to="/admin/comments"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('comments')
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Comments</span>
              </Link>
              <Link
                to="/admin/settings"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('settings')
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/posts" element={<AdminPosts />} />
            <Route path="/posts/edit/:id" element={<EditPostAdmin />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/comments" element={<AdminComments />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setStats([
            { label: 'Total Posts', value: data.data.totalPosts, color: 'blue' },
            { label: 'Published Posts', value: data.data.publishedPosts, color: 'green' },
            { label: 'Draft Posts', value: data.data.draftPosts, color: 'yellow' },
            { label: 'Total Views', value: data.data.totalViews, color: 'purple' },
            { label: 'Total Users', value: data.data.totalUsers, color: 'gray' },
            { label: 'Total Comments', value: data.data.totalComments, color: 'gray' },
          ]);
        }
      } catch {}
      setLoading(false);
    }
    async function fetchRecentPosts() {
      try {
        const res = await fetch(`${API_URL}/admin/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setRecentPosts(data.data.slice(0, 5));
        }
      } catch {}
    }
    fetchStats();
    fetchRecentPosts();
  }, [token]);

  // Add delete and edit handlers for recent posts
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setRecentPosts(recentPosts.filter((p) => p.id !== id));
    } catch {}
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <Link
          to="/write"
          className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Posts</h2>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-Hard text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  By {post.author.name} • {post.status} • {post.views} views
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => navigate(`/post/${post.slug}`)}>
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => navigate(`/admin/posts/edit/${post.title}`)}>
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  onClick={() => handleDelete(post._id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/admin/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setPosts(data.data);
      } catch {}
      setLoading(false);
    }
    fetchPosts();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setPosts(posts.filter((p) => p.id !== id));
    } catch {}
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/posts/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPosts(posts.map((p) => (p.id === id ? { ...p, status } : p)));
      }
    } catch {}
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
        <Link
          to="/write"
          className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-Hard text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.excerpt.substring(0, 60)}...</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.author.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          post.id,
                          post.status === 'published' ? 'draft' : 'published'
                        )
                      }
                      className="ml-2 px-2 py-1 rounded bg-gray-100 text-xs text-gray-700 hover:bg-gray-200"
                    >
                      {post.status === 'published' ? 'Move to Draft' : 'Publish'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/post/${post.slug}`}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setUsers(data.data);
      } catch {}
      setLoading(false);
    }
    fetchUsers();
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-Hard text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-Hard text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminComments: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Comments Management</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-Hard text-gray-900 mb-2">No comments to moderate</h3>
        <p className="text-gray-600">Comments will appear here when users start engaging with posts.</p>
      </div>
    </div>
  );
};

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-Hard text-gray-700 mb-2">
              Site Title
            </label>
            <input
              type="text"
              defaultValue="Hard Clone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-Hard text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              defaultValue="A place to read, write, and deepen your understanding."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;