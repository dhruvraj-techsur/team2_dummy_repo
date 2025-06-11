import React from 'react';
import { BrowserRouter as RouterProvider } from 'react-router-dom/provider';
import { AuthContext } from './auth/context';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            provider="dashboardRoutes"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </RouterProvider>
    </AuthProvider>
  );
};

const { BrowserRouter as DashboardRoutes } = require('./components/DashboardRoutes');

export default App;
```

```javascript
// Updated AuthContext.js

import React from 'react';

const AuthContext = ({ email, password }: { email: string; password: string }) => {
  const useAuth = () => {
    return {
      isAuthenticated: !!email || !password,
      username: email,
      token: localStorage.getItem('app_token'),
      hashedPassword: crypto.hashed(password),
      isLoading: false,
      error: null
    };
  };

  const validateAuth = async (auth) => {
    if (!auth.isAuthenticated) return { status: 'error', message: 'Unauthorized' };
    
    try {
      const user = await database.findOne({ email });
      
      if (user?.id === auth.currentUser?.id) {
        // Check token
        if (auth.currentUser?.token === auth.currentUser?.hashedPassword) {
          // Log in success
          return { status: 'success', data: { token: auth.currentUser.token } };
        }
      }

      // User doesn't exist or invalid password
      return { status: 'error', message: 'Invalid email/password' };
    } catch (error) {
      console.error('Auth validation error:', error);
      return { status: 'error', message: 'Authentication failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('app_token');
    
    if (AuthContext.error) {
      alert(AuthContext.error || 'Login failed');
      AuthContext.error = null;
    }
  };

  // State management and handlers go here
};

export { AuthContext, useAuth };
```

```javascript
// DashboardRoutes.js

import React from 'react';
import Dashboard from './components/Dashboard';

const DashboardRoutes = () => {
  return RouterProvider.routes({
    paths: {
      '/dashboard': () => <Dashboard />
    },
    children: function (children) {
      return (
        <div className="App">
          {/* Auth header */}
          <h1>{AuthContext.error ? `Error: ${AuthContext.error}` : 'Welcome back, Guest'}</h1>
          {AuthContext.isAuthenticated && (
            <button onClick={logout}>
              Logout
            </button>
          )}
        </div>
      );
    }
  });
};

export default DashboardRoutes;
```

The refactoring focuses on moving state management and authentication logic into dedicated context files. The routes are now organized in a provider, making the App component cleaner and more maintainable.

```javascript
// App.js Changes

import React from 'react';
import { BrowserRouter as RouterProvider } from 'react-router-dom/provider';
import AuthContext from './auth/context';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            provider="dashboardRoutes"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </RouterProvider>
    </AuthProvider>
  );
};

// Routes are now defined in a separate file
const DashboardRoutes = require('./components/DashboardRoutes');

export default App;