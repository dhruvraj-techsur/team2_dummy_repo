import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <main className="app-container">
      <section className="login-section">
        <h1>Login</h1>
        <p>Please enter your email and password to access your account.</p>
        <LoginForm />
      </section>
    </main>
  );
}

export default App;