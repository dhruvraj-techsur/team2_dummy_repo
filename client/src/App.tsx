import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <main aria-label="Login application main container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
};

export default App;