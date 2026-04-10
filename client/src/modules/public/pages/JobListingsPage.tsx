import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { FilterBar } from '../components/FilterBar'
import { JobCard } from '../components/JobCard'
import { useJobs } from '../hooks/useJobs'
import { useCategories } from '../hooks/useCategories'
import { pageVariants, staggerContainer, staggerItem } from '@/shared/animations/auth.animations'
import type { JobFilters } from '@/shared/types'

export default function JobListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [filters, setFilters] = useState<Partial<JobFilters>>({
    search: searchParams.get('search') || '',
    job_type: searchParams.get('job_type') || '',
    category_id: searchParams.get('category_id') || '',
    source: searchParams.get('source') || '',
    page: 1,
    limit: 12,
  })

  const handleSearchChange = React.useCallback((val: string) => {
    setFilters(prev => ({ ...prev, search: val, page: 1 }))
  }, [])

  const handleFilterChange = React.useCallback((newFilters: Partial<JobFilters>) => {
    setFilters(newFilters)
  }, [])

  // Sync state to URL 
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.job_type) params.set('job_type', filters.job_type)
    if (filters.category_id) params.set('category_id', filters.category_id)
    if (filters.source) params.set('source', filters.source)
    
    // Only update if params actually changed to avoid unnecessary navigation history entries
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params)
    }
  }, [filters, setSearchParams, searchParams])

  const { data: jobsResp, isLoading: jobsLoading } = useJobs(filters)
  const { data: catResp } = useCategories()

  const jobs = jobsResp?.data?.data || []
  const totalJobs = jobsResp?.data?.total || 0
  const totalPages = jobsResp?.data?.totalPages || 1
  const categories = catResp?.data || []

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-[#0a2329] min-h-screen pt-8 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Area */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Find Your Next Role</h1>
          <SearchBar 
            value={filters.search || ''} 
            onChange={handleSearchChange}
            onSearch={() => {}} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4">
            <FilterBar filters={filters} categories={categories} onChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <div className="bg-[#0d2e36] p-4 rounded-xl border border-teal-900/50 mb-6 flex justify-between items-center text-sm">
              <span className="text-gray-400">
                Showing <strong className="text-white">{jobs.length}</strong> of <strong className="text-white">{totalJobs}</strong> jobs
              </span>
            </div>

            {jobsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 rounded-xl bg-[#0d2e36] animate-pulse" />)}
               </div>
            ) : jobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="text-center py-20 bg-[#0d2e36] rounded-2xl border border-teal-900/50"
              >
                <div className="w-24 h-24 bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🕵️‍♂️</div>
                <h3 className="text-2xl font-bold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => setFilters({ search: '', job_type: '', category_id: '', source: '', page: 1, limit: 12 })}
                  className="bg-teal-500 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-teal-400 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div 
                   key={JSON.stringify(filters)}
                   variants={staggerContainer}
                   initial="initial"
                   animate="animate"
                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {jobs.map(job => (
                      <motion.div key={job.id} variants={staggerItem} exit={{ opacity: 0, scale: 0.9 }}>
                        <JobCard job={job} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-4">
                    <button 
                      disabled={filters.page === 1}
                      onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
                      className="px-4 py-2 rounded-lg bg-[#0d2e36] border border-teal-900/50 disabled:opacity-50 text-white"
                    >
                      Previous
                    </button>
                    <span className="text-gray-400">Page {filters.page} of {totalPages}</span>
                    <button 
                      disabled={filters.page === totalPages}
                      onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
                      className="px-4 py-2 rounded-lg bg-[#0d2e36] border border-teal-900/50 disabled:opacity-50 text-white"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </motion.div>
  )
}
