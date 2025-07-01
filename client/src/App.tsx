import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

type User = {
  email: string;
};

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [route, setRoute] = useState<'login' | 'dashboard'>('login');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  // Handle route changes based on authentication
  useEffect(() => {
    if (token) {
      setRoute('dashboard');
    } else {
      setRoute('login');
    }
  }, [token]);

  // Simulate fetching user info with token (could be replaced with real API call)
  useEffect(() => {
    if (token) {
      // In a real app, fetch user info here
      const storedEmail = localStorage.getItem('userEmail');
      setUser(storedEmail ? { email: storedEmail } : null);
    } else {
      setUser(null);
    }
  }, [token]);

  const handleLoginSuccess = (token: string, email: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    setUser({ email });
    setRoute('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setRoute('login');
  };

  // Protect dashboard route
  if (route === 'dashboard' && !token) {
    setRoute('login');
    return null;
  }

  return (
    <div className="App">
      {route === 'login' && (
        <section aria-label="Login Section">
          <h1>Login</h1>
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            apiUrl={API_URL}
          />
        </section>
      )}
      {route === 'dashboard' && token && (
        <section aria-label="Dashboard Section">
          <h1>Dashboard</h1>
          <div style={{ marginBottom: '1.5rem' }}>
            <span>
              Welcome{user?.email ? `, ${user.email}` : ''}!
            </span>
          </div>
          <button onClick={handleLogout} aria-label="Logout">
            Logout
          </button>
        </section>
      )}
    </div>
  );
}

export default App;