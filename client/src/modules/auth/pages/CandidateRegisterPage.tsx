import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage, type FormikProps } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { loginCandidate } from '@/store/slices/candidateSlice';
import { AuthService } from '@/modules/auth/services/auth.service';
import { useToast } from '@/shared/hooks/useToast';
import type { CandidateRegisterValues } from '@/shared/types';
import { ROUTES } from '@/shared/constants/routes.constants';
import { candidateValidationSchema } from '@/shared/validators/auth.validators';
import { pageVariants, stepVariants } from '@/shared/animations/auth.animations';
import { MultiStepProgress } from '@/modules/auth/components/MultiStepProgress';
import { handleNextStep } from '@/modules/auth/utils/form.utils';
import { skillsList } from '@/modules/auth/constants/auth.constants';


const CandidateRegisterPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleNext = async (formik: FormikProps<CandidateRegisterValues>) => {
    let fieldsToValidate: string[] = [];
    if (step === 0) fieldsToValidate = ['full_name', 'email', 'password', 'phone'];
    if (step === 1) fieldsToValidate = ['skills', 'location'];

    await handleNextStep(formik, fieldsToValidate, () => {
      setDirection(1);
      setStep((prev) => prev + 1);
    });
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (values: CandidateRegisterValues, { setSubmitting }: any) => {
    try {
      await AuthService.registerCandidate(values);
      
      const loginResponse = await AuthService.login({
        email: values.email,
        password: values.password,
        role: 'candidate',
      });
      
      localStorage.setItem('talentos_session', JSON.stringify({ role: 'candidate' }));
      dispatch(loginCandidate({
        user: loginResponse.data.data.user,
        accessToken: loginResponse.data.data.accessToken
      }));
      
      toast.success('Registration successful!');
      navigate(ROUTES.CANDIDATE.DASHBOARD);
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
                      <Field name="full_name" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Full Name *" />
                      <ErrorMessage name="full_name" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="email" type="email" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Email *" />
                      <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="password" type="password" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Password *" />
                      <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <Field name="phone" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="Phone (Optional)" />
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
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="text-lg mb-3">Location</h3>
                      <Field name="location" className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none" placeholder="City, Country" />
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
                    className="flex flex-col gap-4 text-gray-300"
                  >
                    <h3 className="text-xl text-teal-400 mb-2">Review Details</h3>
                    <p><strong>Name:</strong> {formik.values.full_name}</p>
                    <p><strong>Email:</strong> {formik.values.email}</p>
                    <p><strong>Location:</strong> {formik.values.location || 'N/A'}</p>
                    <p><strong>Skills:</strong> {formik.values.skills.join(', ') || 'None'}</p>
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

export default CandidateRegisterPage;
