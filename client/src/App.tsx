import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container" role="main">
      <h1 className="visually-hidden">Login</h1>
      <section
        aria-labelledby="login-title"
        className="login-section"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}
      >
        <div
          className="login-form-wrapper"
          style={{
            background: 'rgba(255,255,255,0.04)',
            padding: '2rem 2.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            minWidth: 320,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <h2 id="login-title" style={{ marginBottom: '0.5em' }}>
            Login
          </h2>
          <p style={{ marginBottom: '1.5em', color: '#888', fontSize: '1em' }}>
            Please enter your email and password to access the app.
          </p>
          <LoginForm />
        </div>
      </section>
    </div>
  );
}

export default App;