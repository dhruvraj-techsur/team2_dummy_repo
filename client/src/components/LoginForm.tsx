import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Real-time validation
    if (name === 'email' && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
    } else if (name === 'password' && !validatePassword(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submission
    const newErrors: { email?: string; password?: string } = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Proceed with form submission (e.g., API call)
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" className="error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" className="error">
            {errors.password}
          </span>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;