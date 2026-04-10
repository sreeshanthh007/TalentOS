import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { candidateLogin } from '@/store/slices/candidateSlice';
import { useRegisterCandidate } from '@/modules/auth/hooks/useRegisterCandidate';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useToast } from '@/shared/hooks/useToast';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import type { CandidateRegisterValues, CandidateUser } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { candidateValidationSchema } from '@/shared/validators/auth.validators';
import { pageVariants } from '@/shared/animations/auth.animations';
import { MultiStepProgress } from '@/modules/auth/components/MultiStepProgress';
import { skillsList } from '@/modules/auth/constants/auth.constants';
import { setSession } from '@/shared/utils/session';
import { useMultiStepForm } from '@/modules/auth/hooks/useMultiStepForm';
import { FormNavigation } from '@/modules/auth/components/FormNavigation';
import { StepWrapper } from '@/modules/auth/components/StepWrapper';
import { motion } from 'framer-motion';

import { Eye, EyeOff } from 'lucide-react';

const CandidateRegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    step,
    direction,
    handleNext,
    handleBack,
    isLastStep
  } = useMultiStepForm<CandidateRegisterValues>({
    totalSteps: 3,
    getFieldsToValidate: (s) => {
      if (s === 0) return ['full_name', 'email', 'password', 'phone'];
      if (s === 1) return ['skills', 'location'];
      return [];
    }
  });

  const { mutate: register, isPending: isRegistering } = useRegisterCandidate();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const onSubmit = (values: CandidateRegisterValues) => {
    if (!isLastStep) return;

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

        <MultiStepProgress currentStep={step} />

        <Formik
          initialValues={{
            full_name: '',
            email: '',
            password: '',
            phone: '',
            skills: [],
            location: '',
          } as CandidateRegisterValues}
          validationSchema={candidateValidationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form 
              className="flex flex-col gap-6 overflow-hidden"
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                {step === 0 && (
                  <StepWrapper direction={direction} stepKey="step0" className="flex flex-col gap-4">
                    <div>
                      <Field name="full_name" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Full Name *" />
                      <ErrorMessage name="full_name" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="email" type="email" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Email *" />
                      <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div className="relative">
                      <Field 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none pr-10" 
                        placeholder="Password *" 
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
                    <div>
                      <Field name="phone" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Phone Number *" />
                      <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </StepWrapper>
                )}

                {step === 1 && (
                  <StepWrapper direction={direction} stepKey="step1">
                    <div>
                      <h3 className="text-lg mb-3">Location</h3>
                      <Field name="location" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="City, Country *" />
                      <ErrorMessage name="location" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg mb-3">Skills</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {skillsList.map((skill) => (
                          <label key={skill} className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-colors ${formik.values.skills.includes(skill) ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-[#0a2329] border-teal-900/50 text-gray-400 hover:border-teal-700'}`}>
                            <Field type="checkbox" name="skills" value={skill} className="hidden" />
                            {skill}
                          </label>
                        ))}
                      </div>
                      <ErrorMessage name="skills" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </StepWrapper>
                )}

                {step === 2 && (
                  <StepWrapper direction={direction} stepKey="step2" className="flex flex-col gap-4 text-gray-300">
                    <h3 className="text-xl text-teal-400 mb-2">Review Details</h3>
                    <p><strong>Name:</strong> {formik.values.full_name}</p>
                    <p><strong>Email:</strong> {formik.values.email}</p>
                    <p><strong>Location:</strong> {formik.values.location || 'N/A'}</p>
                    <p><strong>Skills:</strong> {formik.values.skills.join(', ') || 'None'}</p>
                  </StepWrapper>
                )}
              </AnimatePresence>

              <FormNavigation
                step={step}
                totalSteps={3}
                onBack={handleBack}
                onNext={() => handleNext(formik)}
                onSubmit={formik.handleSubmit}
                isSubmitting={formik.isSubmitting}
                isLoading={isRegistering || isLoggingIn}
              />
            </Form>
          )}
        </Formik>
        
        <div className="mt-6 text-center text-gray-400">
          Already have an account? <Link to={ROUTES.AUTH.LOGIN} className="text-teal-400 hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CandidateRegisterPage;
