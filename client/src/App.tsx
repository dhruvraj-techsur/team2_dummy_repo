import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import './App.css';
import LoginForm from './components/LoginForm';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function App() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: async (data) => {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (err) {
        const validationErrors = err.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        return { values: {}, errors: validationErrors };
      }
    },
  });

  const onSubmit = (data: any) => {
    // Handle successful form submission
    console.log('Form submitted:', data);
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span id="email-error" className="error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="password-error"
          />
          {errors.password && (
            <span id="password-error" className="error" role="alert">
              {errors.password.message}
            </span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;