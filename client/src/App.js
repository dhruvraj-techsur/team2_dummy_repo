import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <main className="app-container" role="main">
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
};

export default App;