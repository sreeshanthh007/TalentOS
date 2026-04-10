import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { employerLogin } from '@/store/slices/employerSlice';
import { useRegisterEmployer } from '@/modules/auth/hooks/useRegisterEmployer';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useToast } from '@/shared/hooks/useToast';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { type EmployerRegisterValues, type EmployerUser } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { employerValidationSchema } from '@/shared/validators/auth.validators';
import { pageVariants } from '@/shared/animations/auth.animations';
import { MultiStepProgress } from '@/modules/auth/components/MultiStepProgress';
import { plans } from '@/modules/auth/constants/auth.constants';
import { setSession } from '@/shared/utils/session';
import { useMultiStepForm } from '@/modules/auth/hooks/useMultiStepForm';
import { FormNavigation } from '@/modules/auth/components/FormNavigation';
import { StepWrapper } from '@/modules/auth/components/StepWrapper';
import { motion } from 'framer-motion';

import { Eye, EyeOff } from 'lucide-react';

const EmployerRegisterPage: React.FC = () => {
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
  } = useMultiStepForm<EmployerRegisterValues>({
    totalSteps: 3,
    getFieldsToValidate: (s) => {
      if (s === 0) return ['company_name', 'email', 'password'];
      if (s === 1) return ['company_domain', 'industry', 'website', 'phone'];
      return [];
    }
  });

  const { mutate: register, isPending: isRegistering } = useRegisterEmployer();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const onSubmit = (values: EmployerRegisterValues) => {
    if (!isLastStep) return;

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

        <MultiStepProgress currentStep={step} />

        <Formik
          initialValues={{
            company_name: '',
            email: '',
            password: '',
            company_domain: '',
            industry: '',
            website: '',
            phone: '',
            selected_plan: 'free',
          } as EmployerRegisterValues}
          validationSchema={employerValidationSchema}
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
                      <Field name="company_name" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Company Name *" />
                      <ErrorMessage name="company_name" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="email" type="email" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Business Email *" />
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
                  </StepWrapper>
                )}

                {step === 1 && (
                  <StepWrapper direction={direction} stepKey="step1" className="flex flex-col gap-4">
                    <div>
                      <Field name="company_domain" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Company Domain (e.g. apple.com) *" />
                      <ErrorMessage name="company_domain" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field as="select" name="industry" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none text-gray-300">
                        <option value="">Select Industry *</option>
                        {['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Engineering', 'Legal', 'Operations', 'Other'].map(i => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="industry" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="website" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Website URL (Optional)" />
                      <ErrorMessage name="website" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="phone" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Phone Number *" />
                      <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </StepWrapper>
                )}

                {step === 2 && (
                  <StepWrapper direction={direction} stepKey="step2" className="flex flex-col gap-4">
                    <h3 className="text-xl text-teal-400 mb-2">Select a Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <motion.div
                          key={plan.id}
                          whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)" }}
                          className={`p-5 flex flex-col rounded-xl border-2 cursor-pointer transition-colors ${formik.values.selected_plan === plan.id ? 'border-teal-500 bg-teal-500/10' : 'border-teal-900/30 bg-[#0a2329]'}`}
                          onClick={() => formik.setFieldValue('selected_plan', plan.id)}
                        >
                          <h4 className="text-lg font-bold">{plan.name}</h4>
                          <p className="text-2xl text-teal-400 my-2 font-bold">{plan.price}</p>
                          <ul className="text-sm text-gray-400 mt-2 space-y-1 mb-4 flex-grow">
                            {plan.features.map(f => <li key={f}>• {f}</li>)}
                          </ul>
                          {plan.id !== 'free' && (
                            <button type="button" className="mt-auto text-xs text-teal-300 hover:text-teal-200 underline text-left">
                              Contact Sales
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </StepWrapper>
                )}
              </AnimatePresence>

              <FormNavigation
                step={step}
                totalSteps={3}
                onBack={handleBack}
                onNext={() => {
                  if (step === 0 && !formik.values.company_domain && formik.values.email) {
                    formik.setFieldValue('company_domain', formik.values.email.split('@')[1]);
                  }
                  handleNext(formik);
                }}
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

export default EmployerRegisterPage