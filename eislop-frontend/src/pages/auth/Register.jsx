import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput.jsx';
import { validateEmail, validateRequired } from '../../utils/validators.js';
import { useAuth } from '../../hooks/useAuth.js';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'ADMIN' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!validateRequired(form.name)) nextErrors.name = 'Name is required.';
    if (!validateEmail(form.email)) nextErrors.email = 'Provide a valid email address.';
    if (!validateRequired(form.password)) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      await register(form);
      navigate('/auth/login');
    } catch (err) {
      if (err) {
        // toast handled in context
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-800">Create Your Account</h2>
        <p className="text-sm text-slate-500">Invite teammates and orchestrate your logistics workflows.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          name="name"
          label="Full Name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          required
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

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
          disabled={loading}
          className="w-full rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow disabled:opacity-60"
        >
          Register
        </button>
      </form>
      <p className="text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
