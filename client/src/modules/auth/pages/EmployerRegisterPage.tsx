import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage, type FormikProps } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { loginEmployer } from '@/store/slices/employerSlice';
import { AuthService } from '@/modules/auth/services/auth.service';
import { useToast } from '@/shared/hooks/useToast';
import { type EmployerRegisterValues } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { employerValidationSchema } from '@/shared/validators/auth.validators';
import { pageVariants, stepVariants } from '@/shared/animations/auth.animations';
import { MultiStepProgress } from '@/modules/auth/components/MultiStepProgress';
import { handleNextStep } from '@/modules/auth/utils/form.utils';
import { plans } from '@/modules/auth/constants/auth.constants';



const EmployerRegisterPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleNext = async (formik: FormikProps<EmployerRegisterValues>) => {
    let fieldsToValidate: string[] = [];
    if (step === 0) fieldsToValidate = ['company_name', 'email', 'password'];
    if (step === 1) fieldsToValidate = ['company_domain', 'industry', 'website', 'phone'];

    await handleNextStep(formik, fieldsToValidate, () => {
      if (step === 0 && !formik.values.company_domain && formik.values.email) {
        formik.setFieldValue('company_domain', formik.values.email.split('@')[1]);
      }
      setDirection(1);
      setStep((prev) => prev + 1);
    });
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (values: EmployerRegisterValues, { setSubmitting }: any) => {
    try {
      await AuthService.registerEmployer(values);
      
      const loginResponse = await AuthService.login({
        email: values.email,
        password: values.password,
        role: 'employer',
      });
      
      localStorage.setItem('talentos_session', JSON.stringify({ role: 'employer' }));
      dispatch(loginEmployer({
        user: loginResponse.data.data.user,
        accessToken: loginResponse.data.data.accessToken
      }));
      
      toast.success('Registration successful!');
      navigate(ROUTES.EMPLOYER.DASHBOARD);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
            <Form className="flex flex-col gap-6 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 0 && (
                  <motion.div
                    key="step0"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <Field name="company_name" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Company Name *" />
                      <ErrorMessage name="company_name" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="email" type="email" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Business Email *" />
                      <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="password" type="password" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Password *" />
                      <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
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
                      <Field name="phone" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Phone (Optional)" />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-4">
                {step > 0 ? (
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium"
                  >
                    Back
                  </motion.button>
                ) : <div />}

                {step < 2 ? (
                  <motion.button
                    type="button"
                    onClick={() => handleNext(formik)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold ml-auto"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={formik.isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold ml-auto disabled:opacity-50"
                  >
                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                  </motion.button>
                )}
              </div>
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

export default EmployerRegisterPage;