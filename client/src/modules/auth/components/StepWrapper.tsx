import React from 'react'
import { motion } from 'framer-motion'
import { stepVariants } from '@/shared/animations/auth.animations'

interface StepWrapperProps {
  children: React.ReactNode
  direction: number
  stepKey: string
  className?: string
}

export const StepWrapper: React.FC<StepWrapperProps> = ({ 
  children, 
  direction, 
  stepKey,
  className = "flex flex-col gap-6"
}) => {
  return (
    <motion.div
      key={stepKey}
      custom={direction}
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}
