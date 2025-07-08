import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!email || !password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      }));
      return;
    }
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address',
      }));
      return;
    }
    setIsLoading(true);
    try {
      // Replace with your login API call
      await fakeLoginApiCall(email, password);
      // Redirect to dashboard or handle successful login
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="emailError"
        />
        {errors.email && (
          <span id="emailError" className="error">
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
          aria-describedby="passwordError"
        />
        {errors.password && (
          <span id="passwordError" className="error">
            {errors.password}
          </span>
        )}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;