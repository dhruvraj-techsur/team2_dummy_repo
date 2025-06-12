import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setSubmitError(result.message || 'Invalid credentials');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Welcome Back
        </h1>

        {!isLoading ? (
          <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
              <div className="mb-4 form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4 form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.password}
                  </div>
                )}
              </div>

              {submitError && (
                <div className="mt-4 text-center text-red-500 text-sm">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className={`w-full mt-auto px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </>
        )

        {isLoading && (
          <>
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-2">Loading...</span>
            </div>
          </>
        )}

        {submitted && (
          <>
            <div style={{ display: 'block' }}>
              <p className="text-center text-gray-600 mt-2">
                Demo Credentials:
              </p>
              <div className="mt-4">
                <p>Email: user@example.com</p>
                <p>Password: password</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;