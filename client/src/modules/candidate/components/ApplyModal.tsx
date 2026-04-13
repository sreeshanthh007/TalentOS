import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Upload, CheckCircle2 } from 'lucide-react'
import { useApplyForJob } from '../hooks/useApplyForJob'
import { useToast } from '@/shared/hooks/useToast'
import { uploadResumeToCloudinary } from '@/modules/auth/services/cloudinary.service'
import { MESSAGES } from '@/shared/constants/messages.constants'
import type { Job } from '@/shared/types'

type ApplyModalProps = {
  isOpen: boolean
  onClose: () => void
  job: Job
  savedResumeUrl: string | null
}

type ResumeOption = 'saved' | 'new'

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  job,
  savedResumeUrl
}) => {
  const toast = useToast()
  const { mutate: applyForJob, isPending } = useApplyForJob()

  const [resumeOption, setResumeOption] = useState<ResumeOption>(
    savedResumeUrl ? 'saved' : 'new'
  )
  const [newResumeUrl, setNewResumeUrl] = useState<string>('')
  const [newResumeFile, setNewResumeFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error(MESSAGES.UPLOAD.RESUME_TYPE_ERROR)
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error(MESSAGES.UPLOAD.RESUME_SIZE_ERROR)
      return
    }

    setNewResumeFile(file)
    setIsUploading(true)
    setUploadProgress(0)
    setUploadSuccess(false)

    try {
      const url = await uploadResumeToCloudinary(file, (percent) => {
        setUploadProgress(percent)
      })
      setNewResumeUrl(url)
      setUploadSuccess(true)
      toast.success(MESSAGES.UPLOAD.RESUME_SUCCESS)
    } catch {
      toast.error(MESSAGES.UPLOAD.RESUME_ERROR)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = () => {
    const resumeUrl = resumeOption === 'saved' ? savedResumeUrl : newResumeUrl

    if (!resumeUrl) {
      toast.error(MESSAGES.UPLOAD.RESUME_REQUIRED)
      return
    }

    applyForJob(
      { jobId: job.id, resumeUrl },
      {
        onSuccess: () => {
          toast.success(MESSAGES.CANDIDATE.APPLICATION_SUCCESS)
          onClose()
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message || MESSAGES.CANDIDATE.APPLICATION_ERROR
          toast.error(message)
        }
      }
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#0d2e36] rounded-2xl border border-teal-900/50 
                           p-8 w-full max-w-lg shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Apply for Position
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{job.title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Resume Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-300 mb-3">
                  Choose Resume
                </p>

                <div className="space-y-3">
                  {/* Saved Resume Option */}
                  {savedResumeUrl && (
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setResumeOption('saved')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-colors
                        ${resumeOption === 'saved'
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-teal-900/50 bg-[#0a2329] hover:border-teal-700'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText
                          size={20}
                          className={resumeOption === 'saved'
                            ? 'text-teal-400'
                            : 'text-gray-400'
                          }
                        />
                        <div>
                          <p className="font-medium text-white text-sm">
                            Use Saved Resume
                          </p>
                          <p className="text-xs text-gray-400">
                            Your previously uploaded resume
                          </p>
                        </div>
                        {resumeOption === 'saved' && (
                          <CheckCircle2
                            size={18}
                            className="text-teal-400 ml-auto"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Upload New Resume Option */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setResumeOption('new')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-colors
                      ${resumeOption === 'new'
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-teal-900/50 bg-[#0a2329] hover:border-teal-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Upload
                        size={20}
                        className={resumeOption === 'new'
                          ? 'text-teal-400'
                          : 'text-gray-400'
                        }
                      />
                      <div>
                        <p className="font-medium text-white text-sm">
                          Upload New Resume
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF only • Max 10MB
                        </p>
                      </div>
                      {resumeOption === 'new' && uploadSuccess && (
                        <CheckCircle2
                          size={18}
                          className="text-teal-400 ml-auto"
                        />
                      )}
                    </div>

                    {/* Upload area — shown when new option selected */}
                    {resumeOption === 'new' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        {!newResumeFile ? (
                          <label className="block border-2 border-dashed border-teal-900/50 
                                           rounded-xl p-6 text-center cursor-pointer
                                           hover:border-teal-500 transition-colors">
                            <Upload
                              size={32}
                              className="text-teal-400 mx-auto mb-2"
                            />
                            <p className="text-sm text-gray-400">
                              Click to browse PDF
                            </p>
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileSelect(file)
                              }}
                            />
                          </label>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-xs text-gray-400 truncate">
                              {newResumeFile.name}
                            </p>
                            {isUploading && (
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                  className="bg-teal-500 h-2 rounded-full"
                                  animate={{ width: `${uploadProgress}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            )}
                            {uploadSuccess && (
                              <p className="text-xs text-teal-400 flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                Ready to submit
                              </p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={
                  isPending ||
                  isUploading ||
                  (resumeOption === 'new' && !uploadSuccess)
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 
                           text-slate-900 font-bold rounded-xl
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                {isPending ? 'Submitting Application...' : 'Submit Application'}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
