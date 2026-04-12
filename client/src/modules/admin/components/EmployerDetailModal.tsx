import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Building2, Globe, Phone, ShieldCheck, FileText, ExternalLink } from 'lucide-react'
import type { AdminEmployer } from '@/shared/types'

interface EmployerDetailModalProps {
  employer: AdminEmployer | null
  isOpen: boolean
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export const EmployerDetailModal: React.FC<EmployerDetailModalProps> = ({
  employer,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  if (!employer) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a1e22] border border-white/5 rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                 <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                       <Building2 className="text-teal-400" size={32} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                          {employer.company_name}
                       </h2>
                       <p className="text-gray-400 text-sm">{employer.email}</p>
                    </div>
                 </div>
                 <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="text-gray-500" />
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-400">
                       <Globe size={16} />
                       <span className="text-xs">{employer.website || 'No website'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                       <Phone size={16} />
                       <span className="text-xs">{employer.phone || 'No phone'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-400">
                       <ShieldCheck size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest">{employer.verification_status}</span>
                    </div>
                 </div>
                 <div className="bg-white/5 rounded-3xl p-4 border border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Subscription</p>
                    <p className="text-white font-bold">{employer.subscription?.plan_name || 'Free Plan'}</p>
                    <p className="text-xs text-teal-400 mt-1">{employer.subscription?.status || 'Active'}</p>
                 </div>
              </div>

              <div className="mb-8">
                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Verification Documents</h3>
                 <div className="space-y-2">
                    {employer.documents?.length === 0 ? (
                       <p className="text-sm text-gray-500 italic">No documents uploaded</p>
                    ) : (
                       employer.documents?.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 group hover:border-teal-500/30 transition-all">
                             <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                <div>
                                   <p className="text-xs font-bold text-white uppercase tracking-wider">{doc.document_type}</p>
                                   <p className="text-[10px] text-gray-500">{doc.file_name}</p>
                                </div>
                             </div>
                             <a 
                                href={doc.file_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="p-2 text-teal-500 hover:text-white hover:bg-teal-500 rounded-lg transition-all"
                             >
                                <ExternalLink size={14} />
                             </a>
                          </div>
                       ))
                    )}
                 </div>
              </div>

              {employer.verification_status === 'submitted' && (
                 <div className="flex gap-4">
                    <button 
                       onClick={() => onApprove(employer.id)}
                       className="flex-1 py-4 bg-teal-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
                    >
                       Approve Verification
                    </button>
                    <button 
                       onClick={() => onReject(employer.id)}
                       className="flex-1 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                       Reject
                    </button>
                 </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
