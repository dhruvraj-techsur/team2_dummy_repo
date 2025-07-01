import { StrictMode } from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  </StrictMode>
);