import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { type Experience } from '@/shared/types';

interface ExperienceSectionProps {
  experience: Experience[];
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, field: keyof Experience, value: any) => void;
  handleSaveAll: (type: 'education' | 'experience') => void;
  isUpdating: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  addExperience,
  removeExperience,
  updateExperience,
  handleSaveAll,
  isUpdating
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold uppercase tracking-tight">Work Experience</h3>
        <button 
          onClick={addExperience}
          className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
        >
          <Plus size={18} /> Add Position
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp) => (
          <motion.div 
            key={exp.id}
            layout
            className="bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-8 relative"
          >
            <button 
              onClick={() => removeExperience(exp.id)}
              className="absolute top-6 right-6 p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <Trash2 size={20} />
            </button>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Company Name</label>
                  <input 
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Position/Role</label>
                  <input 
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Start Date (YYYY-MM)</label>
                  <input 
                    value={exp.start_date}
                    onChange={(e) => updateExperience(exp.id, 'start_date', e.target.value)}
                    placeholder="2022-01"
                    className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">End Date (or 'Present')</label>
                  <input 
                    value={exp.end_date || ''}
                    onChange={(e) => updateExperience(exp.id, 'end_date', e.target.value)}
                    placeholder="2023-12"
                    className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Description & Key Achievements</label>
                <textarea 
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="w-full h-32 bg-[#051114] border border-teal-900/30 rounded-2xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 text-right">
        <button 
          onClick={() => handleSaveAll('experience')}
          disabled={isUpdating}
          className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all inline-flex items-center gap-2"
        >
          {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Experience
        </button>
      </div>
    </motion.div>
  );
};
