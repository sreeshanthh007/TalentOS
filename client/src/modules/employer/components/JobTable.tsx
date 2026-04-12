import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2, Trash2, Users, MapPin, Calendar, DollarSign } from 'lucide-react'
import type { Job } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface JobTableProps {
  jobs?: Job[]
  isLoading: boolean
  onEdit: (job: Job) => void
  onDelete: (jobId: string) => void
  onViewApplicants: (jobId: string) => void
}

export const JobTable: React.FC<JobTableProps> = ({ jobs, isLoading, onEdit, onDelete, onViewApplicants }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-[#0D4F4F]/20 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-[#0D4F4F]/20 rounded-2xl border border-dashed border-teal-500/30">
        <p className="text-gray-400">No jobs posted yet.</p>
      </div>
    )
  }

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'active': return 'bg-teal-500/10 text-teal-400 border-teal-500/30'
      case 'draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
      case 'closed': return 'bg-orange-500/10 text-orange-400 border-orange-500/30'
      case 'expired': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-gray-400 text-sm uppercase tracking-wider">
            <th className="px-6 py-2 pb-4 font-semibold">Job Details</th>
            <th className="px-6 py-2 pb-4 font-semibold">Status</th>
            <th className="px-6 py-2 pb-4 font-semibold text-center">Applications</th>
            <th className="px-6 py-2 pb-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          <AnimatePresence>
            {jobs.map((job, idx) => (
              <motion.tr
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-[#0D4F4F]/30 hover:bg-[#0D4F4F]/50 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <td className="px-6 py-4 rounded-l-2xl">
                  <div>
                    <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{job.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1 capitalize"><Calendar size={14} /> {job.job_type.replace('_', ' ')}</span>
                      {job.salary_min && (
                         <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary_min}k - {job.salary_max}k</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className={cn(
                     "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                     getStatusColor(job.status)
                   )}>
                     {job.status}
                   </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-white">{job.applications_count || 0}</span>
                    <span className="text-[10px] text-gray-400 uppercase">Applicants</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right rounded-r-2xl">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewApplicants(job.id)}
                      className="p-2 bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white rounded-lg transition-all"
                      title="View Applicants"
                    >
                      <Users size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(job)}
                      className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                      title="Edit Job"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(job.id)}
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                      title="Delete Job"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
