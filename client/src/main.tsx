import { StrictMode } from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  </StrictMode>
);