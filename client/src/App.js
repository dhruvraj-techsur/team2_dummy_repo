import React from 'react';
import { BrowserRouter as Router, Routes, Route, RouteGroup } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App({ children }) {
  return (
    <Router>
      <RouteGroup prop={children} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;