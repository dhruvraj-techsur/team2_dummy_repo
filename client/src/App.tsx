import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container" aria-label="Login Screen">
      <div className="login-form-wrapper">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;