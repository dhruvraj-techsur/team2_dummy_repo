import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div className="app-container" lang="en">
      <main aria-label="Login screen">
        <h1>Login</h1>
        <LoginForm />
      </main>
    </div>
  );
};

export default App;