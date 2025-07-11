import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const TypedLoginForm = LoginForm as React.FC<LoginFormProps>;

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const LoginWrapper: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/login', {
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
        localStorage.setItem('authToken', data.token);
        onLogin(data.token);
        navigate('/dashboard');
      } else {
        setError('Login failed. No token received.');
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
      <TypedLoginForm onSubmit={handleLogin} loading={loading} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <LoginWrapper onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;