import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Save } from 'lucide-react'
import { DocumentUploadCard } from './DocumentUploadCard'
import { cn } from '@/shared/utils/cn'
import type { EmployerUser, EmployerDocument } from '@/shared/types'

interface VerificationCenterProps {
  employer?: EmployerUser | null
  docs: EmployerDocument[]
  onUploadDoc: (data: any) => void
  onSubmitVerification: () => void
  isSubmitting: boolean
}

export const VerificationCenter: React.FC<VerificationCenterProps> = ({ 
  employer, 
  docs, 
  onUploadDoc, 
  onSubmitVerification, 
  isSubmitting 
}) => {
  const panDoc = docs.find(d => d.document_type === 'pan')
  const incorpDoc = docs.find(d => d.document_type === 'incorporation_certificate')

  return (
    <motion.div
      key="verification"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-12"
    >
       <div className="bg-[#0a2329] border border-white/5 rounded-3xl p-8 flex items-center justify-between">
          <div>
             <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">Verification Documents</h3>
             <p className="text-gray-500 text-sm">Upload your official identity and registration papers.</p>
          </div>
          <div className={cn(
            "px-6 py-2 rounded-full text-xs font-black uppercase italic border",
            employer?.verification_status === 'approved' ? "bg-emerald-500 text-white border-transparent" :
            employer?.verification_status === 'submitted' ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
            "bg-orange-500/10 text-orange-400 border-orange-500/30"
          )}>
            {employer?.verification_status}
          </div>
       </div>

       {employer?.verification_status === 'approved' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-20 text-center">
             <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/40">
                <ShieldCheck size={40} className="text-white" />
             </div>
             <h2 className="text-3xl font-black text-white italic uppercase mb-2">Account Verified</h2>
             <p className="text-gray-400">Your profile is fully verified and discoverable.</p>
          </div>
       ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <DocumentUploadCard 
                 documentType="pan" 
                 label="PAN Card (India Only)" 
                 existingDoc={panDoc}
                 onUploadComplete={onUploadDoc}
               />
               <DocumentUploadCard 
                 documentType="incorporation_certificate" 
                 label="Incorporation Certificate" 
                 existingDoc={incorpDoc}
                 onUploadComplete={onUploadDoc}
               />
            </div>

            <div className="bg-[#0D4F4F]/10 border border-white/5 p-8 rounded-3xl flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400">
                     <Save size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white uppercase tracking-tight">Final Submission</h4>
                     <p className="text-xs text-gray-500 italic">Submit all assets for compliance review.</p>
                  </div>
               </div>
               <button
                 onClick={onSubmitVerification}
                 disabled={!panDoc || !incorpDoc || isSubmitting || employer?.verification_status === 'submitted'}
                 className="px-10 py-4 bg-teal-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 disabled:opacity-30 disabled:grayscale transition-all"
               >
                 {isSubmitting ? 'Submitting...' : 'Submit Verification'}
               </button>
            </div>
          </>
       )}
    </motion.div>
  )
}
