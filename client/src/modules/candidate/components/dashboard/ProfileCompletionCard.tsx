import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes.constants';

interface ProfileCompletionCardProps {
  completion: {
    percentage: number;
    missing: string[];
  };
}

export const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ completion }) => {
  return (
    <div className="lg:col-span-1 bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6 flex flex-col items-center text-center">
      <h3 className="text-lg font-semibold mb-6">Profile Completion</h3>
      
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80" cy="80" r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-teal-900/20"
          />
          <motion.circle
            cx="80" cy="80" r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="440"
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * completion.percentage) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-teal-400"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
          {completion.percentage}%
        </div>
      </div>

      <div className="mt-6 w-full space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {completion.missing.slice(0, 3).map((item, i) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
              {item}
            </span>
          ))}
          {completion.missing.length > 3 && (
            <span className="text-xs text-teal-500">+{completion.missing.length - 3} more</span>
          )}
        </div>
        <Link 
          to={ROUTES.CANDIDATE.PROFILE}
          className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 group transition-all"
        >
          Complete Profile
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
