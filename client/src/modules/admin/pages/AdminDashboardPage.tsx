import React from 'react'
import { motion } from 'framer-motion'
import { AdminStatCards } from '../components/AdminStatCards'
import { useAdminStats } from '../hooks/useAdminStats'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'
import { QUICK_NAV_ITEMS } from '../constants/admin.constants'
import { ArrowRight } from 'lucide-react'

const AdminDashboardPage: React.FC = () => {
  const { data: res, isLoading } = useAdminStats()
  const stats = res?.data


  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">Admin <span className="text-teal-400">Control</span></h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Platform Overview & Management</p>
      </div>

      <AdminStatCards stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Latest Jobs</h3>
             <Link to={ROUTES.PUBLIC.JOBS} className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight size={14} />
             </Link>
          </div>

          <div className="bg-[#0D4F4F]/20 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-white/5 border-b border-white/5">
                      <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Title</th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Company</th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Date</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {isLoading ? (
                      [...Array(5)].map((_, i) => (
                         <tr key={i} className="animate-pulse">
                            {[...Array(4)].map((_, j) => (
                               <td key={j} className="px-8 py-4"><div className="h-4 bg-white/5 rounded w-full" /></td>
                            ))}
                         </tr>
                      ))
                   ) : stats?.latest_jobs?.length === 0 ? (
                      <tr><td colSpan={4} className="px-8 py-12 text-center text-gray-500 italic">No recent jobs</td></tr>
                   ) : (
                      stats?.latest_jobs?.map((job, idx) => (
                         <motion.tr
                           key={job.id}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.05 }}
                           className="hover:bg-white/5 transition-colors group"
                         >
                            <td className="px-8 py-4">
                               <span className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{job.title}</span>
                            </td>
                            <td className="px-8 py-4">
                               <span className="text-xs text-gray-400">{job.employer?.company_name}</span>
                            </td>
                            <td className="px-8 py-4">
                               <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">{job.status}</span>
                            </td>
                            <td className="px-8 py-4 text-right">
                               <span className="text-xs text-gray-600 font-bold">{format(new Date(job.created_at), 'MMM dd')}</span>
                            </td>
                         </motion.tr>
                      ))
                   )}
                </tbody>
             </table>
          </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Quick Access</h3>
           <div className="grid gap-4">
              {QUICK_NAV_ITEMS.map((nav, idx) => (
                 <Link 
                   key={idx}
                   to={nav.path}
                   className="group p-6 bg-[#0D4F4F]/40 border border-white/5 rounded-[32px] hover:border-teal-500/30 transition-all flex items-center justify-between backdrop-blur-lg"
                 >
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${nav.color} group-hover:scale-110 transition-transform`}>
                          <nav.icon size={24} />
                       </div>
                       <span className="text-sm font-black text-white uppercase italic tracking-tighter">{nav.label}</span>
                    </div>
                    <ArrowRight size={20} className="text-gray-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                 </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
