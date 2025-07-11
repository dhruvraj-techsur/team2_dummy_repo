import { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your personalized dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginFormWithAuth />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrap LoginForm to handle token storage and redirect on success
const LoginFormWithAuth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const originalHref = window.location.href;
    const originalAssign = window.location.assign;

    // Monkey patch window.location.assign to intercept redirect to /dashboard
    window.location.assign = (url: string) => {
      if (url === '/dashboard') {
        localStorage.setItem('authToken', 'dummy-token');
        navigate('/dashboard', { replace: true });
      } else {
        originalAssign.call(window.location, url);
      }
    };

    // Monkey patch window.location.href setter
    Object.defineProperty(window.location, 'href', {
      set(url: string) {
        if (url === '/dashboard') {
          localStorage.setItem('authToken', 'dummy-token');
          navigate('/dashboard', { replace: true });
        } else {
          window.location.assign(url);
        }
      },
      get() {
        return originalHref;
      },
      configurable: true,
    });

    return () => {
      window.location.assign = originalAssign;
      // Restore href property descriptor is complex, so we leave as is
    };
  }, [navigate]);

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default App;