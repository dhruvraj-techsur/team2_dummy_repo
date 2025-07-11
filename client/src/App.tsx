import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <main id="root" role="main">
      <h1 aria-label="Login Page">Login</h1>
      <LoginForm />
    </main>
  );
}

export default App;