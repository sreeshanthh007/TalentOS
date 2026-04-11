import React from 'react'
import {  AnimatePresence } from 'framer-motion'
import { 
  Bookmark,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMyShortlisted } from '../hooks/useMyShortlisted'
import { ROUTES } from '@/shared/constants/routes.constants'

// Components
import { ShortlistedCard } from '../components/applications/ShortlistedCard'

const ShortlistedPage: React.FC = () => {
  const { data: shortlistRes, isLoading } = useMyShortlisted()
  const applications = shortlistRes?.data || []

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Shortlisted Jobs</h1>
        <p className="text-gray-400 mt-2">You're one step closer! These employers want to talk to you.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {applications.map((app, index) => (
            <ShortlistedCard key={app.id} app={app} index={index} />
          ))}
        </AnimatePresence>

        {applications.length === 0 && !isLoading && (
          <div className="md:col-span-2 flex flex-col items-center justify-center py-24 bg-[#0d2e36] border border-teal-900/50 rounded-3xl text-center px-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-6">
              <Bookmark size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase">No shortlisted jobs yet</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Keep applying! When an employer shortlists you, it will appear here for easy tracking.
            </p>
            <Link to={ROUTES.CANDIDATE.APPLIED_JOBS} className="mt-8 px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all">
              Check Applied Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortlistedPage
