import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container">
      <main id="main-content" tabIndex={-1} style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, overflow: 'hidden' }}>
        Main content starts here
      </main>
      <section className="login-section" aria-labelledby="login-heading">
        <h1 id="login-heading">Login</h1>
        <p className="login-description">
          Please enter your email and password to access your account.
        </p>
        <LoginForm />
      </section>
    </div>
  );
}

export default App;