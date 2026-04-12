import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Briefcase, TrendingUp } from 'lucide-react'
import type { AdminStats } from '@/shared/types'

interface AdminStatCardsProps {
  stats?: AdminStats
  isLoading: boolean
}

export const AdminStatCards: React.FC<AdminStatCardsProps> = ({ stats, isLoading }) => {
  const cards = [
    {
      label: 'TOTAL EMPLOYERS',
      value: stats?.total_employers || 0,
      icon: Building2,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10'
    },
    {
      label: 'TOTAL CANDIDATES',
      value: stats?.total_candidates || 0,
      icon: Users,
      color: 'text-mint-400',
      bg: 'bg-emerald-500/10'
    },
    {
      label: 'TOTAL JOBS',
      value: stats?.total_jobs || 0,
      icon: Briefcase,
      color: 'text-coral-400',
      bg: 'bg-orange-500/10'
    },
    {
      label: 'ACTIVE LISTINGS',
      value: stats?.latest_jobs?.length || 0,
      icon: TrendingUp,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          variants={item}
          className="bg-[#0D4F4F]/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 ${card.bg} rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700`} />
          
          <div className="relative z-10">
            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center mb-4 border border-white/5`}>
               <card.icon size={24} className={card.color} />
            </div>
            
            {isLoading ? (
              <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg" />
            ) : (
              <h2 className="text-3xl font-black text-white italic tracking-tighter">
                {card.value.toLocaleString()}
              </h2>
            )}
            <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">{card.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
