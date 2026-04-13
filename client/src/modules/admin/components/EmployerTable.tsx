import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Trash2 } from 'lucide-react'
import type { AdminEmployer } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface EmployerTableProps {
  employers: AdminEmployer[]
  isLoading: boolean
  onView: (employer: AdminEmployer) => void
  onBlock: (userId: string, isBlocked: boolean) => void
  onDelete: (employerId: string) => void
}

export const EmployerTable: React.FC<EmployerTableProps> = ({
  employers,
  isLoading,
  onView,
  onBlock,
  onDelete
}) => {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-teal-500/10 text-teal-400 border-teal-500/20'
      case 'submitted': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="bg-[#0D4F4F]/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Company</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-6 py-4"><div className="h-4 bg-white/5 rounded w-full" /></td>
                  ))}
                </tr>
              ))
            ) : employers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">No employers found</td>
              </tr>
            ) : (
              employers.map((emp, idx) => (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight italic">{emp.company_name}</span>
                      <span className="text-xs text-gray-500">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-400 font-medium">{emp.industry || '---'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                      {emp.subscription?.plan_name || 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                      getBadgeColor(emp.verification_status)
                    )}>
                      {emp.verification_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => onView(emp)}
                        className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-xl hover:bg-teal-500 transition-all shadow-lg"
                       >
                         <Eye size={16} />
                       </button>
                       <button 
                         onClick={() => onBlock(emp.user_id, !emp.is_blocked)}
                         className={cn(
                           "px-4 py-2 rounded-xl transition-all shadow-lg text-[10px] font-black uppercase tracking-widest border",
                           emp.is_blocked 
                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white" 
                             : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white"
                         )}
                       >
                         {emp.is_blocked ? 'Unblock' : 'Block'}
                       </button>
                       <button 
                         onClick={() => onDelete(emp.id)}
                         className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-xl hover:bg-coral-500 transition-all shadow-lg"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
