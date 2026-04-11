import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import { ResumeUploadStep } from '@/modules/auth/components/candidate/ResumeUploadStep';
import { type CandidateUser } from '@/shared/types';

interface ResumeBuilderControlsProps {
  targetJob: string;
  setTargetJob: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  profile?: CandidateUser;
  onUpdateProfile: (payload: any) => void;
}

export const ResumeBuilderControls: React.FC<ResumeBuilderControlsProps> = ({
  targetJob,
  setTargetJob,
  onGenerate,
  isGenerating,
  profile,
  onUpdateProfile
}) => {
  return (
    <motion.div 
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="lg:col-span-2 space-y-6"
    >
      <div className="bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-6 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-300 block">Target Job Title</label>
          <input 
            type="text"
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full bg-[#051114] border border-teal-900/50 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all"
          />
          <button
            onClick={onGenerate}
            disabled={isGenerating || !targetJob}
            className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-gray-700 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all relative overflow-hidden"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                AI is crafting your resume...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate with AI
              </>
            )}
            {isGenerating && (
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-white/20 skew-x-12"
              />
            )}
          </button>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-teal-500">Your profile data used:</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck size={16} className="text-teal-400" />
              <span>Skills: {profile?.skills.length || 0} items</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck size={16} className="text-teal-400" />
              <span>Experience: {profile?.experience.length || 0} entries</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck size={16} className="text-teal-400" />
              <span>Education: {profile?.education.length || 0} entry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Resume Section */}
      <div className="bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-6">
         <h3 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
           <FileText size={20} className="text-teal-400" /> Current Resume
         </h3>
         {profile?.resume_url ? (
           <div className="space-y-4">
             <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <FileText size={24} className="text-teal-400" />
                 <span className="text-sm font-medium">Professional_Resume.pdf</span>
               </div>
               <a 
                href={profile.resume_url} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 hover:bg-teal-500/20 rounded-lg text-teal-400 transition-colors"
               >
                 <ExternalLink size={18} />
               </a>
             </div>
             <div className="pt-4 border-t border-white/5">
               <p className="text-xs text-gray-500 mb-4 uppercase font-bold">Replace Resume File</p>
               <ResumeUploadStep 
                resumeUrl={profile.resume_url}
                onUploadComplete={(url) => onUpdateProfile({ ...profile, resume_url: url })}
               />
             </div>
           </div>
         ) : (
           <div className="space-y-4">
             <p className="text-sm text-gray-400">No resume uploaded yet. Upload one to help AI tailor your profile.</p>
             <ResumeUploadStep 
              resumeUrl=""
              onUploadComplete={(url) => onUpdateProfile({ ...profile, resume_url: url })}
             />
           </div>
         )}
      </div>
    </motion.div>
  );
};
