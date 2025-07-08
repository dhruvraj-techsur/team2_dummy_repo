import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const LoginPage: React.FC<{ onLoginSuccess: (token: string) => void }> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Invalid email or password.');
          } else {
            setError('An error occurred. Please try again.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          onLoginSuccess(data.token);
        } else {
          setError('Invalid server response.');
        }
      } catch {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [onLoginSuccess]
  );

  return (
    <div className="App">
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
};

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(
    (newToken: string) => {
      setToken(newToken);
      navigate('/dashboard', { replace: true });
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={token ? '/dashboard' : '/'} replace />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}