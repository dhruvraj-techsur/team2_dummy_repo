import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        } else {
          setErrors({ general: 'Invalid response from server.' });
        }
      } else if (response.status === 401) {
        setErrors({ general: 'Invalid email or password.' });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } catch {
      setErrors({ general: 'Failed to connect to the server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          disabled={loading}
          required
        />
        {errors.email && (
          <span className="error" id="email-error" role="alert" aria-live="assertive">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          disabled={loading}
          required
        />
        {errors.password && (
          <span className="error" id="password-error" role="alert" aria-live="assertive">
            {errors.password}
          </span>
        )}
      </div>
      {errors.general && (
        <div className="error" role="alert" aria-live="assertive" style={{ marginBottom: '1rem' }}>
          {errors.general}
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;