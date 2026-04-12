import React from 'react'
import { motion } from 'framer-motion'
import { Plus, ArrowRight, ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEmployerStats } from '../hooks/useEmployerStats'
import { useMyJobs } from '../hooks/useMyJobs'
import { useMySubscription } from '../hooks/useMySubscription'
import { StatCards } from '../components/StatCards'
import { JobTable } from '../components/JobTable'
import { ROUTES } from '@/shared/constants/routes.constants'
import { useAppSelector } from '@/store/hooks'

const EmployerDashboardPage: React.FC = () => {
  const { data: statsRes, isLoading: statsLoading } = useEmployerStats()
  const { data: jobsRes, isLoading: jobsLoading } = useMyJobs()
  const { data: subRes } = useMySubscription()
  const employer = useAppSelector((state) => state.employer.employer)
  const navigate = useNavigate()

  const stats = statsRes?.data
  const recentJobs = jobsRes?.data?.slice(0, 6) || []
  const planLimit = subRes?.data?.plan?.job_listing_limit
  const activeJobs = stats?.active_jobs || 0

  const verificationStatus = employer?.verification_status || 'pending'

  const renderVerificationBanner = () => {
    if (verificationStatus === 'approved') return null

    const configs = {
      pending: { icon: AlertCircle, color: 'yellow', text: 'Complete your profile verification to unlock all features.' },
      submitted: { icon: CheckCircle2, color: 'blue', text: 'Verification under review. We\'ll notify you soon.' },
      rejected: { icon: ShieldAlert, color: 'red', text: 'Verification rejected. Please resubmit your documents.' }
    }

    const { icon: Icon, color, text } = configs[verificationStatus as keyof typeof configs] || configs.pending

    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-8 p-4 bg-${color}-500/10 border border-${color}-500/20 rounded-2xl flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 bg-${color}-500/20 rounded-lg text-${color}-400`}>
             <Icon size={20} />
          </div>
          <p className={`text-sm font-medium text-${color}-300`}>{text}</p>
        </div>
        <Link 
          to={ROUTES.EMPLOYER.VERIFICATION}
          className={`px-4 py-2 bg-${color}-500 text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all`}
        >
          {verificationStatus === 'rejected' ? 'Resubmit' : 'Verify Now'}
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Welcome, <span className="text-teal-400">{employer?.company_name}</span>
          </h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your job listings today.</p>
        </div>
        <button 
          onClick={() => navigate(ROUTES.EMPLOYER.JOBS)}
          className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
        >
          <Plus size={20} />
          POST A JOB
        </button>
      </div>

      {renderVerificationBanner()}

      <section className="mb-12">
        <StatCards stats={stats} isLoading={statsLoading} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               RECENT LISTINGS
               <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-gray-400 font-normal tracking-widest">{recentJobs.length} ITEMS</span>
            </h2>
            <Link to={ROUTES.EMPLOYER.JOBS} className="text-teal-400 text-xs font-bold flex items-center gap-1 hover:underline">
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>
          <div className="bg-[#0a2329]/40 rounded-3xl p-2 border border-teal-500/10 backdrop-blur-sm">
             <JobTable 
               jobs={recentJobs} 
               isLoading={jobsLoading}
               onEdit={() => navigate(ROUTES.EMPLOYER.JOBS)}
               onDelete={() => {}}
               onViewApplicants={(id) => navigate(ROUTES.EMPLOYER.APPLICANTS.replace(':id', id))}
             />
          </div>
        </section>

        <section className="space-y-6">
           <div className="bg-[#0D4F4F]/30 p-8 rounded-3xl border border-teal-500/20 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 blur-2xl group-hover:bg-teal-500/20 transition-all" />
              <h3 className="text-sm font-bold text-teal-400 uppercase tracking-widest">Subscription Status</h3>
              <p className="text-2xl font-black text-white mt-4 uppercase">
                {subRes?.data?.plan?.display_name || 'Free Plan'}
              </p>
              <div className="mt-6 flex justify-between text-xs text-gray-400 font-bold">
                 <span>{activeJobs} / {planLimit} Sockets Used</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(activeJobs / (planLimit || 1)) * 100}%` }}
                   className="h-full bg-teal-500"
                 />
              </div>
              <Link to={ROUTES.EMPLOYER.SUBSCRIPTION} className="mt-8 flex items-center gap-2 text-xs font-bold text-white uppercase hover:text-teal-400 transition-colors">
                UPGRADE SOCKETS <ArrowRight size={14} />
              </Link>
           </div>

           <div className="bg-gradient-to-br from-teal-500/20 to-transparent p-6 rounded-3xl border border-teal-500/20">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                 {[
                   { label: 'Update Profile', path: ROUTES.EMPLOYER.PROFILE },
                   { label: 'Check Inquiries', path: ROUTES.PUBLIC.ABOUT },
                   { label: 'Account Settings', path: ROUTES.EMPLOYER.PROFILE }
                 ].map((link, i) => (
                   <Link 
                     key={i} 
                     to={link.path}
                     className="px-4 py-3 bg-[#051114] hover:bg-white/5 border border-teal-500/10 rounded-xl text-xs font-bold text-teal-300 transition-all flex items-center justify-between"
                   >
                     {link.label}
                     <ArrowRight size={14} />
                   </Link>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  )
}

export default EmployerDashboardPage
