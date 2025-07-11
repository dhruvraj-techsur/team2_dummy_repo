import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  </div>
);

const LoginWrapper: React.FC<{
  onLoginSuccess: (token: string) => void;
}> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('Login failed. Please try again.');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.token) {
        onLoginSuccess(data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const ProtectedRoute: React.FC<{
  token: string | null;
  children: React.ReactElement;
}> = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginWrapper onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={token ? '/dashboard' : '/'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;