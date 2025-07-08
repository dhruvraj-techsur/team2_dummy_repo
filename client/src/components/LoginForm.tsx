import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: async (data) => {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (err) {
        return { values: {}, errors: err.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = { message: curr.message };
          return acc;
        }, {}) };
      }
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Handle successful form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="error">
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
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <span id="password-error" className="error">
            {errors.password.message}
          </span>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;