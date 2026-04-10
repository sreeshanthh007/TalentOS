import { useState } from 'react'
import { type FormikProps } from 'formik'
import { handleNextStep } from '../utils/form.utils'

interface UseMultiStepFormOptions<T> {
  totalSteps: number
  onStepChange?: (step: number) => void
  getFieldsToValidate: (step: number) => string[]
}

export function useMultiStepForm<T>({
  totalSteps,
  getFieldsToValidate
}: UseMultiStepFormOptions<T>) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const handleNext = async (formik: FormikProps<T>) => {
    const fieldsToValidate = getFieldsToValidate(step)
    
    await handleNextStep(formik, fieldsToValidate, () => {
      if (step < totalSteps - 1) {
        setDirection(1)
        setStep((prev) => prev + 1)
      }
    })
  }

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1)
      setStep((prev) => prev - 1)
    }
  }

  return {
    step,
    direction,
    setStep,
    setDirection,
    handleNext,
    handleBack,
    isFirstStep: step === 0,
    isLastStep: step === totalSteps - 1
  }
}
