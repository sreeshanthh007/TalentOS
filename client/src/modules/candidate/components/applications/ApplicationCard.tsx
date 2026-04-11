import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import { cn } from '@/shared/utils/cn';
import { type Application } from '@/shared/types';

interface ApplicationCardProps {
  app: Application;
  index: number;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ app, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-black/20 hover:border-teal-700/50 transition-all group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-teal-900/20 rounded-2xl flex items-center justify-center text-2xl font-bold text-teal-400 overflow-hidden border border-teal-900/30">
            {app.job?.employer?.company_logo_url ? (
              <img src={app.job.employer.company_logo_url} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              app.job?.employer?.company_name?.[0]
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold group-hover:text-teal-400 transition-colors uppercase">{app.job?.title}</h3>
            <p className="font-medium text-gray-300">{app.job?.employer?.company_name}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-1">
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {app.job?.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={16} /> {new Date(app.applied_at).toLocaleDateString()}</span>
              {app.star_rating && (
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < app.star_rating! ? "currentColor" : "none"} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-end gap-3 border-t md:border-none border-white/5 pt-4 md:pt-0">
          <span className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
            app.status === 'applied' && "bg-gray-500/20 text-gray-400",
            app.status === 'shortlisted' && "bg-teal-500/20 text-teal-300",
            app.status === 'interviewing' && "bg-blue-500/20 text-blue-400",
            app.status === 'offered' && "bg-mint/10 text-mint",
            app.status === 'hired' && "bg-teal-500 text-slate-900",
            app.status === 'rejected' && "bg-coral/20 text-coral"
          )}>
            {app.status}
          </span>
          
          <Link 
            to={ROUTES.PUBLIC.JOB_DETAIL.replace(':id', app.job_id)}
            className="flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            View Job <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
