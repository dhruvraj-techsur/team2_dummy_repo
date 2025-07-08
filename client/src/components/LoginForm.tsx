import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
      // Replace with your actual login API call
      const response = await fakeLoginApi(data);
      if (response.success) {
        navigate('/dashboard');
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      setServerError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              type="email"
              id="email"
              {...field}
              className={errors.email ? 'input-error' : ''}
            />
          )}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              id="password"
              {...field}
              className={errors.password ? 'input-error' : ''}
            />
          )}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      {serverError && <div className="server-error">{serverError}</div>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// Mock login API function
const fakeLoginApi = async (data: LoginFormInputs) => {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      if (data.email === 'user@example.com' && data.password === 'password') {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: 'Invalid email or password' });
      }
    }, 1000);
  });
};

export default LoginForm;