import React from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="App">
        <h1>Login</h1>
        <LoginForm />
        <nav>
          <Link to="/dashboard">Go to Dashboard</Link>
        </nav>
      </div>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <div className="App">
        <h1>Dashboard</h1>
        <Dashboard />
        <nav>
          <Link to="/">Back to Login</Link>
        </nav>
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;