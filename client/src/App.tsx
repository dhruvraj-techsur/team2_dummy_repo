import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    // Clear user session or token here
    // Then redirect to login
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* User-specific content goes here */}
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginForm onLogin={() => setIsLoggedIn(true)} />}
        </Route>
        <Route path="/dashboard">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;