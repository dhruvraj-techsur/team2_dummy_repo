import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    setServerError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="email" id="email" {...field} />}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="password" id="password" {...field} />}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      {serverError && <span className="error">{serverError}</span>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;