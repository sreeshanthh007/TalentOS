import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { type Education } from '@/shared/types';

interface EducationSectionProps {
  education: Education[];
  addEducation: (type?: 'academic' | 'institution') => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, field: keyof Education, value: any) => void;
  handleSaveAll: (type: 'education' | 'experience') => void;
  isUpdating: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  addEducation,
  removeEducation,
  updateEducation,
  handleSaveAll,
  isUpdating
}) => {
  const academicList = education.filter(e => e.type === 'academic' || !e.type);
  const institutionList = education.filter(e => e.type === 'institution');

  const renderEducationForm = (edu: Education) => (
    <motion.div 
      key={edu.id}
      layout
      className="bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-6 relative group"
    >
      <button 
        onClick={() => removeEducation(edu.id)}
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
      >
        <Trash2 size={18} />
      </button>

      <div className="space-y-6 pr-10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-gray-500">Institution</label>
          <input 
            value={edu.institution}
            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
            placeholder="e.g. Stanford University"
            className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
          />
        </div>

        {edu.type !== 'institution' && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-500">Degree</label>
              <input 
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="e.g. Bachelor of Science"
                className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500">Field of Study</label>
                <input 
                  value={edu.field_of_study}
                  onChange={(e) => updateEducation(edu.id, 'field_of_study', e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Start Year</label>
                  <input 
                    type="number"
                    value={edu.start_year}
                    onChange={(e) => updateEducation(edu.id, 'start_year', parseInt(e.target.value))}
                    className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
                  />
                </div>
                {!edu.is_current && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-gray-500">End Year</label>
                    <input 
                      type="number"
                      value={edu.end_year || ''}
                      onChange={(e) => updateEducation(edu.id, 'end_year', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {edu.type === 'institution' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-500">Start Year</label>
              <input 
                type="number"
                value={edu.start_year}
                onChange={(e) => updateEducation(edu.id, 'start_year', parseInt(e.target.value))}
                className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
              />
            </div>
            {!edu.is_current && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500">End Year</label>
                <input 
                  type="number"
                  value={edu.end_year || ''}
                  onChange={(e) => updateEducation(edu.id, 'end_year', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full bg-[#051114] border border-teal-900/30 rounded-xl px-4 py-2.5 focus:border-teal-500 focus:outline-none transition-all text-sm"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12"
    >
      {/* Degrees Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold uppercase tracking-tight text-teal-400">Education & Degrees</h3>
          <button 
            onClick={() => addEducation('academic')}
            className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2 transition-all underline decoration-teal-500/30 underline-offset-4"
          >
            <Plus size={18} /> Add Degree
          </button>
        </div>
        <div className="space-y-4">
          {academicList.map(renderEducationForm)}
          {academicList.length === 0 && (
            <p className="text-gray-500 text-sm italic">No degrees added yet.</p>
          )}
        </div>
      </div>

      {/* Institutions Section */}
      <div className="space-y-6 pt-8 border-t border-teal-900/30">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold uppercase tracking-tight text-teal-400">Institution Affiliations</h3>
          <button 
            onClick={() => addEducation('institution')}
            className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2 transition-all underline decoration-teal-500/30 underline-offset-4"
          >
            <Plus size={18} /> Add Institution
          </button>
        </div>
        <div className="space-y-4">
          {institutionList.map(renderEducationForm)}
          {institutionList.length === 0 && (
            <p className="text-gray-500 text-sm italic">No institutions added yet.</p>
          )}
        </div>
      </div>

      <div className="pt-4 text-right">
        <button 
          onClick={() => handleSaveAll('education')}
          disabled={isUpdating}
          className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-2xl transition-all inline-flex items-center gap-2 shadow-xl shadow-teal-500/10"
        >
          {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save All Changes
        </button>
      </div>
    </motion.div>
  );
};
