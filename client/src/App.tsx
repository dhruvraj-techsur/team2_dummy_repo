import React, { Suspense, lazy } from 'react';
import './App.css';

const LoginForm = lazy(() => import('./components/LoginForm'));

const App: React.FC = () => {
  return (
    <div className="App" role="main">
      <h1>Login</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default App;