import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Quote } from 'lucide-react'
import { useAdminTestimonials, useDeleteTestimonial, useToggleTestimonial } from '../hooks/useAdminTestimonials'
import TestimonialFormModal from '../components/TestimonialFormModal'
import type { Testimonial } from '@/shared/types'
import { ConfirmModal } from '@/shared/components/common/ConfirmModal'
import LoadingSpinner from '@/shared/components/common/LoadingSpinner'

const TestimonialsPage: React.FC = () => {
  const { data: testimonials = [], isLoading } = useAdminTestimonials()
  const deleteMutation = useDeleteTestimonial()
  const toggleMutation = useToggleTestimonial()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleEdit = (t: Testimonial) => {
    setSelectedTestimonial(t)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedTestimonial(undefined)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials Management</h1>
          <p className="text-gray-400">Manage user feedback and social proof displayed on the landing page.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          <Plus size={20} />
          Add Testimonial
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(13,79,79,0.3)' }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6 relative group"
            >
              <Quote className="absolute top-4 right-4 text-teal-500/10 w-12 h-12" />
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold text-xl border border-teal-500/20">
                    {t.author_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">{t.author_name}</h3>
                    <p className="text-sm text-gray-400">{t.author_role || 'Verified User'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-1 rounded-lg">
                  <Star size={14} className="fill-teal-400 text-teal-400" />
                  <span className="text-teal-400 text-xs font-bold">{t.rating}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic line-clamp-3">
                "{t.content}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-teal-900/50">
                <button
                  onClick={() => toggleMutation.mutate({ id: t.id, isActive: !t.is_active })}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    t.is_active ? 'text-teal-400' : 'text-gray-500'
                  }`}
                >
                  {t.is_active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  {t.is_active ? 'Active' : 'Draft'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(t.id)}
                    className="p-2 hover:bg-red-500/5 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {testimonials.length === 0 && (
          <div className="lg:col-span-2 text-center py-20 bg-[#0d2e36] border border-teal-900/50 rounded-2xl">
            <Quote className="mx-auto w-12 h-12 text-teal-500/20 mb-4" />
            <p className="text-gray-400 text-lg">No testimonials found. Add one to build shared trust.</p>
          </div>
        )}
      </div>

      <TestimonialFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonial={selectedTestimonial}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </motion.div>
  )
}

export default TestimonialsPage
