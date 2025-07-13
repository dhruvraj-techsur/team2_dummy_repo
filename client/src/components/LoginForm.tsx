import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    const validationErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Example API call - replace with actual login logic
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMsg(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // On success, redirect to dashboard or perform login logic here
      // For example: window.location.href = '/dashboard';
      setLoading(false);
    } catch (error) {
      setErrorMsg('An unexpected error occurred. Please try again.');
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
          required
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            if (errorMsg) setErrorMsg('');
          }}
        />
        {errors.email && (
          <span className="error" id="email-error" role="alert">
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
          required
          aria-required="true"
          aria-describedby={errors.password ? 'password-error' : undefined}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            if (errorMsg) setErrorMsg('');
          }}
        />
        {errors.password && (
          <span className="error" id="password-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>
      {errorMsg && (
        <div className="error" role="alert" style={{ marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;