import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes.constants';
import { cn } from '@/shared/utils/cn';
import { type Application } from '@/shared/types';

interface RecentApplicationsProps {
  applications: Application[];
}

export const RecentApplications: React.FC<RecentApplicationsProps> = ({ applications }) => {
  return (
    <div className="lg:col-span-2 bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Applications</h3>
        <Link to={ROUTES.CANDIDATE.APPLIED_JOBS} className="text-teal-400 hover:underline text-sm flex items-center gap-1 group">
          View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-4">
        {applications.slice(0, 6).map((app) => (
          <motion.div 
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-900/20 rounded-lg flex items-center justify-center text-teal-400 font-bold overflow-hidden">
                {app.job?.employer?.company_logo_url ? (
                  <img src={app.job.employer.company_logo_url} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  app.job?.employer?.company_name?.[0] || 'J'
                )}
              </div>
              <div>
                <h4 className="font-medium group-hover:text-teal-300 transition-colors uppercase">{app.job?.title}</h4>
                <p className="text-sm text-gray-400 truncate w-32 md:w-auto">{app.job?.employer?.company_name}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                app.status === 'applied' && "bg-gray-500/20 text-gray-400",
                app.status === 'shortlisted' && "bg-teal-500/20 text-teal-300",
                app.status === 'interviewing' && "bg-blue-500/20 text-blue-400",
                app.status === 'offered' && "bg-mint/20 text-mint",
                app.status === 'hired' && "bg-teal-500 text-slate-900",
                app.status === 'rejected' && "bg-coral/20 text-coral"
              )}>
                {app.status}
              </span>
              <p className="text-[10px] text-gray-500 mt-2">
                {new Date(app.applied_at).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
        
        {applications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No applications yet</p>
            <Link to={ROUTES.PUBLIC.JOBS} className="text-teal-400 hover:underline mt-2 inline-block">
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
