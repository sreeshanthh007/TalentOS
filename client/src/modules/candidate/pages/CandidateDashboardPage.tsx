import React from 'react'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  FileText,
  UserCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCandidateProfile } from '../hooks/useCandidateProfile'
import { useMyApplications } from '../hooks/useMyApplications'
import { useMyShortlisted } from '../hooks/useMyShortlisted'
import { calculateProfileCompletion } from '../utils/profileCompletion'
import { ROUTES } from '@/shared/constants/routes.constants'
import { useAppDispatch } from '@/store/hooks'
import { candidateLogin } from '@/store/slices/candidateSlice'
import { type CandidateUser } from '@/shared/types'

// Components
import { StatCards } from '../components/dashboard/StatCards'
import { ProfileCompletionCard } from '../components/dashboard/ProfileCompletionCard'
import { RecentApplications } from '../components/dashboard/RecentApplications'

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 }
}

const CandidateDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data: profileRes } = useCandidateProfile()
  const { data: appsRes } = useMyApplications()
  const { data: shortlistRes } = useMyShortlisted()

  const profile = profileRes?.data
  const applications = appsRes?.data || []
  const shortlisted = shortlistRes?.data || []

  // Sync profile to Redux when fetched (important for refresh persistence)
  React.useEffect(() => {
    if (profile) {
      dispatch(candidateLogin(profile as CandidateUser))
    }
  }, [profile, dispatch])

  const stats = {
    applied: applications.length,
    shortlisted: shortlisted.length,
    interviewing: applications.filter(a => a.status === 'interviewing').length,
    hired: applications.filter(a => a.status === 'hired').length
  }

  const completion = profile ? calculateProfileCompletion(profile) : { percentage: 0, missing: [] }

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.section variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="text-teal-400">{profile?.full_name || 'Candidate'}</span>!
        </h1>
        <p className="text-gray-400 mt-2">Here's your job search overview</p>
      </motion.section>

      {/* Stats Row */}
      <motion.div variants={itemVariants}>
        <StatCards stats={stats} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Completion */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ProfileCompletionCard completion={completion} />
        </motion.div>

        {/* Recent Applications */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RecentApplications applications={applications} />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.section variants={itemVariants}>
        <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Browse Jobs', icon: Briefcase, path: ROUTES.PUBLIC.JOBS, desc: 'Find your next career move' },
            { label: 'Build Resume', icon: FileText, path: ROUTES.CANDIDATE.RESUME_BUILDER, desc: 'Create AI-powered resume' },
            { label: 'Update Profile', icon: UserCircle, path: ROUTES.CANDIDATE.PROFILE, desc: 'Keep your info fresh' },
          ].map((action, i) => (
            <Link 
              key={i} 
              to={action.path}
              className="bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6 hover:bg-teal-500/5 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-slate-900 transition-all">
                <action.icon size={24} />
              </div>
              <h4 className="font-bold mb-1">{action.label}</h4>
              <p className="text-sm text-gray-400">{action.desc}</p>
            </Link>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}

export default CandidateDashboardPage
