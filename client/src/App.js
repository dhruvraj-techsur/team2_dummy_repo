import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
        <Redirect from="/" to="/login" />
      </Router>
    </AuthProvider>
  );
}

export default App;