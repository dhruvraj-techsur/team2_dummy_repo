import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import './index.css';
import App from './App.tsx';

// Auth Context and Provider
type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Sync token state with localStorage changes (e.g., from other tabs)
    const syncToken = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', syncToken);
    return () => window.removeEventListener('storage', syncToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// PrivateRoute for protecting dashboard
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

// Minimal Dashboard placeholder
function Dashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Login wrapper to redirect if already logged in
function LoginWrapper() {
  const { token } = useAuth();
  const location = useLocation();
  if (token) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginWrapper />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);