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
      // Simulate login or call API here
      setTimeout(() => {
        setIsSubmitting(false);
        // Reset form or handle login success
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
          onChange={(e) => setEmail(e.target.value.trimStart())}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          style={{
            display: 'block',
            width: '100%',
            padding: '0.5em',
            marginTop: '0.25em',
            borderColor: errors.email ? '#e74c3c' : undefined,
          }}
        />
        {errors.email && (
          <span
            id="email-error"
            className="error"
            style={{ color: '#e74c3c', fontSize: '0.9em', marginTop: '0.25em', display: 'block' }}
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
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          style={{
            display: 'block',
            width: '100%',
            padding: '0.5em',
            marginTop: '0.25em',
            borderColor: errors.password ? '#e74c3c' : undefined,
          }}
        />
        {errors.password && (
          <span
            id="password-error"
            className="error"
            style={{ color: '#e74c3c', fontSize: '0.9em', marginTop: '0.25em', display: 'block' }}
          >
            {errors.password}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '0.75em',
          fontSize: '1em',
          backgroundColor: '#646cff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;