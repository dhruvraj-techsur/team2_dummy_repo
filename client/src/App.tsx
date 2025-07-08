import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = false; // Replace with actual authentication logic
  if (!isAuthenticated) {
    return <Link to="/">Please log in to access the dashboard.</Link>;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Login</h1>
        <LoginForm />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;