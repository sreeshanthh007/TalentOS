import React, { useState } from 'react'
import {  AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  Search,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMyApplications } from '@/modules/candidate/hooks/useMyApplications'
import { ROUTES } from '@/shared/constants/routes.constants'
import { useDebounce } from '@/shared/hooks/useDebounce'

// Components
import { ApplicationCard } from '@/modules/candidate/components/applications/ApplicationCard'
import { StatusTabs } from '@/modules/candidate/components/applications/StatusTabs'

const tabs = ['All', 'Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Hired', 'Rejected'] as const
type TabType = typeof tabs[number]

const AppliedJobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { data: appsRes, isLoading } = useMyApplications()
  
  const debouncedSearch = useDebounce(searchQuery, 500)
  const applications = appsRes?.data || []

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'All' || app.status.toLowerCase() === activeTab.toLowerCase()
    const matchesSearch = (app.job?.title || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         (app.job?.employer?.company_name || '').toLowerCase().includes(debouncedSearch.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Applied Jobs</h1>
          <p className="text-gray-400 mt-2">Track all your active job applications</p>
        </div>
        
        <div className="relative group max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0d2e36] border border-teal-900/50 rounded-xl focus:border-teal-500 focus:outline-none transition-all placeholder:text-gray-600"
          />
        </div>
      </header>

      {/* Tabs */}
      <StatusTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab)} 
      />

      {/* Applications List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredApplications.map((app, index) => (
            <ApplicationCard key={app.id} app={app} index={index} />
          ))}
        </AnimatePresence>

        {filteredApplications.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-[#0d2e36] border border-dashed border-teal-900/50 rounded-3xl space-y-4">
            <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-500">
              <Briefcase size={40} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-serif">No applications found</h3>
              <p className="text-gray-500 mt-1 max-w-xs mx-auto">
                {searchQuery || activeTab !== 'All' 
                  ? "Try adjusting your filters or search terms." 
                  : "You haven't applied to any jobs yet. Start your journey today!"}
              </p>
            </div>
            <Link 
              to={ROUTES.PUBLIC.JOBS}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all"
            >
              Browse Jobs
            </Link>
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6 animate-pulse">
                <div className="h-20 bg-white/5 rounded-xl" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppliedJobsPage
