import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const { user } = useAuth();

  function getJsonObject(data) {
    return JSON.parse(localStorage.getItem(data));
  }

  function getUserData(userDataKey) {
    if (!user) return null;
    return getJsonObject(userDataKey);
  }

  // Routes
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard user={user} userDataKey="username">
                  {getUserData('welcome')}
                </Dashboard>
              </ProtectedRoute>
            } 
          />
          
          {/* Default route for login when user is not authenticated */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;