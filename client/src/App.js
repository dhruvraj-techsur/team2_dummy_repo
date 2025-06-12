import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function AuthProvider() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      try {
        const response = await axios.get('https://localhost:5000/users', { 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = response.data;
          setUser(data);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://localhost:5000/users', { 
        headers: {
          'Authorization': `${user?.token || ''}`
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.data}`);
      }

      const data = response.data;
      
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return {
    getAuthHeader: () => {
      return axios.headers.common['Authorization'];
    },
    loginUser: async (email, password) => {
      try {
        const response = await axios.post('https://localhost:5000/login', {
          email,
          password
        });
        
        if (!response.ok) {
          throw new Error(`Login failed: ${response.status}`);
        }

        const data = response.data;
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logoutUser: async () => {
      try {
        axios.post('https://localhost:5000/logout');
        setLoading(false);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            loading={true}
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;