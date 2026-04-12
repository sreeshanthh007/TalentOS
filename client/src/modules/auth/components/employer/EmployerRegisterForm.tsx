import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { employerValidationSchema } from '@/shared/validators/auth.validators';
import { useMultiStepForm } from '@/modules/auth/hooks/useMultiStepForm';
import { MultiStepProgress } from '../MultiStepProgress';
import { StepWrapper } from '../StepWrapper';
import { FormNavigation } from '../FormNavigation';
import type { EmployerRegisterValues, SubscriptionPlan } from '@/shared/types';

interface EmployerRegisterFormProps {
  onSubmit: (values: EmployerRegisterValues) => void;
  isLoading?: boolean;
  plans: SubscriptionPlan[];
}

export const EmployerRegisterForm: React.FC<EmployerRegisterFormProps> = ({ onSubmit, isLoading, plans }) => {
  const [showPassword, setShowPassword] = useState(false);

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

  const formik = useFormik<EmployerRegisterValues>({
    initialValues: {
      company_name: '',
      email: '',
      password: '',
      company_domain: '',
      industry: '',
      website: '',
      phone: '',
      selected_plan: 'free',
      plan_id: '',
    },
    validationSchema: employerValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!isLastStep) return;
      onSubmit(values);
      setSubmitting(false);
    },
  });

  // Set default plan_id when plans are loaded
  useEffect(() => {
    if (plans.length > 0 && !formik.values.plan_id) {
      const freePlan = plans.find(p => p.name === 'free');
      if (freePlan) {
        formik.setFieldValue('plan_id', freePlan.id);
        formik.setFieldValue('selected_plan', 'free');
      }
    }
  }, [plans, formik]);

  return (
    <>
      <MultiStepProgress 
        currentStep={step} 
        totalSteps={3}
        labels={['Account Info', 'Company Profile', 'Choose Plan']}
      />
      
      <form 
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 overflow-hidden"
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <StepWrapper direction={direction} stepKey="step0" className="flex flex-col gap-4">
              <div>
                <input
                  name="company_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company_name}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="Company Name *"
                />
                {formik.touched.company_name && formik.errors.company_name ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.company_name}</div>
                ) : null}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="Business Email *"
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
                  placeholder="Password *"
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
            </StepWrapper>
          )}

          {step === 1 && (
            <StepWrapper direction={direction} stepKey="step1" className="flex flex-col gap-4">
              <div>
                <input
                  name="company_domain"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company_domain}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="Company Domain (e.g. apple.com) *"
                />
                {formik.touched.company_domain && formik.errors.company_domain ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.company_domain}</div>
                ) : null}
              </div>
              <div>
                <select
                  name="industry"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.industry}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none text-gray-300"
                >
                  <option value="">Select Industry *</option>
                  {['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Engineering', 'Legal', 'Operations', 'Other'].map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                {formik.touched.industry && formik.errors.industry ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.industry}</div>
                ) : null}
              </div>
              <div>
                <input
                  name="website"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.website}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="Website URL (Optional)"
                />
                {formik.touched.website && formik.errors.website ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.website}</div>
                ) : null}
              </div>
              <div>
                <input
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="Phone Number *"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.phone}</div>
                ) : null}
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
                    className={`p-5 flex flex-col rounded-xl border-2 cursor-pointer transition-colors ${formik.values.selected_plan === plan.name ? 'border-teal-500 bg-teal-500/10' : 'border-teal-900/30 bg-[#0a2329]'}`}
                    onClick={() => {
                      formik.setFieldValue('selected_plan', plan.name);
                      formik.setFieldValue('plan_id', plan.id);
                    }}
                  >
                    <h4 className="text-lg font-bold capitalize">{plan.display_name}</h4>
                    <p className="text-2xl text-teal-400 my-2 font-bold">${plan.price_monthly}/mo</p>
                    <ul className="text-sm text-gray-400 mt-2 space-y-1 mb-4 flex-grow">
                      {plan.features.map(f => <li key={f}>• {f}</li>)}
                    </ul>
                    {plan.name !== 'free' && (
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
          isLoading={isLoading}
        />
      </form>
    </>
  );
};
