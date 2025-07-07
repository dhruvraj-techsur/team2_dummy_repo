import React, { useState, useEffect, FormEvent } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL ?? '';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, submit: undefined }));

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          navigate('/dashboard');
        } else {
          setErrors({ submit: 'Invalid response from server' });
        }
      } else if (response.status === 401) {
        setErrors({ submit: 'Invalid email or password' });
      } else {
        setErrors({ submit: 'Login failed. Please try again later.' });
      }
    } catch {
      setErrors({ submit: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            required
          />
          {errors.email && (
            <span className="error" id="email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            required
          />
          {errors.password && (
            <span className="error" id="password-error" role="alert">
              {errors.password}
            </span>
          )}
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: '1.5rem' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {errors.submit && (
          <div className="error" role="alert" style={{ marginTop: '1rem' }}>
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;