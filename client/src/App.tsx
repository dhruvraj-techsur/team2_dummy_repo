import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <main className="App" aria-label="Login Screen">
      <div className="container">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}

export default App;