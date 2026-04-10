import React, { useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { loginValidationSchema } from '@/shared/validators/auth.validators';
import { ROUTES } from '@/shared/constants/routes.constants';
import type { LoginValues } from '@/shared/types';

interface LoginFormProps {
  onSubmit: (values: LoginValues) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: '',
      password: '',
      role: 'candidate',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      <div className="flex bg-[#0a2329] p-1 rounded-lg border border-teal-900/50">
        {['candidate', 'employer', 'admin'].map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => formik.setFieldValue('role', role)}
            className={`flex-1 py-2 text-sm capitalize rounded-md transition-colors ${
              formik.values.role === role ? 'bg-teal-500 text-slate-900 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
          placeholder="Email Address"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-400 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none pr-10"
          placeholder="Password"
        />
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-400 text-sm mt-1">{formik.errors.password}</div>
        ) : null}
      </div>

      <motion.button
        type="submit"
        disabled={formik.isSubmitting || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold disabled:opacity-50 mt-2"
      >
        {formik.isSubmitting || isLoading ? 'Logging in...' : 'Log In'}
      </motion.button>
      
      <div className="mt-4 text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <Link 
          to={formik.values.role === 'employer' ? ROUTES.AUTH.REGISTER_EMPLOYER : ROUTES.AUTH.REGISTER_CANDIDATE} 
          className="text-teal-400 hover:underline"
        >
          Register here
        </Link>
      </div>
    </form>
  );
};
