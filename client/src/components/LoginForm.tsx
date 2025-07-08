import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setServerError(null);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // On success
      navigate('/dashboard');
    } catch (error) {
      setServerError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
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