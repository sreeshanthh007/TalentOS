import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, FileText, ChevronDown, Save } from 'lucide-react'
import type { Applicant, UpdateApplicationStatusPayload } from '@/shared/types'
import { cn } from '@/shared/utils/cn'
import StarRating from '@/shared/components/StarRating'


interface ApplicantPipelineTableProps {
  applicants?: Applicant[]
  isLoading: boolean
  onStatusChange: (applicationId: string, data: UpdateApplicationStatusPayload) => void
}

export const ApplicantPipelineTable: React.FC<ApplicantPipelineTableProps> = ({ applicants, isLoading, onStatusChange }) => {
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null)
  const [tempNotes, setTempNotes] = useState<Record<string, string>>({})

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#0D4F4F]/20 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!applicants || applicants.length === 0) {
    return (
      <div className="text-center py-12 bg-[#0D4F4F]/20 rounded-2xl border border-dashed border-teal-500/30">
        <p className="text-gray-400">No applicants for this job yet.</p>
      </div>
    )
  }

  const getStatusStyle = (status: Applicant['status']) => {
    switch (status) {
      case 'applied': return 'bg-gray-500/10 text-gray-400'
      case 'shortlisted': return 'bg-teal-500/20 text-teal-300'
      case 'interviewing': return 'bg-blue-500/20 text-blue-300'
      case 'offered': return 'bg-purple-500/20 text-purple-300'
      case 'hired': return 'bg-teal-500 text-white'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/10 text-gray-400'
    }
  }

  return (
    <div className="overflow-x-auto pb-20">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
            <th className="px-6 py-2">Candidate Info</th>
            <th className="px-6 py-2">Status Pipeline</th>
            <th className="px-6 py-2 text-center">Rating</th>
            <th className="px-6 py-2">Notes</th>
            <th className="px-6 py-2 text-right">Resume</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {applicants.map((app, idx) => (
              <React.Fragment key={app.id}>
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#0D4F4F]/30 hover:bg-[#0D4F4F]/50 transition-all rounded-xl"
                >
                  <td className="px-6 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/30 overflow-hidden flex items-center justify-center">
                         {app.candidate.avatar_url ? (
                            <img src={app.candidate.avatar_url} className="w-full h-full object-cover" alt="" />
                         ) : (
                           <User className="text-teal-400" size={20} />
                         )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{app.candidate.full_name || 'Incognito'}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin size={12} className="text-gray-500" />
                          <span className="text-[10px] text-gray-400 uppercase tracking-tight">{app.candidate.location || 'Remote'}</span>
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {app.candidate.skills.slice(0, 3).map((skill, sIdx) => (
                            <span key={sIdx} className="text-[8px] px-2 py-0.5 bg-white/5 text-teal-300 rounded-full border border-teal-500/10">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group/select w-40">
                      <select
                        value={app.status}
                        onChange={(e) => onStatusChange(app.id, { status: e.target.value as Applicant['status'] })}
                        className={cn(
                          "w-full appearance-none px-4 py-2 rounded-xl text-xs font-bold transition-all border outline-none cursor-pointer",
                          getStatusStyle(app.status)
                        )}
                      >
                        <option value="applied">Applied</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offered">Offered</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StarRating 
                        value={app.star_rating || 0} 
                        onChange={(rating) => onStatusChange(app.id, { status: app.status, star_rating: rating })}
                        size="sm"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setExpandedNotes(expandedNotes === app.id ? null : app.id)}
                      className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors"
                    >
                      {app.employer_notes ? 'View Notes' : 'Add Notes'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right rounded-r-2xl">
                    <a 
                      href={app.candidate.resume_url || app.resume_url || '#'}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white rounded-lg transition-all text-xs font-bold"
                    >
                      <FileText size={16} />
                      Resume
                    </a>
                  </td>
                </motion.tr>
                
                {/* Expanded Notes Row */}
                <AnimatePresence>
                  {expandedNotes === app.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <td colSpan={5} className="px-8 py-4 bg-[#0a2329]/50 rounded-2xl border border-teal-500/10 mb-4">
                         <div className="flex gap-4">
                            <textarea
                              placeholder="Add private notes about this candidate..."
                              defaultValue={app.employer_notes || ''}
                              onChange={(e) => setTempNotes(prev => ({ ...prev, [app.id]: e.target.value }))}
                              className="flex-1 bg-[#051114] border border-teal-800/30 rounded-xl p-3 text-xs text-white focus:border-teal-500 outline-none h-20"
                            />
                            <button 
                              onClick={() => onStatusChange(app.id, { 
                                status: app.status, 
                                employer_notes: tempNotes[app.id] || app.employer_notes || '' 
                              })}
                              className="self-end p-3 bg-teal-500 text-white rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
                            >
                              <Save size={18} />
                            </button>
                         </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
