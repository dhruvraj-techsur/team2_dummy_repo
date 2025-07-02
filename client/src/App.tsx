import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app-container">
      <main>
        <section className="login-section" aria-label="Login Section">
          <h1>Login</h1>
          <p className="subtitle">Please enter your credentials to access the app.</p>
          <LoginForm />
        </section>
      </main>
    </div>
  );
}

export default App;