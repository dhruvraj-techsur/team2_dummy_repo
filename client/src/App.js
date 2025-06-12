import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Authenticated users should be redirected to dashboard on login */}
          <Route path="/login" element={<AuthHeaderCheck><Navigate to="/dashboard" replace />} />
          
          {/* Dashboard protected by authentication token */
          <Route 
            path="/" 
            element={
              <AuthHeaderCheck>
                <Navigate to="/login" replace={true} />
              </AuthHeaderCheck>
            }
          />
          
          {/* Logout button for authenticated users */}
          <Route path="/logout" element={<Logout />} />
          
          {/* Other routes remain the same */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;