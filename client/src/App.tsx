import React, { useEffect, useState } from 'react';
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

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          authToken ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <>
              <h1>Login</h1>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={authToken ? '/dashboard' : '/'} replace />} />
    </Routes>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;