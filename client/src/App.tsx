import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Login</h1>
        <LoginForm />
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false; // Replace with actual authentication logic
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default App;