import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormik } from 'formik'
import { X } from 'lucide-react'
import type { Job, CreateJobPayload } from '@/shared/types'
import { useCreateJob } from '../hooks/useCreateJob'
import { useUpdateJob } from '../hooks/useUpdateJob'
import { useCategories } from '@/modules/public/hooks/useCategories'

import { jobValidationSchema } from '@/shared/validators/employer.validators'

interface JobFormModalProps {
  isOpen: boolean
  onClose: () => void
  job?: Job
}

export const JobFormModal: React.FC<JobFormModalProps> = ({ isOpen, onClose, job }) => {
  const { mutate: createJob, isPending: isCreating } = useCreateJob()
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob()
  const { data: categoriesRes } = useCategories()

  const categories = categoriesRes?.data || []


  const formik = useFormik<CreateJobPayload>({
    initialValues: {
      title: job?.title || '',
      description: job?.description || '',
      requirements: job?.requirements || '',
      location: job?.location || '',
      job_type: job?.job_type || 'full_time',
      category_id: job?.category_id || '',
      salary_min: job?.salary_min || null,
      salary_max: job?.salary_max || null,
      experience_years: job?.experience_years || null,
      status: (job?.status as 'draft' | 'active') || 'active',
    },
    enableReinitialize: true,
    validationSchema: jobValidationSchema,
    onSubmit: (values) => {
      if (job) {
        updateJob({ id: job.id, data: values }, { onSuccess: onClose })
      } else {
        createJob(values, { onSuccess: onClose })
      }
    },
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a2329] border border-teal-500/30 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
                {job ? 'Edit Job Posting' : 'Post a New Job'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} className="text-teal-400" />
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Job Title *</label>
                    <input
                      name="title"
                      {...formik.getFieldProps('title')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    />
                    {formik.touched.title && formik.errors.title && <p className="text-red-400 text-[10px]">{formik.errors.title}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Category</label>
                    <select
                      name="category_id"
                      {...formik.getFieldProps('category_id')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Description *</label>
                <textarea
                  name="description"
                  rows={4}
                  {...formik.getFieldProps('description')}
                  className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all resize-none"
                />
                {formik.touched.description && formik.errors.description && <p className="text-red-400 text-[10px]">{formik.errors.description}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Requirements *</label>
                <textarea
                  name="requirements"
                  rows={4}
                  {...formik.getFieldProps('requirements')}
                  className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all resize-none"
                />
                {formik.touched.requirements && formik.errors.requirements && <p className="text-red-400 text-[10px]">{formik.errors.requirements}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Location *</label>
                    <input
                      name="location"
                      {...formik.getFieldProps('location')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    />
                    {formik.touched.location && formik.errors.location && <p className="text-red-400 text-[10px]">{formik.errors.location}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Job Type *</label>
                    <select
                      name="job_type"
                      {...formik.getFieldProps('job_type')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    >
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Salary Min (k)</label>
                    <input
                      type="number"
                      {...formik.getFieldProps('salary_min')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Salary Max (k)</label>
                    <input
                      type="number"
                      {...formik.getFieldProps('salary_max')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Status</label>
                    <select
                      {...formik.getFieldProps('status')}
                      className="w-full bg-[#051114] border border-teal-800/30 rounded-xl px-4 py-3 text-white focus:border-teal-500 transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                 </div>
              </div>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full py-4 mt-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isCreating || isUpdating ? (
                   <span className="flex items-center justify-center gap-2">
                     <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     {job ? 'Updating...' : 'Publishing...'}
                   </span>
                ) : (
                  job ? 'Save Changes' : 'Post Job Now'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
