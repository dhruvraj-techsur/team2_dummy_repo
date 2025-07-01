import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

// Auth context types
interface AuthContextType {
  token: string | null;
  user: { email: string } | null;
  login: (token: string, user: { email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const email = localStorage.getItem('userEmail');
    return email ? { email } : null;
  });

  const login = (newToken: string, user: { email: string }) => {
    setToken(newToken);
    setUser(user);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', user.email);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route component
const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Dashboard component
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Login wrapper to handle redirect after login
const LoginScreen: React.FC = () => {
  const { token, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <h1>Login</h1>
      <LoginForm
        onLoginSuccess={(token: string, email: string) => {
          login(token, { email });
          navigate('/dashboard', { replace: true });
        }}
      />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;