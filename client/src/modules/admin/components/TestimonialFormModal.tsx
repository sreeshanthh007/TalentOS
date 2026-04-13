import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { StarRating } from '@/shared/components/StarRating'
import type { Testimonial, CreateTestimonialPayload } from '@/shared/types'
import { useCreateTestimonial, useUpdateTestimonial } from '../hooks/useAdminTestimonials'

interface TestimonialFormModalProps {
  isOpen: boolean
  onClose: () => void
  testimonial?: Testimonial
}

const testimonialSchema = Yup.object().shape({
  author_name: Yup.string().required('Author name is required'),
  content: Yup.string().min(20, 'Content must be at least 20 characters').required('Content is required'),
  rating: Yup.number().min(1).max(5).required('Rating is required'),
})

const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({ isOpen, onClose, testimonial }) => {
  const createMutation = useCreateTestimonial()
  const updateMutation = useUpdateTestimonial()

  const initialValues: CreateTestimonialPayload = {
    author_name: testimonial?.author_name || '',
    author_role: testimonial?.author_role || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
    is_active: testimonial?.is_active ?? true,
    avatar_url: testimonial?.avatar_url || ''
  }

  const handleSubmit = (values: CreateTestimonialPayload) => {
    if (testimonial) {
      updateMutation.mutate({ id: testimonial.id, data: values }, { onSuccess: onClose })
    } else {
      createMutation.mutate(values, { onSuccess: onClose })
    }
  }

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0d2e36] border border-teal-900/50 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-teal-900/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={testimonialSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                <Form className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Author Name *
                    </label>
                    <Field
                      name="author_name"
                      className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-500/50 transition-colors"
                    />
                    {errors.author_name && touched.author_name && (
                      <div className="text-red-400 text-xs mt-1">{errors.author_name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Author Role
                    </label>
                    <Field
                      name="author_role"
                      placeholder="e.g. Senior Developer at Google"
                      className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Rating *
                    </label>
                    <StarRating 
                      value={values.rating} 
                      onChange={(r) => setFieldValue('rating', r)} 
                      size="lg" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Content * (Min 20 chars)
                    </label>
                    <Field
                      as="textarea"
                      name="content"
                      rows={4}
                      className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-500/50 transition-colors resize-none"
                    />
                    {errors.content && touched.content && (
                      <div className="text-red-400 text-xs mt-1">{errors.content}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Field 
                      type="checkbox" 
                      name="is_active" 
                      className="w-4 h-4 rounded border-teal-900/50 bg-[#0a2329] text-teal-500 focus:ring-teal-500/20" 
                    />
                    <label className="text-sm font-medium text-gray-400">
                      Display publicly
                    </label>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-xl py-2.5 font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                      className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-900 rounded-xl py-2.5 font-bold transition-all"
                    >
                      {testimonial ? 'Update' : 'Create'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TestimonialFormModal
