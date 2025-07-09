import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

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

function App() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check token on mount to determine auth status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, []);

  // Handle login submission from LoginForm
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage('Invalid email or password.');
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setAuthStatus('authenticated');
      } else {
        setErrorMessage('Login failed. No token received.');
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthStatus('unauthenticated');
  };

  if (authStatus === 'loading') {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="App">
        <h1>Login</h1>
        <LoginForm onSubmit={handleLogin} loading={loading} errorMessage={errorMessage} />
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard onLogout={handleLogout} />
    </div>
  );
}

export default App;