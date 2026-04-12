import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { employerLogin } from '@/store/slices/employerSlice';
import { useRegisterEmployer } from '@/modules/auth/hooks/useRegisterEmployer';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useToast } from '@/shared/hooks/useToast';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import type { EmployerRegisterValues, EmployerUser } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { setSession } from '@/shared/utils/session';
import { pageVariants } from '@/shared/animations/auth.animations';
import { EmployerRegisterForm } from '../components/employer/EmployerRegisterForm';
import { usePlans } from '../hooks/usePlans';

const EmployerRegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: register, isPending: isRegistering } = useRegisterEmployer();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const handleRegisterSubmit = (values: EmployerRegisterValues) => {
    register(values, {
      onSuccess: () => {
        login({
          email: values.email,
          password: values.password,
          role: 'employer',
        }, {
          onSuccess: (loginResponse) => {
            const { user } = loginResponse.data;
            setSession('employer');
            dispatch(employerLogin(user as EmployerUser));
            toast.success(loginResponse.message);
            navigate(ROUTES.EMPLOYER.DASHBOARD);
          },
          onError: (error: unknown) => {
            toast.error(getErrorMessage(error));
          },
        });
      },
      onError: (error: unknown) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const { data: plansData } = usePlans();
  const plans = plansData?.data || [];

  return (
    <div className="min-h-screen bg-[#0a2329] text-white flex flex-col items-center justify-center p-4">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-2xl bg-[#0d2e36] p-8 rounded-2xl shadow-xl border border-teal-900/50"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-teal-400 mb-2">Grow with TalentOS</h1>
          <p className="text-gray-400">Create your employer account</p>
        </div>

        <EmployerRegisterForm 
          onSubmit={handleRegisterSubmit} 
          isLoading={isRegistering || isLoggingIn} 
          plans={plans}
        />
        
        <div className="mt-6 text-center text-gray-400">
          Already have an account? <Link to={ROUTES.AUTH.LOGIN} className="text-teal-400 hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployerRegisterPage;