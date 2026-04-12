import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Users, UserCheck, CheckCircle } from 'lucide-react'
import type { EmployerStats } from '@/shared/types'

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className="bg-[#0D4F4F]/40 backdrop-blur-md rounded-2xl p-6 border border-teal-500/20 shadow-xl"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-${color}-500/20 text-${color}-400`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold mt-1 text-white"
        >
          {value}
        </motion.h3>
      </div>
    </div>
  </motion.div>
)

export const StatCards: React.FC<{ stats?: EmployerStats, isLoading: boolean }> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-[#0D4F4F]/20 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  const statItems = [
    { icon: Briefcase, label: 'Active Jobs', value: stats?.active_jobs || 0, color: 'teal' },
    { icon: Users, label: 'Total Applications', value: stats?.total_applications || 0, color: 'blue' },
    { icon: UserCheck, label: 'Shortlisted', value: stats?.shortlisted_candidates || 0, color: 'mint' },
    { icon: CheckCircle, label: 'Hired', value: stats?.hired_candidates || 0, color: 'coral' },
  ]

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {statItems.map((item, idx) => (
        <StatCard key={idx} {...item} />
      ))}
    </motion.div>
  )
}
