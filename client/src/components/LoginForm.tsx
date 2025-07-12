import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: LoginFormInputs) => {
    try {
      // Handle login logic here
      // Ensure to handle sensitive data securely
      console.log('Login data:', data);
    } catch (error) {
      // Handle error appropriately
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          aria-label="Email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          aria-label="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;