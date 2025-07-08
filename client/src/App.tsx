import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide authentication context to the app
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check for token in local storage to determine initial authentication state
    return !!localStorage.getItem('authToken');
  });

  // Function to handle login
  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Home component
const Home: React.FC = () => <h2>Home</h2>;

// Dashboard component
const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  return (
    <>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
};

// Login component
const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (token: string) => {
    login(token);
    // Redirect to dashboard after login
    window.location.href = '/dashboard';
  };

  return <LoginForm onLogin={handleLogin} />;
};

// App component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;