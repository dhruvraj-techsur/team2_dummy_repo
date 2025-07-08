import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;