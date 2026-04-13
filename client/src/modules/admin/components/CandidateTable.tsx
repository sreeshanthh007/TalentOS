import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Trash2, Star, MapPin } from 'lucide-react'
import type { AdminCandidate } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface CandidateTableProps {
  candidates: AdminCandidate[]
  isLoading: boolean
  onViewResume: (resumeUrl: string) => void
  onBlock: (userId: string, isBlocked: boolean) => void
  onDelete: (candidateId: string) => void
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  isLoading,
  onViewResume,
  onBlock,
  onDelete
}) => {
  return (
    <div className="bg-[#0D4F4F]/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidate</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Skills</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</th>
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
            ) : candidates.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">No candidates found</td>
              </tr>
            ) : (
              candidates.map((can, idx) => (
                <motion.tr
                  key={can.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/20">
                          {can.avatar_url ? <img src={can.avatar_url} className="w-full h-full object-cover rounded-xl" alt="" /> : can.full_name?.[0]}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">{can.full_name || 'Anonymous'}</span>
                          <span className="text-[10px] text-gray-500 lowercase">{can.email}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-400">
                       <MapPin size={12} className="text-gray-600" />
                       <span className="text-xs">{can.location || '---'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                       {can.skills.slice(0, 2).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                             {s}
                          </span>
                       ))}
                       {can.skills.length > 2 && (
                          <span className="text-[8px] font-black text-teal-500">+{can.skills.length - 2}</span>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                       <Star size={12} className="text-amber-400 fill-amber-400" />
                       <span className="text-xs font-bold text-white">{can.average_rating?.toFixed(1) || '0.0'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => can.resume_url && onViewResume(can.resume_url)}
                        disabled={!can.resume_url}
                        className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-xl hover:bg-teal-500 transition-all shadow-lg disabled:opacity-30"
                       >
                         <FileText size={16} />
                       </button>
                       <button 
                         onClick={() => onBlock(can.user_id, !can.is_blocked)}
                         className={cn(
                           "px-4 py-2 rounded-xl transition-all shadow-lg text-[10px] font-black uppercase tracking-widest border",
                           can.is_blocked 
                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white" 
                             : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white"
                         )}
                       >
                         {can.is_blocked ? 'Unblock' : 'Block'}
                       </button>
                       <button 
                         onClick={() => onDelete(can.id)}
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
