import React from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { skillsList } from '@/modules/auth/constants/auth.constants';
import { cn } from '@/shared/utils/cn';
import { type CandidateUser } from '@/shared/types';

interface BasicInfoFormProps {
  profile?: CandidateUser;
  isUpdating: boolean;
  onSubmit: (values: any) => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ 
  profile, 
  isUpdating, 
  onSubmit 
}) => {
  const formik = useFormik({
    initialValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      skills: profile?.skills || [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-8 space-y-8"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Full Name</label>
            <input 
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              className="w-full bg-[#051114] border border-teal-900/50 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Phone Number</label>
            <input 
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full bg-[#051114] border border-teal-900/50 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-400">Location</label>
            <input 
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              placeholder="e.g. New York, USA"
              className="w-full bg-[#051114] border border-teal-900/50 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-400">Professional Bio</label>
            <textarea 
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              className="w-full h-32 bg-[#051114] border border-teal-900/50 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all resize-none" 
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Skills</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skillsList.map((skill) => {
              const isSelected = formik.values.skills.includes(skill);
              return (
                <label 
                  key={skill}
                  className={cn(
                    "flex items-center justify-center py-2.5 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer uppercase tracking-tight",
                    isSelected 
                      ? "bg-teal-500/20 border-teal-500 text-teal-300" 
                      : "bg-[#051114] border-teal-900/30 text-gray-500 hover:border-teal-700"
                  )}
                >
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => {
                      const nextSkills = isSelected 
                        ? formik.values.skills.filter(s => s !== skill)
                        : [...formik.values.skills, skill];
                      formik.setFieldValue('skills', nextSkills);
                    }}
                  />
                  {skill}
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-8 text-right">
          <button 
            type="submit"
            disabled={isUpdating}
            className="px-10 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all inline-flex items-center gap-2 shadow-xl shadow-teal-500/10"
          >
            {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Profile
          </button>
        </div>
      </form>
    </motion.div>
  );
};
