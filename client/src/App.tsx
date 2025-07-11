import React, { useState, useEffect, ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuth(!!token);
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

const App: React.FC = (): ReactElement => (
  <Router>
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <div className="App">
            <h1>Login</h1>
            <LoginForm />
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;