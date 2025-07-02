import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container">
      <section aria-labelledby="login-heading" className="login-section">
        <h1 id="login-heading">Login</h1>
        <p>Please enter your email and password to access the app.</p>
        <LoginForm />
      </section>
    </div>
  );
}

export default App;