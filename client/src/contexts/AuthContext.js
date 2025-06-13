import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData().catch(error => {
        console.error('Token verification error:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    const response = await axios.get('/api/user');
    if (response.status === 200) {
      setUser(response.data);
      setIsAuthenticated(true);
    } else {
      throw new Error('Failed to fetch user data');
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  };

  const logout = async () => {
    const response = await axios.post('/api/logout');
    if (response.status === 200) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
    } else {
      throw new Error('Logout failed');
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};