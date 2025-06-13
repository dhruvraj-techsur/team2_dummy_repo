import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  return '';
};

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setSubmitError(error.message);
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          {submitError && (
            <div className="error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {submitError}
            </div>
          )}

          <button 
            type="submit" 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#666' }}>
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: user@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;