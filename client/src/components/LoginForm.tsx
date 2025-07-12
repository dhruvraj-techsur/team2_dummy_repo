import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      // Implement secure authentication logic here
      // For example, send a POST request to the backend API
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
      // if (response.ok) {
      //   // Store token securely, e.g., in HttpOnly cookie
      //   // navigate('/dashboard');
      // } else {
      //   // Handle error
      // }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="login-form">
      <h2 id="login-form">Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          aria-describedby="email-error"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <span id="email-error" role="alert">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required' })}
          aria-describedby="password-error"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && <span id="password-error" role="alert">{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;