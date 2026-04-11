import React from 'react'
import { motion } from 'framer-motion'

interface FormNavigationProps {
  step: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  isSubmitting: boolean
  isLoading: boolean
  isNextDisabled?: boolean
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSubmitting,
  isLoading,
  isNextDisabled,
}) => {
  const isLastStep = step === totalSteps - 1

  return (
    <div className="flex justify-between mt-4">
      {step > 0 ? (
        <motion.button
          key="back-btn"
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium"
        >
          Back
        </motion.button>
      ) : <div />}

      {!isLastStep ? (
        <motion.button
          key="next-btn"
          type="button"
          onClick={onNext}
          disabled={isSubmitting || isNextDisabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold ml-auto disabled:opacity-50"
        >
          Next
        </motion.button>
      ) : (
        <motion.button
          key="submit-btn"
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold ml-auto disabled:opacity-50"
        >
          {isSubmitting || isLoading ? 'Submitting...' : 'Submit'}
        </motion.button>
      )}
    </div>
  )
}

