import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { loginCandidate } from '@/store/slices/candidateSlice';
import { loginEmployer } from '@/store/slices/employerSlice';
import { loginAdmin } from '@/store/slices/adminSlice';
import { AuthService } from '@/modules/auth/services/auth.service';
import { useToast } from '@/shared/hooks/useToast';
import type { LoginValues } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { Eye, EyeOff } from 'lucide-react';
import { loginValidationSchema } from '@/shared/validators/auth.validators';
import { pageVariants } from '@/shared/animations/auth.animations';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values: LoginValues, { setSubmitting }: any) => {
    try {
      const response = await AuthService.login(values);
      const { user, accessToken } = response.data.data;

      localStorage.setItem('talentos_session', JSON.stringify({ role: values.role }));

      if (values.role === 'candidate') {
        dispatch(loginCandidate({ user, accessToken }));
        navigate(ROUTES.CANDIDATE.DASHBOARD);
      } else if (values.role === 'employer') {
        dispatch(loginEmployer({ user, accessToken }));
        navigate(ROUTES.EMPLOYER.DASHBOARD);
      } else if (values.role === 'admin') {
        dispatch(loginAdmin({ user, accessToken }));
        navigate(ROUTES.ADMIN.DASHBOARD);
      }
      
      toast.success('Successfully logged in');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a2329] text-white flex flex-col items-center justify-center p-4">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-md bg-[#0d2e36] p-8 rounded-2xl shadow-xl border border-teal-900/50"
      >
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-teal-500 rounded-xl mb-4 flex items-center justify-center font-bold text-2xl text-slate-900 shadow-lg shadow-teal-500/20">
            T
          </div>
          <h1 className="text-3xl font-bold text-teal-400 mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to your TalentOS account</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '', role: 'candidate' } as LoginValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col gap-6">
              <div className="flex bg-[#0a2329] p-1 rounded-lg border border-teal-900/50">
                {['candidate', 'employer', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFieldValue('role', role)}
                    className={`flex-1 py-2 text-sm capitalize rounded-md transition-colors ${
                      values.role === role ? 'bg-teal-500 text-slate-900 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div>
                <Field name="email" type="email" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div className="relative">
                <Field 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
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
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold disabled:opacity-50 mt-2"
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </motion.button>
              
              <div className="mt-4 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to={values.role === 'employer' ? ROUTES.AUTH.REGISTER_EMPLOYER : ROUTES.AUTH.REGISTER_CANDIDATE} 
                  className="text-teal-400 hover:underline"
                >
                  Register here
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default LoginPage;
