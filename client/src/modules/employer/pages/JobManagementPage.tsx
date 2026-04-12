import React, { useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMyJobs } from '../hooks/useMyJobs'
import { useDeleteJob } from '../hooks/useDeleteJob'
import { useMySubscription } from '../hooks/useMySubscription'
import { JobTable } from '../components/JobTable'
import { JobFormModal } from '../components/JobFormModal'
import type { Job } from '@/shared/types'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'

const JobManagementPage: React.FC = () => {
  const { data: jobsRes, isLoading } = useMyJobs()
  const { data: subRes } = useMySubscription()
  const { mutate: deleteJob } = useDeleteJob()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | undefined>()

  const jobs = jobsRes?.data || []
  const sub = subRes?.data
  const activeJobsCount = jobs.filter(j => j.status === 'active').length
  const limit = sub?.plan?.job_listing_limit || 0

  const handlePostNew = () => {
    if (activeJobsCount >= limit) {
      toast.error(MESSAGES.EMPLOYER.JOB_LIMIT_REACHED)
      return
    }
    setSelectedJob(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
     if (window.confirm('Are you sure you want to delete this job listing?')) {
       deleteJob(id)
     }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-teal-400">
              <Briefcase size={32} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Manage Openings</h1>
              <p className="text-gray-400 mt-1">Create and manage your active job listings across TalentOS.</p>
           </div>
        </div>

        <div className="flex flex-col items-end gap-3">
           <button 
             onClick={handlePostNew}
             className="w-full md:w-auto px-8 py-4 bg-teal-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
           >
             <Plus size={20} />
             POST NEW JOB
           </button>
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>{activeJobsCount} / {limit} Jobs Used</span>
              <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(activeJobsCount / (limit || 1)) * 100}%` }}
                   className="h-full bg-teal-500"
                 />
              </div>
           </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a2329]/40 rounded-[2.5rem] p-4 border border-teal-500/10 backdrop-blur-md shadow-2xl"
      >
        <JobTable 
          jobs={jobs} 
          isLoading={isLoading} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewApplicants={(jobId) => navigate(ROUTES.EMPLOYER.APPLICANTS.replace(':id', jobId))}
        />
      </motion.div>

      <JobFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        job={selectedJob} 
      />
    </div>
  )
}

export default JobManagementPage
