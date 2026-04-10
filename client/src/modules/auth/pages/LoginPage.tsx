import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useToast } from '@/shared/hooks/useToast';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { setSession } from '@/shared/utils/session';
import { ROUTES } from '@/shared/constants/routes.constants';
import { pageVariants } from '@/shared/animations/auth.animations';
import { candidateLogin } from '@/store/slices/candidateSlice';
import { employerLogin } from '@/store/slices/employerSlice';
import { adminLogin } from '@/store/slices/adminSlice';
import type { LoginValues, CandidateUser, EmployerUser, AdminUser } from '@/shared/types';
import { LoginForm } from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate: login, isPending } = useLogin();

  const handleLoginSubmit = (values: LoginValues) => {
    login(values, {
      onSuccess: (response) => {
        const { user } = response.data;
        setSession(values.role);

        if (values.role === 'candidate') {
          dispatch(candidateLogin(user as CandidateUser));
          navigate(ROUTES.CANDIDATE.DASHBOARD);
        } else if (values.role === 'employer') {
          dispatch(employerLogin(user as EmployerUser));
          navigate(ROUTES.EMPLOYER.DASHBOARD);
        } else if (values.role === 'admin') {
          dispatch(adminLogin(user as AdminUser));
          navigate(ROUTES.ADMIN.DASHBOARD);
        }
        
        toast.success(response.message);
      },
      onError: (error: unknown) => {
        toast.error(getErrorMessage(error));
      },
    });
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

        <LoginForm onSubmit={handleLoginSubmit} isLoading={isPending} />
      </motion.div>
    </div>
  );
};

export default LoginPage;
