import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface MultiStepProgressProps {
  currentStep: number
  totalSteps?: number
}

const stepsLabels = ['Personal Info', 'Skills & Location', 'Resume', 'Review']

export const MultiStepProgress: React.FC<MultiStepProgressProps> = ({ currentStep, totalSteps = 3 }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2" />
      
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1
        const isActive = index === currentStep
        const isCompleted = index < currentStep

        return (
          <div key={stepNum} className="flex flex-col items-center relative">
            <motion.div
              layoutId={isActive ? 'activeStep' : undefined}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 bg-[#0B0F19] transition-all duration-300",
                isCompleted ? "border-teal-600 bg-teal-600 text-slate-900 shadow-[0_0_15px_rgba(20,184,166,0.3)]" : "",
                isActive ? "border-teal-400 text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.2)]" : "",
                !isActive && !isCompleted ? "border-gray-700 text-gray-400" : ""
              )}
            >
              {isCompleted ? <Check size={18} /> : stepNum}
            </motion.div>
            
            <div className={cn(
              "absolute -bottom-6 text-xs whitespace-nowrap transition-colors",
              isActive ? "text-teal-400 font-bold" : isCompleted ? "text-gray-300 font-medium" : "text-gray-500"
            )}>
              {stepsLabels[index] || `Step ${stepNum}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}
