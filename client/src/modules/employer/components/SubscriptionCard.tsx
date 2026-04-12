import React from 'react'
import { motion } from 'framer-motion'
import { Check, CreditCard, Calendar } from 'lucide-react'
import type { EmployerSubscription } from '@/shared/types'
import { cn } from '@/shared/utils/cn'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'

interface SubscriptionCardProps {
  subscription?: EmployerSubscription
  isLoading?: boolean
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, isLoading }) => {
  if (isLoading) {
    return <div className="h-64 bg-[#0D4F4F]/20 rounded-3xl animate-pulse" />
  }

  if (!subscription) return null

  const { plan, status, expires_at } = subscription
  const isActive = status === 'active'

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-[#0D4F4F]/60 to-[#0a2329]/80 border border-teal-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
    >
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl -z-10" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            isActive ? "bg-teal-500/10 text-teal-400 border-teal-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"
          )}>
            {status}
          </span>
          <h3 className="text-3xl font-black text-white mt-4 uppercase tracking-tighter">{plan.display_name || plan.name}</h3>
          <p className="text-teal-400 font-bold text-xl mt-1">${plan.price_monthly}<span className="text-xs text-gray-500">/mo</span></p>
        </div>
        <div className="p-4 bg-teal-500/10 rounded-2xl">
           <CreditCard className="text-teal-400" size={32} />
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
             <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check size={12} className="text-emerald-400" />
             </div>
             {feature}
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
         <div className="flex justify-between text-xs text-gray-400">
            <span>Job Slots Used</span>
            <span className="text-teal-400 font-bold">Limit: {plan.job_listing_limit} jobs</span>
         </div>
         <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '40%' }} // Dummy for now
               className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
            />
         </div>

         <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-4">
            <Calendar size={12} />
            <span>Next Billing: {expires_at ? new Date(expires_at).toLocaleDateString() : 'N/A'}</span>
         </div>

         <Link 
           to={ROUTES.PUBLIC.EMPLOYERS}
           className="block w-full py-3 bg-white text-[#051114] rounded-xl font-bold text-center hover:bg-teal-400 transition-all uppercase tracking-widest text-xs"
         >
           Upgrade Plan
         </Link>
      </div>
    </motion.div>
  )
}
