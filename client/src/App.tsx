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

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your personalized dashboard.</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

const ProtectedRoute: React.FC<{ isAuthenticated: boolean; children: JSX.Element }> = ({
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
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(
    (authToken: string) => {
      localStorage.setItem('authToken', authToken);
      setToken(authToken);
      navigate('/dashboard', { replace: true });
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    // Optional: could verify token validity here or on backend
  }, [token]);

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
    </div>
  );
}

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;