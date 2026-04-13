import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquare, Calendar, ChevronRight } from 'lucide-react'
import { useMyInquiries } from '../hooks/useMyInquiries'
import { format } from 'date-fns'
import { ROUTES } from '@/shared/constants/routes.constants'
import { cn } from '@/shared/utils/cn'

const EmployerInquiriesPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: res, isLoading } = useMyInquiries()
  const inquiries = res?.data || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-teal-400 bg-teal-500/10 border-teal-500/20'
      case 'in_progress': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      case 'open': return 'text-coral-400 bg-orange-500/10 border-orange-500/20'
      default: return 'text-gray-400 bg-white/5 border-white/10'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Support <span className="text-teal-400">Tickets</span></h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Manage your inquiries with our sales team</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-3xl animate-pulse" />
          ))
        ) : inquiries.length === 0 ? (
          <div className="bg-[#0D4F4F]/20 border border-white/5 rounded-[40px] p-20 flex flex-col items-center justify-center text-center backdrop-blur-xl">
            <div className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center mb-6">
              <MessageSquare size={40} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">No Inquiries Found</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-xs mb-8 uppercase font-bold tracking-widest leading-relaxed">
              Interested in upgrading your plan? Contact our sales team.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={ROUTES.PUBLIC.EMPLOYERS}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-black px-8 py-4 rounded-3xl inline-flex items-center gap-3 shadow-2xl shadow-teal-500/20 uppercase italic tracking-tighter"
              >
                View Pricing & Contact Sales
                <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>
        ) : (
          inquiries.map((inq, idx) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(ROUTES.EMPLOYER.CHAT.replace(':id', inq.id))}
              className="group p-6 bg-[#0D4F4F]/30 border border-white/5 rounded-[32px] hover:border-teal-500/40 transition-all cursor-pointer backdrop-blur-lg flex items-center justify-between shadow-xl shadow-black/10"
            >
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-teal-500 transition-all">
                     <MessageSquare size={24} className="text-gray-500 group-hover:text-white" />
                  </div>
                  <div>
                     <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">{inq.subject}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                          getStatusColor(inq.status)
                        )}>
                           {inq.status}
                        </span>
                     </div>
                     <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                           <Calendar size={12} />
                           {format(new Date(inq.created_at), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-teal-400 text-[10px] font-black uppercase tracking-widest">
                           {inq.plan?.display_name || 'Generic Inquiry'}
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  {inq.unread_count && inq.unread_count > 0 && (
                     <span className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-teal-500/40 animate-bounce">
                        {inq.unread_count}
                     </span>
                  )}
                  <ChevronRight size={24} className="text-gray-700 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
               </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default EmployerInquiriesPage
