import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileUp, CheckCircle2, AlertCircle, X, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'
import { uploadResumeToCloudinary } from '../../services/cloudinary.service'

type ResumeUploadStepProps = {
  resumeUrl: string
  onUploadComplete: (url: string) => void
  error?: string
}

export const ResumeUploadStep: React.FC<ResumeUploadStepProps> = ({
  resumeUrl,
  onUploadComplete,
  error
}) => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>(
    resumeUrl ? 'success' : 'idle'
  )
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileName, setFileName] = useState<string>(resumeUrl ? 'resume.pdf' : '')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    // 1. Validate file type
    if (file.type !== 'application/pdf') {
      toast.error(MESSAGES.UPLOAD.RESUME_TYPE_ERROR)
      return
    }

    // 2. Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error(MESSAGES.UPLOAD.RESUME_SIZE_ERROR)
      return
    }

    setFileName(file.name)
    setUploadState('uploading')
    setUploadProgress(0)

    try {
      const secureUrl = await uploadResumeToCloudinary(file, (percent) => {
        setUploadProgress(percent)
      })
      setUploadState('success')
      onUploadComplete(secureUrl)
      toast.success(MESSAGES.UPLOAD.RESUME_SUCCESS)
    } catch (err: unknown) {
      setUploadState('error')
      const message = err instanceof Error ? err.message : MESSAGES.UPLOAD.RESUME_ERROR
      toast.error(message)
    }
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUploadState('idle')
    setFileName('')
    setUploadProgress(0)
    onUploadComplete('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="text-teal-400" size={24} />
          Upload Your Resume
        </h2>
        <p className="text-sm text-gray-400">
          Please upload your professional CV in PDF format.
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() => uploadState !== 'uploading' && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer transition-all duration-300
          border-2 border-dashed rounded-2xl p-10 text-center
          flex flex-col items-center justify-center gap-4
          ${isDragging ? 'border-teal-500 bg-teal-500/5' : 'border-teal-900/50 hover:border-teal-500/50 bg-[#0a1929]/50'}
          ${uploadState === 'success' ? 'border-teal-500 bg-teal-500/5' : ''}
          ${uploadState === 'error' || error ? 'border-red-500/50 bg-red-500/5' : ''}
          ${uploadState === 'uploading' ? 'pointer-events-none' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          accept=".pdf"
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {uploadState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                <FileUp size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white font-medium">Drag & drop your resume here</p>
                <p className="text-sm text-gray-400">or click to browse from your device</p>
              </div>
              <p className="text-xs text-teal-500/60 font-medium">PDF only • Max 10MB</p>
            </motion.div>
          )}

          {uploadState === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-xs flex flex-col gap-4"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-teal-400 font-medium">{MESSAGES.UPLOAD.UPLOADING}</span>
                <span className="text-teal-400 font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-teal-900/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-teal-400"
                />
              </div>
            </motion.div>
          )}

          {uploadState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle2 size={48} className="text-teal-400" />
              <div className="flex flex-col gap-1">
                <p className="text-white font-medium">Resume Uploaded!</p>
                <p className="text-sm text-teal-400/80 max-w-[200px] truncate">{fileName}</p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                <X size={14} /> Remove and replace
              </button>
            </motion.div>
          )}

          {uploadState === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <AlertCircle size={48} className="text-red-400" />
              <div className="flex flex-col gap-1">
                <p className="text-white font-medium">Upload Failed</p>
                <p className="text-sm text-red-400/80">Please try again</p>
              </div>
              <button
                type="button"
                onClick={() => setUploadState('idle')}
                className="mt-2 text-sm text-teal-400 hover:text-teal-300 font-medium"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle size={14} /> {error}
        </motion.p>
      )}
    </div>
  )
}
