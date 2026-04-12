import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import type { Inquiry } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface InquiryTableProps {
  inquiries: Inquiry[]
  isLoading: boolean
  onOpenChat: (inquiryId: string) => void
  onUpdateStatus: (inquiryId: string, status: string) => void
}

export const InquiryTable: React.FC<InquiryTableProps> = ({
  inquiries,
  isLoading,
  onOpenChat,
  onUpdateStatus
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-teal-500/10 text-teal-400 border-teal-500/20'
      case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'open': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="bg-[#0D4F4F]/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Employer</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Interest</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Preview</th>
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
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">No inquiries found</td>
              </tr>
            ) : (
              inquiries.map((inq, idx) => (
                <motion.tr
                  key={inq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-white uppercase italic tracking-tighter">{inq.employer?.company_name}</span>
                        <span className="text-xs text-gray-500">{inq.employer?.email}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-emerald-400 uppercase tracking-widest">
                     {inq.plan?.display_name || 'Generic'}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                     <p className="text-xs text-gray-400 truncate font-medium">{inq.initial_message}</p>
                  </td>
                  <td className="px-6 py-4">
                     <select 
                       value={inq.status}
                       onChange={(e) => onUpdateStatus(inq.id, e.target.value)}
                       className={cn(
                        "px-3 py-1 bg-transparent border rounded-full text-[8px] font-black uppercase tracking-widest outline-none",
                        getStatusBadge(inq.status)
                       )}
                     >
                        <option value="open" className="bg-[#0a1e22]">Open</option>
                        <option value="in_progress" className="bg-[#0a1e22]">In Progress</option>
                        <option value="resolved" className="bg-[#0a1e22]">Resolved</option>
                     </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => onOpenChat(inq.id)}
                         className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
                       >
                         Chat <MessageSquare size={14} />
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
