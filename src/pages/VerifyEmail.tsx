import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [email] = useState(location.state?.email || '');
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);

  // Handle verification via token in URL
  useEffect(() => {
    if (token) {
      (async () => {
        setError('');
        try {
          const res = await fetch(`${API_URL}/auth/verify-email/${token}`);
          const data = await res.json();
          if (res.ok && data.success) {
            setIsVerified(true);
          } else {
            setError(data.message || 'Verification failed.');
          }
        } catch {
          setError('Verification failed. Please try again.');
        }
      })();
    }
  }, [token]);

  // If user lands here without email and without token, redirect to register
  useEffect(() => {
    if (!email && !token) {
      navigate('/register');
    }
  }, [email, token, navigate]);

  // Optionally: implement resend verification email if you have such an endpoint
  const handleResendEmail = async () => {
    setIsResending(true);
    setError('');
    setResendSuccess(false);

    try {
      const res = await fetch(`${API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResendSuccess(true);
      } else {
        setError(data.message || 'Failed to resend verification email.');
      }
    } catch {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now sign in to your account.
            </p>
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-Hardext-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900">Hard</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Check your email
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <Mail className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-Hardext-gray-900 mb-4">
              Verify your email address
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent a verification link to{' '}
              <span className="font-Hardext-gray-900">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Click the link in the email to verify your account. If you don't see the email, check your spam folder.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {resendSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-green-700">
                  Verification email sent successfully!
                </span>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleResendEmail}
                disabled={isResending || !email}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-Hardext-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend verification email
                  </>
                )}
              </button>

              <div className="text-sm text-center">
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-500"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;