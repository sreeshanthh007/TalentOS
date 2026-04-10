import React from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'
import type { Job } from '@/shared/types'

type JobCardProps = {
  job: Job
  onClick?: () => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Use replace pattern if defined, otherwise basic string concat
      navigate(ROUTES.PUBLIC.JOB_DETAIL.replace(':id', job.id))
    }
  }

  const postedDate = new Date(job.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleCardClick}
      className="bg-[#0d2e36] rounded-2xl border border-teal-900/50 p-5 shadow-xl cursor-pointer hover:border-teal-500/50 transition-colors flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-4">
        {job.employer?.company_logo_url ? (
          <img
            src={job.employer.company_logo_url}
            alt={job.employer.company_name}
            className="w-12 h-12 rounded-full object-cover border border-teal-900/50"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold text-lg border border-teal-500/30">
            {job.employer?.company_name?.[0]?.toUpperCase() || 'C'}
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm line-clamp-1">
            {job.employer?.company_name || 'Unknown Company'}
          </h4>
          <p className="text-gray-400 text-xs">{postedDate}</p>
        </div>
      </div>

      <div className="mb-4 flex-grow">
        <h3 className="text-white font-bold text-lg line-clamp-2 mb-2 leading-snug">
          {job.title}
        </h3>
        {job.location && (
          <div className="flex items-center text-gray-400 text-sm gap-1">
            <MapPin size={16} />
            <span className="line-clamp-1">{job.location}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col gap-2">
           <span className="inline-block bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-full px-3 py-1 text-xs capitalize w-max font-medium">
             {job.job_type.replace('_', ' ')}
           </span>
           {(job.salary_min || job.salary_max) ? (
             <span className="text-[#FF6B6B] text-sm font-semibold">
               {job.salary_min ? `$${(job.salary_min/1000).toFixed(0)}k` : ''} 
               {job.salary_min && job.salary_max ? ' - ' : ''}
               {job.salary_max ? `$${(job.salary_max/1000).toFixed(0)}k` : ''}
             </span>
           ) : null}
        </div>
        <button className="text-teal-400 text-sm font-medium hover:text-teal-300 underline underline-offset-2">
          View Details
        </button>
      </div>
    </motion.div>
  )
}
