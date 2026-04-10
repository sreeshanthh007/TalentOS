import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { JobFilters, JobCategory } from '@/shared/types'

type FilterBarProps = {
  filters: Partial<JobFilters>
  categories: JobCategory[]
  onChange: (filters: Partial<JobFilters>) => void
}

const jobTypes = [
  { value: '', label: 'All Types' },
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
]

export const FilterBar: React.FC<FilterBarProps> = ({ filters, categories, onChange }) => {
  const updateFilter = (key: keyof JobFilters, value: string) => {
    onChange({ ...filters, [key]: value, page: 1 }) // Reset to page 1 on filter change
  }

  const removeFilter = (key: keyof JobFilters) => {
    onChange({ ...filters, [key]: '' })
  }

  const activeFilters = []
  if (filters.job_type) {
    activeFilters.push({ key: 'job_type' as keyof JobFilters, label: jobTypes.find(t => t.value === filters.job_type)?.label || filters.job_type })
  }
  if (filters.category_id) {
    activeFilters.push({ key: 'category_id' as keyof JobFilters, label: categories.find(c => c.id === filters.category_id)?.name || 'Category' })
  }
  if (filters.source) {
    activeFilters.push({ key: 'source' as keyof JobFilters, label: filters.source })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex flex-wrap gap-4 items-center bg-[#0d2e36] p-4 rounded-xl border border-teal-900/50 shadow-lg">
        <select 
          className="bg-[#0a2329] border border-teal-900/50 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 outline-none"
          value={filters.job_type || ''}
          onChange={(e) => updateFilter('job_type', e.target.value)}
        >
          {jobTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <select 
          className="bg-[#0a2329] border border-teal-900/50 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 outline-none max-w-[200px] truncate"
          value={filters.category_id || ''}
          onChange={(e) => updateFilter('category_id', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select 
          className="bg-[#0a2329] border border-teal-900/50 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 outline-none"
          value={filters.source || ''}
          onChange={(e) => updateFilter('source', e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="internal">TalentOS Native</option>
          <option value="external">External Boards</option>
        </select>
      </div>

      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {activeFilters.map(filter => (
              <motion.div
                key={filter.key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 text-teal-300 px-3 py-1.5 rounded-full text-sm"
              >
                {filter.label}
                <button onClick={() => removeFilter(filter.key)} className="hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </motion.div>
            ))}
            <button 
              onClick={() => onChange({ ...filters, job_type: '', category_id: '', source: '' })}
              className="text-sm text-gray-400 hover:text-white underline ml-2 py-1.5"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
