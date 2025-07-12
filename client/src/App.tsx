import React, { Suspense, lazy } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginForm = lazy(() => import('./components/LoginForm'));

const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const App: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      // Perform login logic here
      // On success:
      navigate('/dashboard');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Suspense>
    </div>
  );
};

export default App;