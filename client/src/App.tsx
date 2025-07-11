import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

type LoginFormType = React.FC<{ onLoginSuccess: () => void }>;

const TypedLoginForm = LoginForm as unknown as LoginFormType;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <h1>Login</h1>
      {!isAuthenticated ? (
        <TypedLoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <p>Welcome back!</p>
      )}
    </div>
  );
};

export default App;