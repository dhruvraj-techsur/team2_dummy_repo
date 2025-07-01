import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

const Dashboard: React.FC = () => {
  return <h1>Dashboard</h1>;
};

const PrivateRoute: React.FC<{ component: React.FC; path: string; exact: boolean }> = (props) => {
  const condition = localStorage.getItem('token');
  return condition ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login function
    localStorage.setItem('token', '123456');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Mock logout function
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact render={() => <LoginForm onLogin={handleLogin} />} />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </Switch>
      </div>
    </Router>
  );
}

export default App;