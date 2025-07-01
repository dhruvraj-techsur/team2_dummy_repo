import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <main className="app-container" role="main" aria-label="Login Page">
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
}

export default App;