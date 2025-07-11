import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

interface DashboardProps {
  onLogout: () => void;
  userEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userEmail }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userEmail}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const TOKEN_KEY = 'authToken';
const USER_EMAIL_KEY = 'userEmail';

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem(USER_EMAIL_KEY) || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_EMAIL_KEY, email);
        setToken(data.token);
        setUserEmail(email);
      } else {
        setError('Login failed. No token received.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    setToken(null);
    setUserEmail('');
    setError(null);
  };

  // Protect dashboard access by verifying token presence
  if (!token) {
    return (
      <div className="App">
        <h1>Login</h1>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard onLogout={handleLogout} userEmail={userEmail} />
    </div>
  );
}

export default App;