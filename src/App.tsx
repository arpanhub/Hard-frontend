import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import BlogPost from './components/Blog/BlogPost';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import WritePost from './pages/WritePost';
import Profile from './pages/Profile';
import Search from './pages/Search';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Help from './pages/Help';

function App() {
  console.log("arpan")
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="post/:slug" element={<BlogPost />} />
              <Route path="search" element={<Search />} />
              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="help" element={<Help />} />
            </Route>

            {/* Auth routes (no layout) */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />            
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected routes */}
            <Route path="/" element={<Layout />}>
              <Route 
                path="write" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <WritePost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="profile/:userId" 
                element={<Profile />} 
              />
            </Route>

            {/* Admin routes */}
            <Route path="/" element={<Layout />}>
              <Route 
                path="admin/*" 
                element={
                  <ProtectedRoute requireAuth={true} requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;