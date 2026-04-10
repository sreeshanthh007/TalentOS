import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'

type PricingCardProps = {
  plan: {
    id: 'free' | 'premium' | 'enterprise'
    display_name: string
    price_monthly: number
    job_listing_limit: number
    features: string[]
  }
  isPopular?: boolean
  onContactSales: (planId: string) => void
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isPopular, onContactSales }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(78, 205, 196, 0.1)' }}
      className={`relative bg-[#0d2e36] rounded-2xl border p-8 shadow-xl flex flex-col h-full ${
        isPopular ? 'border-teal-500' : 'border-teal-900/50'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
          MOST POPULAR
        </div>
      )}

      <h3 className="text-2xl font-bold text-white mb-2">{plan.display_name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-extrabold text-teal-400">
          ${plan.price_monthly}
        </span>
        <span className="text-gray-400 ml-2">/ month</span>
      </div>

      <div className="text-sm text-gray-300 mb-8 pb-8 border-b border-gray-800">
        <span className="font-semibold text-white">{plan.job_listing_limit === -1 ? 'Unlimited' : plan.job_listing_limit}</span> active job listings
      </div>

      <ul className="flex-grow space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
            <Check size={20} className="text-teal-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.id === 'free' ? (
        <button
          onClick={() => navigate(ROUTES.AUTH.REGISTER_EMPLOYER)}
          className="w-full bg-[#0a2329] hover:bg-teal-900/40 border border-teal-900/50 text-white font-medium py-3 rounded-xl transition-colors"
        >
          Get Started
        </button>
      ) : (
        <button
          onClick={() => onContactSales(plan.id)}
          className={`w-full font-bold py-3 rounded-xl transition-colors ${
            isPopular 
              ? 'bg-teal-500 hover:bg-teal-400 text-slate-900' 
              : 'bg-white hover:bg-gray-100 text-slate-900'
          }`}
        >
          Contact Sales
        </button>
      )}
    </motion.div>
  )
}
