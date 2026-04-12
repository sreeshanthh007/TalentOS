import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw} from 'lucide-react'
import type { EmployerDocument, UploadDocumentPayload } from '@/shared/types'

import { toast } from 'sonner'
import { getCloudinarySignatureApi, uploadToCloudinary } from '@/modules/auth/services/cloudinary.service'
import { VERIFICATION_DOCS_CONFIG } from '../constants/employer.constants'


interface DocumentUploadCardProps {
  documentType: 'pan' | 'incorporation_certificate' | 'other'
  label: string
  existingDoc?: EmployerDocument
  onUploadComplete: (doc: UploadDocumentPayload) => void
}

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({ 
  documentType, 
  label, 
  existingDoc, 
  onUploadComplete 
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

 
    if (!VERIFICATION_DOCS_CONFIG.ACCEPTED_TYPES.includes(file.type as any)) {
      toast.error('Only PDF and image files are accepted')
      return
    }

    if (file.size > VERIFICATION_DOCS_CONFIG.MAX_SIZE) {
      toast.error(`File size must be less than ${VERIFICATION_DOCS_CONFIG.MAX_SIZE_LABEL}`)
      return
    }

    try {
      setIsUploading(true)
      setProgress(10)
      
      const sigRes = await getCloudinarySignatureApi('employer-docs')
      
      setProgress(30)

      const uploadUrl = await uploadToCloudinary(file, sigRes.data, (p) => setProgress(30 + (p * 0.7)))

      
      onUploadComplete({
        document_type: documentType,
        file_url: uploadUrl,
        file_name: file.name
      })

      setProgress(100)
    } catch (error) {
      console.error('Upload failed', error)
      toast.error('Failed to upload document')
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setProgress(0)
      }, 1000)
    }
  }

  return (
    <div className="bg-[#0D4F4F]/30 border border-teal-500/20 rounded-2xl p-6 transition-all hover:border-teal-500/40">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{label}</h4>
        {existingDoc ? (
          <div className="flex items-center gap-2 text-emerald-400">
             <CheckCircle size={16} />
             <span className="text-[10px] font-bold uppercase">Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
             <AlertCircle size={16} />
             <span className="text-[10px] font-bold uppercase">Required</span>
          </div>
        )
      }
      </div>

      <div className="relative h-24 rounded-xl border-2 border-dashed border-teal-500/10 flex items-center justify-center group overflow-hidden">
        {isUploading ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
             <div className="w-full bg-white/10 h-1 rounded-full mb-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-teal-500"
                />
             </div>
             <p className="text-[10px] text-teal-400 font-bold animate-pulse">UPLOADING... {Math.round(progress)}%</p>
          </div>
        ) : existingDoc ? (
          <div className="flex flex-col items-center text-center p-4">
             <FileText size={24} className="text-teal-400 mb-1" />
             <p className="text-[10px] text-gray-300 truncate w-40">{existingDoc.file_name || 'Document'}</p>
             <label className="mt-2 text-[10px] font-bold text-teal-500 hover:text-teal-400 cursor-pointer flex items-center gap-1">
                <RefreshCw size={10} />
                REPLACE
                <input type="file" className="hidden" accept={VERIFICATION_DOCS_CONFIG.ACCEPTED_EXTENSIONS} onChange={handleFileChange} />
             </label>
          </div>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group-hover:bg-white/5 transition-colors">
             <Upload size={24} className="text-teal-500/50 group-hover:text-teal-400 group-hover:scale-110 transition-all" />
             <p className="text-[10px] font-bold text-gray-500 mt-2">CLICK OR DRAG DOCUMENT</p>
             <input type="file" className="hidden" accept={VERIFICATION_DOCS_CONFIG.ACCEPTED_EXTENSIONS} onChange={handleFileChange} />
          </label>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
         <div className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-gray-400 uppercase font-bold">PDF, JPG, PNG, WEBP</div>
         <div className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-gray-400 uppercase font-bold">MAX {VERIFICATION_DOCS_CONFIG.MAX_SIZE_LABEL}</div>
      </div>
    </div>
  )
}
