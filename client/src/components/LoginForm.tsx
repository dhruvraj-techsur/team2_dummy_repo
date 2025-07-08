import React, { useState } from 'react';

const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
    reset: () => setValue(initialValue),
  };
};

const LoginForm: React.FC = () => {
  const email = useFormInput('');
  const password = useFormInput('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.value) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password.value) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission logic
      console.log('Form submitted');
      email.reset();
      password.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...email} />
        {errors.email && (
          <span className="error" role="alert" aria-live="assertive">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...password} />
        {errors.password && (
          <span className="error" role="alert" aria-live="assertive">
            {errors.password}
          </span>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;