import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="*">
                <div>404 Not Found</div>
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;