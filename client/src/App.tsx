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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLoginSuccess = useCallback((newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
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
            <ProtectedRoute isAuthenticated={!!token}>
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