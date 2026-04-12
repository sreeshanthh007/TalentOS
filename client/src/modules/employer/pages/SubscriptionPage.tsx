import React from 'react'
import { CreditCard, Check, ShieldCheck, Zap } from 'lucide-react'
import { useMySubscription } from '../hooks/useMySubscription'
import { SubscriptionCard } from '../components/SubscriptionCard'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'
import { cn } from '@/shared/utils/cn'

const planComparison = [
  {
    name: 'Free',
    price: 0,
    listings: 2,
    features: ['Basic Job Postings', 'Standard Support', '5 Applicants / Job', 'Manual Matching'],
    color: 'gray'
  },
  {
    name: 'Premium',
    price: 49,
    listings: 10,
    features: ['Unlimited Applicants', 'Priority Email Support', 'AI Talent Matching', 'Featured Listings'],
    color: 'teal',
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 199,
    listings: 'Unlimited',
    features: ['Dedicated Account Mgr', 'Custom Integrations', 'White-labeling', 'Advanced Analytics'],
    color: 'blue'
  }
]

const SubscriptionPage: React.FC = () => {
  const { data: subRes, isLoading } = useMySubscription()
  const subscription = subRes?.data

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 italic">Power Up Your Hiring</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Expand your reach and access advanced AI matching tools with our premium plans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-center">
        <div className="lg:col-span-1">
           <h2 className="text-sm font-bold text-teal-400 uppercase tracking-[0.3em] mb-4">Current Subscription</h2>
           <SubscriptionCard subscription={subscription} isLoading={isLoading} />
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="bg-[#0D4F4F]/20 rounded-3xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
                 <ShieldCheck className="text-teal-400" />
                 Plan Comparison
              </h3>
              
              <div className="grid grid-cols-3 gap-1">
                 {planComparison.map((plan, i) => {
                    const isCurrent = subscription?.plan?.name?.toLowerCase() === plan.name.toLowerCase()
                    return (
                      <div key={i} className={cn(
                        "p-6 rounded-2xl flex flex-col items-center text-center transition-all",
                        isCurrent ? "bg-teal-500/10 border border-teal-500/30 scale-105 shadow-2xl z-10" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                      )}>
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{plan.name}</span>
                         <h4 className="text-3xl font-black text-white">${plan.price}</h4>
                         <span className="text-[10px] text-teal-500 mt-2 font-black uppercase">{plan.listings} Job Slots</span>
                         <div className="mt-6 space-y-2 w-full">
                            {plan.features.slice(0, 3).map((f, fi) => (
                               <div key={fi} className="flex items-center gap-2 justify-center text-[10px] text-gray-300">
                                  <Check size={10} className="text-teal-400" />
                                  {f}
                               </div>
                            ))}
                         </div>
                         {isCurrent ? (
                            <span className="mt-6 px-4 py-1 bg-teal-500 text-white rounded-full text-[8px] font-black uppercase italic">Current Active Plan</span>
                         ) : (
                            <Link 
                               to={ROUTES.PUBLIC.ABOUT} 
                               className="mt-6 text-[10px] font-black text-teal-400 uppercase border-b border-teal-500/50 pb-0.5 tracking-widest"
                            >
                               Upgrade Now
                            </Link>
                         )}
                      </div>
                    )
                 })}
              </div>
           </div>

           <div className="bg-gradient-to-r from-[#0a2329] to-transparent p-6 rounded-3xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <Zap size={24} className="text-teal-400" />
                 </div>
                 <div>
                    <h4 className="font-bold text-white uppercase tracking-tight">Need a Custom Solution?</h4>
                    <p className="text-xs text-gray-500">Contact our sales team for enterprise-grade custom plans.</p>
                 </div>
              </div>
              <button className="px-6 py-3 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-teal-400 transition-all">
                 Contact Sales
              </button>
           </div>
        </div>
      </div>

      <section>
         <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Billing History</h3>
         <div className="bg-[#0a2329]/40 rounded-3xl p-12 text-center border border-white/5">
            <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
               <CreditCard size={32} className="text-gray-600" />
            </div>
            <p className="text-gray-500 text-sm italic">No billing records found in your account history.</p>
         </div>
      </section>
    </div>
  )
}

export default SubscriptionPage
