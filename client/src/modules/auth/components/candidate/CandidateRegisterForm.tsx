import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { skillsList } from '@/modules/auth/constants/auth.constants';
import { MultiStepProgress } from '../MultiStepProgress';
import { StepWrapper } from '../StepWrapper';
import { FormNavigation } from '../FormNavigation';
import { ResumeUploadStep } from './ResumeUploadStep';
import type { CandidateRegisterValues } from '@/shared/types';
import { type FormikProps } from 'formik';

interface CandidateRegisterFormProps {
  formik: FormikProps<CandidateRegisterValues>;
  step: number;
  direction: number;
  handleNext: (formik: FormikProps<CandidateRegisterValues>) => void;
  handleBack: () => void;
  isLoading?: boolean;
}

export const CandidateRegisterForm: React.FC<CandidateRegisterFormProps> = ({ 
  formik,
  step,
  direction,
  handleNext,
  handleBack,
  isLoading 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <MultiStepProgress 
        currentStep={step} 
        totalSteps={4} 
        labels={['Personal Info', 'Skills & Location', 'Resume', 'Review']}
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
                  name="full_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.full_name}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="Full Name *"
                />
                {formik.touched.full_name && formik.errors.full_name ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.full_name}</div>
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
                  placeholder="Email *"
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

          {step === 1 && (
            <StepWrapper direction={direction} stepKey="step1" className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg mb-3">Location</h3>
                <input
                  name="location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                  className="w-full p-3 rounded-lg bg-[#0a2329] border border-teal-900/50 focus:border-teal-500 focus:outline-none"
                  placeholder="City, Country *"
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.location}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-lg mb-3">Skills</h3>
                <div className="grid grid-cols-3 gap-3">
                  {skillsList.map((skill) => (
                    <label key={skill} className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-colors ${formik.values.skills.includes(skill) ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-[#0a2329] border-teal-900/50 text-gray-400 hover:border-teal-700'}`}>
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={formik.values.skills.includes(skill)}
                        onChange={() => {
                          const currentSkills = [...formik.values.skills];
                          if (currentSkills.includes(skill)) {
                            formik.setFieldValue('skills', currentSkills.filter(s => s !== skill));
                          } else {
                            formik.setFieldValue('skills', [...currentSkills, skill]);
                          }
                        }}
                        className="hidden"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
                {formik.touched.skills && formik.errors.skills ? (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.skills as string}</div>
                ) : null}
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper direction={direction} stepKey="step2" className="flex flex-col gap-4">
              <ResumeUploadStep
                resumeUrl={formik.values.resume_url}
                onUploadComplete={(url) => formik.setFieldValue('resume_url', url)}
                error={formik.touched.resume_url ? formik.errors.resume_url : undefined}
              />
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper direction={direction} stepKey="step3" className="flex flex-col gap-4 text-gray-300">
              <h3 className="text-xl text-teal-400 mb-2">Review Details</h3>
              <p><strong>Name:</strong> {formik.values.full_name}</p>
              <p><strong>Email:</strong> {formik.values.email}</p>
              <p><strong>Location:</strong> {formik.values.location || 'N/A'}</p>
              <p><strong>Skills:</strong> {formik.values.skills.join(', ') || 'None'}</p>
              <p>
                <strong>Resume:</strong>{' '}
                {formik.values.resume_url
                  ? <span className="text-teal-400">✓ Uploaded</span>
                  : <span className="text-red-400">Not uploaded</span>
                }
              </p>
            </StepWrapper>
          )}
        </AnimatePresence>

        <FormNavigation
          step={step}
          totalSteps={4}
          onBack={handleBack}
          onNext={() => handleNext(formik)}
          onSubmit={formik.handleSubmit}
          isSubmitting={formik.isSubmitting}
          isLoading={isLoading}
          isNextDisabled={step === 2 && !formik.values.resume_url}
        />
      </form>
    </>
  );
};
