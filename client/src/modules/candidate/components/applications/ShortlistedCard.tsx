import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import { type Application } from '@/shared/types';

interface ShortlistedCardProps {
  app: Application;
  index: number;
}

export const ShortlistedCard: React.FC<ShortlistedCardProps> = ({ app, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4">
        <div className="p-2 bg-teal-500/10 text-teal-400 rounded-full">
          <Bookmark size={20} fill="currentColor" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-teal-900/20 rounded-2xl flex items-center justify-center text-xl font-bold text-teal-400 border border-teal-900/30">
            {app.job?.employer?.company_logo_url ? (
              <img src={app.job.employer.company_logo_url} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              app.job?.employer?.company_name?.[0]
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold group-hover:text-teal-400 transition-colors uppercase">{app.job?.title}</h3>
            <p className="text-sm text-gray-400">{app.job?.employer?.company_name}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-gray-400 border-t border-white/5 pt-6">
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-teal-500" /> {app.job?.location}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-teal-500" /> Listed {new Date(app.job?.created_at || '').toLocaleDateString()}</span>
        </div>

        <Link 
          to={ROUTES.PUBLIC.JOB_DETAIL.replace(':id', app.job_id)}
          className="w-full py-3 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          View Full Details <ExternalLink size={16} />
        </Link>
      </div>
    </motion.div>
  );
};
