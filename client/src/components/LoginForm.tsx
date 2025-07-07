import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const trimmedEmail = email.trim();
    const newErrors: { email?: string; password?: string } = {};

    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
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

      // Assuming response contains a token or session info
      // You might want to store token here (e.g., localStorage) if needed

      navigate('/dashboard');
    } catch {
      setErrors({ submit: 'Network error. Please try again.' });
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
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={loading}
        />
        {errors.email && (
          <span className="error" role="alert" id="email-error" aria-live="assertive">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          disabled={loading}
        />
        {errors.password && (
          <span className="error" role="alert" id="password-error" aria-live="assertive">
            {errors.password}
          </span>
        )}
      </div>
      {errors.submit && (
        <div className="error" role="alert" aria-live="assertive" style={{ marginBottom: '1rem' }}>
          {errors.submit}
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;