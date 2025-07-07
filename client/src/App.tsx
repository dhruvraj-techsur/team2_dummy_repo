import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = useCallback(async (email: string, password: string) => {
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
          setError('An error occurred. Please try again.');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        navigate('/dashboard', { replace: true });
      } else {
        setError('Invalid response from server.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <>
                <h1>Login</h1>
                <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
              </>
            )
          }
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
    </div>
  );
}

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;