import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';

function Dashboard() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Redirect to="/" />;
  }
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <main className="App">
                <h1>Login</h1>
                <LoginForm />
              </main>
            )
          }
        />
        <Route
          path="/dashboard"
          render={() => (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          )}
        />
        <Route
          render={() => <Redirect to={isAuthenticated ? '/dashboard' : '/'} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;