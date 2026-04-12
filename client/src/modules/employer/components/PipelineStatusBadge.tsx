import React from 'react'
import type { Applicant } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface PipelineStatusBadgeProps {
  status: Applicant['status']
}

export const PipelineStatusBadge: React.FC<PipelineStatusBadgeProps> = ({ status }) => {
  const getStatusStyle = (status: Applicant['status']) => {
    switch (status) {
      case 'applied': return 'from-gray-500/10 to-gray-500/20 text-gray-400 border-gray-500/30'
      case 'shortlisted': return 'from-teal-500/30 to-teal-500/50 text-teal-300 border-teal-500/30'
      case 'interviewing': return 'from-blue-600/30 to-blue-600/50 text-blue-300 border-blue-500/30'
      case 'offered': return 'from-purple-600/30 to-purple-600/50 text-purple-300 border-purple-500/30'
      case 'hired': return 'from-teal-600 to-emerald-500 text-white border-transparent'
      case 'rejected': return 'from-red-600/30 to-red-600/50 text-red-400 border-red-500/30'
      default: return 'from-gray-500/10 to-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm bg-gradient-to-r",
      getStatusStyle(status)
    )}>
      {status}
    </span>
  )
}
