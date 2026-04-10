import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, Calendar, DollarSign, Clock, Share2, AlertCircle } from 'lucide-react'

import { useJobDetail, useJobs } from '../hooks/useJobs'
import { JobCard } from '../components/JobCard'
import { useToast } from '@/shared/hooks/useToast'
import { ROUTES } from '@/shared/constants/routes.constants'
import { getSession } from '@/shared/utils/session'
import { pageVariants } from '@/shared/animations/auth.animations'

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  
  const [activeTab, setActiveTab] = useState<'description' | 'requirements'>('description')
  
  const { data: jobResp, isLoading } = useJobDetail(id!)
  const job = jobResp?.data

  // Fetch similar jobs based on same category
  const { data: similarResp } = useJobs({ 
    category_id: job?.category_id || undefined,
    limit: 3 
  })
  // Filter out the current job
  const similarJobs = similarResp?.data?.data?.filter(j => j.id !== id) || []

  if (isLoading) {
    return (
      <div className="bg-[#0a2329] min-h-screen pt-12 flex justify-center">
        <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="bg-[#0a2329] min-h-screen pt-20 text-center text-white">
        <AlertCircle size={64} className="mx-auto text-[#FF6B6B] mb-4" />
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <p className="text-gray-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate(ROUTES.PUBLIC.JOBS)} className="bg-teal-500 text-slate-900 px-6 py-2 rounded-lg font-bold">
          View All Jobs
        </button>
      </div>
    )
  }

  const handleApply = () => {
    const session = getSession()
    if (!session || session.role !== 'candidate') {
      toast.info("Please login as a candidate to apply")
      navigate(ROUTES.AUTH.LOGIN)
      return
    }
    // In a real app we would navigate to an application flow or direct apply hook
    navigate(`${ROUTES.CANDIDATE.DASHBOARD}/apply/${job.id}`) // Placeholder route
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-[#0a2329] min-h-screen pt-8 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header Card */}
          <div className="bg-[#0d2e36] rounded-2xl border border-teal-900/50 p-8 shadow-xl mb-8">
            <div className="flex items-start gap-6">
              {job.employer?.company_logo_url ? (
                <img src={job.employer.company_logo_url} alt="Logo" className="w-20 h-20 rounded-xl object-cover bg-white" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-3xl font-bold border border-teal-500/30">
                  {job.employer?.company_name?.[0]?.toUpperCase() || 'C'}
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center gap-2 text-lg text-teal-400 mb-4">
                  <span className="font-semibold">{job.employer?.company_name || 'Unknown Company'}</span>
                  {job.employer?.industry && (
                    <span className="text-xs bg-teal-900/50 text-teal-300 px-2 py-1 rounded">
                      {job.employer.industry}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                  {job.location && (
                    <div className="flex items-center gap-1.5"><MapPin size={16} />{job.location}</div>
                  )}
                  <div className="flex items-center gap-1.5"><Briefcase size={16} className="capitalize"/>{job.job_type.replace('_',' ')}</div>
                  {job.experience_years !== null && (
                    <div className="flex items-center gap-1.5"><Clock size={16} />{job.experience_years}+ Years Exp.</div>
                  )}
                  {(job.salary_min || job.salary_max) && (
                    <div className="flex items-center gap-1.5 text-[#FF6B6B]">
                      <DollarSign size={16} />
                      {job.salary_min ? `$${(job.salary_min/1000).toFixed(0)}k` : ''} - {job.salary_max ? `$${(job.salary_max/1000).toFixed(0)}k` : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className="bg-[#0d2e36] rounded-2xl border border-teal-900/50 overflow-hidden shadow-xl">
             <div className="flex border-b border-teal-900/50">
               <button 
                 onClick={() => setActiveTab('description')}
                 className={`flex-1 py-4 text-center font-medium relative ${activeTab === 'description' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 Description
                 {activeTab === 'description' && (
                   <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />
                 )}
               </button>
               <button 
                 onClick={() => setActiveTab('requirements')}
                 className={`flex-1 py-4 text-center font-medium relative ${activeTab === 'requirements' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 Requirements
                 {activeTab === 'requirements' && (
                   <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />
                 )}
               </button>
             </div>

             <div className="p-8 prose prose-invert max-w-none text-gray-300">
                {activeTab === 'description' ? (
                  <div className="whitespace-pre-wrap">{job.description || 'No description provided.'}</div>
                ) : (
                  <div className="whitespace-pre-wrap">{job.requirements || 'No specific requirements listed.'}</div>
                )}
             </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Action Card */}
          <div className="bg-[#0B151C] rounded-2xl border border-teal-900/50 p-6 shadow-xl">
             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               animate={{ boxShadow: ['0px 0px 0px rgba(78,205,196,0)', '0px 0px 20px rgba(78,205,196,0.3)', '0px 0px 0px rgba(78,205,196,0)'] }}
               transition={{ duration: 2, repeat: Infinity }}
               onClick={handleApply}
               className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg py-4 rounded-xl mb-4"
             >
               Apply Now
             </motion.button>
             <button 
               onClick={handleShare}
               className="w-full flex items-center justify-center gap-2 bg-[#0d2e36] hover:bg-teal-900/40 border border-teal-900/50 text-white font-medium py-3 rounded-xl transition-colors"
             >
               <Share2 size={18} /> Share Job
             </button>
          </div>

          {/* Overview Card */}
          <div className="bg-[#0B151C] rounded-2xl border border-teal-900/50 p-6 shadow-xl">
             <h3 className="text-white font-bold text-lg mb-4">Job Overview</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <Calendar className="text-teal-500 mt-0.5" size={18} />
                 <div>
                   <p className="text-gray-500 text-xs">Date Posted</p>
                   <p className="text-white text-sm">{new Date(job.created_at).toLocaleDateString()}</p>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <Briefcase className="text-teal-500 mt-0.5" size={18} />
                 <div>
                   <p className="text-gray-500 text-xs">Job Type</p>
                   <p className="text-white text-sm capitalize">{job.job_type.replace('_',' ')}</p>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <Clock className="text-teal-500 mt-0.5" size={18} />
                 <div>
                   <p className="text-gray-500 text-xs">Experience</p>
                   <p className="text-white text-sm">{job.experience_years !== null ? `${job.experience_years}+ Years` : 'Not Specified'}</p>
                 </div>
               </li>
             </ul>
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map(sj => (
                  <JobCard key={sj.id} job={sj} />
                ))}
              </div>
            </div>
          )}

        </motion.div>

      </div>
    </motion.div>
  )
}
