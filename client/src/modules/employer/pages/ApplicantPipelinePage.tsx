import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Users, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApplicantsByJob } from '../hooks/useApplicantsByJob'
import { useUpdateApplicationStatus } from '../hooks/useUpdateApplicationStatus'
import { ApplicantPipelineTable } from '../components/ApplicantPipelineTable'
import { ROUTES } from '@/shared/constants/routes.constants'
import { cn } from '@/shared/utils/cn'

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Applied', value: 'applied' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Interviewing', value: 'interviewing' },
  { label: 'Offered', value: 'offered' },
  { label: 'Hired', value: 'hired' },
  { label: 'Rejected', value: 'rejected' },
]

const ApplicantPipelinePage: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>()
  const [activeFilter, setActiveFilter] = useState('all')
  const { data: applicantsRes, isLoading } = useApplicantsByJob(jobId!)
  const { mutate: updateStatus } = useUpdateApplicationStatus(jobId!)

  const applicants = applicantsRes?.data || []
  const filteredApplicants = activeFilter === 'all' 
    ? applicants 
    : applicants.filter(app => app.status === activeFilter)

  const jobTitle = applicants[0]?.candidate?.full_name ? 'Candidate Pipeline' : 'Loading Pipeline...'

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Link 
        to={ROUTES.EMPLOYER.JOBS}
        className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest hover:text-teal-300 transition-colors mb-8"
      >
        <ChevronLeft size={16} />
        Back to Listings
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-teal-500/10 rounded-[2rem] flex items-center justify-center border border-teal-500/20 text-teal-400">
              <Users size={32} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter"> {jobTitle}</h1>
              <p className="text-gray-400 mt-1">Movement candidates through your hiring pipeline segments.</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4 bg-[#0a2329]/50 p-2 rounded-2xl border border-teal-500/10 backdrop-blur-md">
           <div className="flex items-center gap-2 px-3 text-gray-500">
              <Filter size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Filter:</span>
           </div>
           <div className="flex gap-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all",
                    activeFilter === filter.value 
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20" 
                      : "text-gray-400 hover:bg-white/5"
                  )}
                >
                  {filter.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-bold text-white">Showing {filteredApplicants.length} Candidates</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a2329]/40 rounded-[2.5rem] p-4 border border-teal-500/10"
      >
        <ApplicantPipelineTable 
          applicants={filteredApplicants} 
          isLoading={isLoading}
          onStatusChange={(applicationId, data) => updateStatus({ applicationId, data })}
        />
      </motion.div>
    </div>
  )
}

export default ApplicantPipelinePage
