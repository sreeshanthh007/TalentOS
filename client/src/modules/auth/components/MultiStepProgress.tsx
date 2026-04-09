import React from 'react';

interface MultiStepProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export const MultiStepProgress: React.FC<MultiStepProgressProps> = ({ currentStep, totalSteps = 3 }) => (
  <div className="flex gap-2 mb-8">
    {Array.from({ length: totalSteps }).map((_, step) => (
      <div
        key={step}
        className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
          step <= currentStep ? 'bg-teal-500' : 'bg-gray-700'
        }`}
      />
    ))}
  </div>
);
