import React, { FC } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

const App: FC = (): JSX.Element => {
  return (
    <main className="app-container" role="main">
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
};

export default App;