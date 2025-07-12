import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div className="App" aria-label="Login application main container">
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </div>
  );
}

export default App;