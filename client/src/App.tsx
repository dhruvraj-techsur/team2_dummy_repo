import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

const TOKEN_KEY = 'auth_token';

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

const LoginPage: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
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
            setError('Invalid email or password.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.token) {
          onLogin(data.token);
        } else {
          setError('Invalid server response.');
        }
      } catch {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [onLogin]
  );

  return (
    <div className="App">
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
};

const ProtectedRoute: React.FC<{ isAuthenticated: boolean; children: React.ReactElement }> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const handleLogin = useCallback(
    (newToken: string) => {
      setToken(newToken);
      navigate('/dashboard', { replace: true });
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setToken(null);
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={!!token}>
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