import './App.css';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <main className="App" aria-label="Login page">
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
};

export default App;