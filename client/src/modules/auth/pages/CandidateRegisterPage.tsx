import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { candidateLogin } from '@/store/slices/candidateSlice';
import { useRegisterCandidate } from '@/modules/auth/hooks/useRegisterCandidate';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useToast } from '@/shared/hooks/useToast';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import type { CandidateRegisterValues, CandidateUser } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { setSession } from '@/shared/utils/session';
import { pageVariants } from '@/shared/animations/auth.animations';
import { CandidateRegisterForm } from '../components/candidate/CandidateRegisterForm';
import { useFormik } from 'formik';
import { useMultiStepForm } from '@/modules/auth/hooks/useMultiStepForm';
import { candidateValidationSchema } from '@/shared/validators/auth.validators';
import { MESSAGES } from '@/shared/constants/messages.constants';

const CandidateRegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: register, isPending: isRegistering } = useRegisterCandidate();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const {
    step,
    direction,
    handleNext,
    handleBack,
    isLastStep
  } = useMultiStepForm<CandidateRegisterValues>({
    totalSteps: 4,
    getFieldsToValidate: (s) => {
      if (s === 0) return ['full_name', 'email', 'password', 'phone'];
      if (s === 1) return ['skills', 'location'];
      if (s === 2) return ['resume_url'];
      return [];
    }
  });

  const formik = useFormik<CandidateRegisterValues>({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      phone: '',
      skills: [],
      location: '',
      resume_url: '',
    },
    validationSchema: candidateValidationSchema,
    onSubmit: (values) => {
      handleRegisterSubmit(values);
    },
  });

  const handleRegisterSubmit = (values: CandidateRegisterValues) => {
    if (!isLastStep) return;
    
    if (!values.resume_url) {
      toast.error(MESSAGES.UPLOAD.RESUME_REQUIRED);
      return;
    }

    register(values, {
      onSuccess: () => {
        login({
          email: values.email,
          password: values.password,
          role: 'candidate',
        }, {
          onSuccess: (loginResponse) => {
            const { user } = loginResponse.data;
            setSession('candidate');
            dispatch(candidateLogin(user as CandidateUser));
            toast.success(loginResponse.message);
            navigate(ROUTES.CANDIDATE.DASHBOARD);
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

  return (
    <div className="min-h-screen bg-[#0a2329] text-white flex flex-col items-center justify-center p-4">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-lg bg-[#0d2e36] p-8 rounded-2xl shadow-xl border border-teal-900/50"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-teal-400 mb-2">Join TalentOS</h1>
          <p className="text-gray-400">Create your candidate profile</p>
        </div>

        <CandidateRegisterForm 
          formik={formik}
          step={step}
          direction={direction}
          handleNext={handleNext}
          handleBack={handleBack}
          isLoading={isRegistering || isLoggingIn} 
        />
        
        <div className="mt-6 text-center text-gray-400">
          Already have an account? <Link to={ROUTES.AUTH.LOGIN} className="text-teal-400 hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CandidateRegisterPage;
