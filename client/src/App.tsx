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

const API_URL = import.meta.env.VITE_API_URL ?? '';

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const handleLogin = useCallback(
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
          setToken(data.token);
          navigate('/dashboard');
        } else {
          setError('Invalid response from server.');
        }
      } catch {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setToken(null);
    navigate('/login');
  }, [navigate]);

  if (loading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <>
                <h1>Login</h1>
                <LoginForm onSubmit={handleLogin} errorMessage={error} />
              </>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}