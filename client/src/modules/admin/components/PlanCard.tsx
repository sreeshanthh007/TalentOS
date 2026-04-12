import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2, X, Plus, Check } from 'lucide-react'
import type { SubscriptionPlan, UpdatePlanPayload } from '@/shared/types'

interface PlanCardProps {
  plan: SubscriptionPlan
  onSave: (id: string, data: UpdatePlanPayload) => void
  isSaving: boolean
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSave, isSaving }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(plan.price_monthly)
  const [features, setFeatures] = useState<string[]>(plan.features)

  const handleAddFeature = () => {
    setFeatures([...features, ''])
  }

  const handleUpdateFeature = (idx: number, val: string) => {
    const newFeatures = [...features]
    newFeatures[idx] = val
    setFeatures(newFeatures)
  }

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx))
  }

  const handleSave = () => {
    onSave(plan.id, {
      price_monthly: price,
      features: features.filter(f => f.trim() !== '')
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-[#0D4F4F]/40 border border-white/5 rounded-[32px] p-8 backdrop-blur-xl relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
           <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{plan.display_name}</h3>
           <button 
             onClick={() => setIsEditing(!isEditing)}
             className="p-2 bg-white/5 hover:bg-teal-500 text-gray-400 hover:text-white rounded-xl transition-all"
           >
             {isEditing ? <X size={16} /> : <Edit2 size={16} />}
           </button>
        </div>

        <div className="mb-8">
           {isEditing ? (
             <div className="flex items-baseline gap-2">
                <span className="text-xl text-teal-400 font-black">$</span>
                <input 
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="bg-white/5 border border-teal-500/30 rounded-xl px-3 py-2 text-white text-3xl font-black italic w-32 focus:outline-none focus:border-teal-500"
                />
                <span className="text-gray-500 font-bold uppercase text-[10px]">/mo</span>
             </div>
           ) : (
             <p className="text-4xl font-black text-white italic tracking-tighter">
                ${plan.price_monthly}<span className="text-xs text-gray-500 uppercase not-italic tracking-widest ml-1">/mo</span>
             </p>
           )}
           <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest mt-2">{plan.job_listing_limit} JOB LISTINGS</p>
        </div>

        <div className="space-y-4 mb-8">
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Plan Features</p>
           <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {features.map((feature, idx) => (
                 <motion.div 
                   key={idx}
                   layout
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex items-center gap-2 group/feat"
                 >
                    {isEditing ? (
                       <div className="flex-1 flex gap-2">
                          <input 
                            value={feature}
                            onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                            placeholder="Add feature description..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500/50"
                          />
                          <button onClick={() => handleRemoveFeature(idx)} className="p-2 text-red-500 opacity-0 group-hover/feat:opacity-100 transition-opacity">
                             <X size={14} />
                          </button>
                       </div>
                    ) : (
                       <>
                          <Check size={14} className="text-teal-400 shrink-0" />
                          <span className="text-xs text-gray-400">{feature}</span>
                       </>
                    )}
                 </motion.div>
              ))}
              {isEditing && (
                 <button 
                  onClick={handleAddFeature}
                  className="w-full py-2 border border-dashed border-teal-500/30 rounded-xl text-[10px] font-black text-teal-500 uppercase tracking-widest hover:bg-teal-500/10 transition-all flex items-center justify-center gap-2"
                 >
                    <Plus size={14} /> Add Feature
                 </button>
              )}
           </div>
        </div>

        <AnimatePresence>
           {isEditing && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-4 bg-teal-500 text-white rounded-[20px] font-black uppercase text-xs tracking-widest italic hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 disabled:opacity-50"
              >
                {isSaving ? 'Updating...' : 'Save Changes'}
              </motion.button>
           )}
        </AnimatePresence>
      </div>
    </div>
  )
}
