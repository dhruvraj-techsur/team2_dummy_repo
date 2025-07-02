import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container" lang="en">
      <section className="login-section" aria-label="Login Form">
        <h1>Login</h1>
        <p className="login-description">
          Please enter your email and password to access your account.
        </p>
        <LoginForm />
      </section>
    </div>
  );
}

export default App;