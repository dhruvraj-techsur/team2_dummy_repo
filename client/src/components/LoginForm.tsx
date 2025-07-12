import React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  control: any;
  errors: FieldErrors<LoginFormData>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ control, errors, isSubmitting, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="email" aria-label="Email Address">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              type="email"
              id="email"
              aria-describedby="email-error"
              required
              {...field}
            />
          )}
        />
        {errors.email && (
          <span id="email-error" className="error">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password" aria-label="Password">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              id="password"
              aria-describedby="password-error"
              required
              {...field}
            />
          )}
        />
        {errors.password && (
          <span id="password-error" className="error">
            {errors.password.message}
          </span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;