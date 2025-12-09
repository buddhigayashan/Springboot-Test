import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput.jsx';
import Loader from '../../components/Loader.jsx';
import { validateEmail, validateRequired } from '../../utils/validators.js';
import { useAuth } from '../../hooks/useAuth.js';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!validateEmail(form.email)) nextErrors.email = 'Provide a valid email address.';
    if (!validateRequired(form.password)) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      if (err) {
        // toast handled centrally
      }
    }
  };

  if (loading) return <Loader message="Authenticating..." />;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-800">Welcome Back</h2>
        <p className="text-sm text-slate-500">Log in to manage the EISLOP platform.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com"
          required
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

        <FormInput
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

        <button
          type="submit"
          className="w-full rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Sign in
        </button>
      </form>
      <p className="text-center text-xs text-slate-500">
        Need an account?{' '}
        <Link to="/auth/register" className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
