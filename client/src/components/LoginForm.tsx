import React, { useState, FormEvent } from 'react';

interface Errors {
  email?: string;
  password?: string;
  form?: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format.';

    if (!password) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Replace the following with actual login logic/API call:
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({ form: 'Invalid email or password.' });
        } else {
          setErrors({ form: 'Login failed. Please try again later.' });
        }
      } else {
        // On success, redirect to dashboard (adjust as needed)
        window.location.href = '/dashboard';
      }
    } catch {
      setErrors({ form: 'Network error. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-describedby="form-error" noValidate>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          value={password}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && (
          <span className="error" id="password-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>
      {errors.form && (
        <div className="error" id="form-error" role="alert" tabIndex={-1}>
          {errors.form}
        </div>
      )}
      <button type="submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;