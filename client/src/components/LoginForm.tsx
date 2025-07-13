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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    const trimmedEmail = email.trim();
    const newErrors: Errors = {};

    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Invalid email format';
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      if (response.ok) {
        // Assuming backend returns a JSON with token or user data
        const data = await response.json();
        // Store token securely (for example in localStorage)
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // Redirect to dashboard on successful login
        navigate('/dashboard');
      } else if (response.status === 401) {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Invalid credentials' });
      } else {
        setErrors({ submit: 'An unexpected error occurred. Please try again later.' });
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your connection.' });
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
          aria-describedby="email-error"
          aria-invalid={!!errors.email}
          autoComplete="username"
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
          aria-describedby="password-error"
          aria-invalid={!!errors.password}
          autoComplete="current-password"
          required
        />
        {errors.password && (
          <span className="error" id="password-error" role="alert" aria-live="assertive">
            {errors.password}
          </span>
        )}
      </div>

      {errors.submit && (
        <div className="error submit-error" role="alert" aria-live="assertive">
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