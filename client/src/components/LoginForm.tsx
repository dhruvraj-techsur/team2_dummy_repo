import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
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

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({ submit: 'Invalid email or password' });
        } else {
          setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setErrors({ submit: 'Login failed: no token received' });
      }
    } catch {
      setErrors({ submit: 'Network error. Please try again later.' });
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
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          aria-invalid={!!errors.email}
          disabled={loading}
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="password-error"
          aria-invalid={!!errors.password}
          disabled={loading}
        />
        {errors.password && (
          <span className="error" id="password-error" role="alert" aria-live="assertive">
            {errors.password}
          </span>
        )}
      </div>
      {errors.submit && (
        <div className="error" role="alert" aria-live="assertive" style={{ marginBottom: '1rem' }}>
          {errors.submit}
        </div>
      )}
      <button type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;