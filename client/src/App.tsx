import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container">
      <main>
        <h1>Login</h1>
        <p>Please enter your email and password to access the app.</p>
        <LoginForm />
      </main>
    </div>
  );
}

export default App;