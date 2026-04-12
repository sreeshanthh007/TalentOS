import React from 'react'
import { motion } from 'framer-motion'
import { PlanCard } from '../components/PlanCard'
import { useAdminPlans } from '../hooks/useAdminPlans'
import { useUpdatePlan } from '../hooks/useUpdatePlan'

const PlanManagementPage: React.FC = () => {
  const { data: res, isLoading } = useAdminPlans()
  const { mutate: updatePlan, isPending } = useUpdatePlan()

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Plan <span className="text-coral-400">Architect</span></h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Configure subscription pricing and feature sets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-[500px] bg-white/5 rounded-[32px] animate-pulse" />
          ))
        ) : (
          res?.data.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
               <PlanCard 
                 plan={plan}
                 onSave={(id, data) => updatePlan({ planId: id, data })}
                 isSaving={isPending}
               />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default PlanManagementPage
