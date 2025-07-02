import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate async login or call API here
      setTimeout(() => {
        setIsSubmitting(false);
        // Handle successful login here
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          onChange={(e) => setEmail(e.target.value.trimStart())}
          style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
        />
        {errors.email && (
          <span
            id="email-error"
            className="error"
            style={{ color: '#d32f2f', fontSize: '0.9em', marginTop: '0.25rem', display: 'block' }}
          >
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          required
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
        />
        {errors.password && (
          <span
            id="password-error"
            className="error"
            style={{ color: '#d32f2f', fontSize: '0.9em', marginTop: '0.25rem', display: 'block' }}
          >
            {errors.password}
          </span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;