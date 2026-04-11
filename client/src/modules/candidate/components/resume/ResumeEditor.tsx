import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Loader2, Save, Download, Plus, Trash2 } from 'lucide-react';

interface ResumeData {
  summary: string;
  skills_section: string;
  experience_bullets: string[];
}

interface ResumeEditorProps {
  resumeData: ResumeData | null;
  isGenerating: boolean;
  isSaving: boolean;
  onSave: () => void;
  onUpdateResumeData: (data: ResumeData) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeData,
  isGenerating,
  isSaving,
  onSave,
  onUpdateResumeData
}) => {
  const updateBullet = (idx: number, val: string) => {
    if (!resumeData) return;
    const newBullets = [...resumeData.experience_bullets];
    newBullets[idx] = val;
    onUpdateResumeData({ ...resumeData, experience_bullets: newBullets });
  };

  const removeBullet = (idx: number) => {
    if (!resumeData) return;
    const newBullets = resumeData.experience_bullets.filter((_, i) => i !== idx);
    onUpdateResumeData({ ...resumeData, experience_bullets: newBullets });
  };

  const addBullet = () => {
    if (!resumeData) return;
    onUpdateResumeData({ 
      ...resumeData, 
      experience_bullets: [...resumeData.experience_bullets, ''] 
    });
  };

  return (
    <motion.div 
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="lg:col-span-3 space-y-6"
    >
      <AnimatePresence mode="wait">
        {!resumeData && !isGenerating ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[600px] border-2 border-dashed border-teal-900/30 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="space-y-6 max-w-sm">
               <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-500 mx-auto">
                 <FileUp size={40} />
               </div>
               <h3 className="text-xl font-bold uppercase">Ready to Start?</h3>
               <p className="text-gray-500">
                 Enter your target job title on the left and our AI will analyze your profile to create a tailored summary and skills section.
               </p>
            </div>
          </motion.div>
        ) : isGenerating ? (
          <motion.div 
            key="loading"
            className="h-[600px] bg-[#0d2e36] border border-teal-900/50 rounded-3xl p-8 space-y-8 overflow-hidden"
          >
            <div className="space-y-3">
              <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse" />
              <div className="h-24 w-full bg-white/5 rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse" />
              <div className="h-32 w-full bg-white/5 rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-slate-900 rounded-3xl shadow-2xl p-10 space-y-10 min-h-[600px]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold font-serif">Tailored Content</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onSave}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Update Profile
                </button>
                <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Professional Summary</h3>
                <textarea 
                  value={resumeData?.summary}
                  onChange={(e) => onUpdateResumeData({...resumeData!, summary: e.target.value})}
                  className="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all text-gray-700 leading-relaxed"
                />
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Tailored Skills</h3>
                <textarea 
                  value={resumeData?.skills_section}
                  onChange={(e) => onUpdateResumeData({...resumeData!, skills_section: e.target.value})}
                  className="w-full h-24 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all text-gray-700 font-mono text-sm"
                />
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Experience Highlights</h3>
                   <button 
                    onClick={addBullet}
                    className="p-1 hover:bg-teal-50 rounded-full text-teal-600 transition-colors"
                   >
                     <Plus size={20} />
                   </button>
                </div>
                <div className="space-y-3">
                  {resumeData?.experience_bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-3 group">
                      <input 
                        value={bullet}
                        onChange={(e) => updateBullet(i, e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:border-teal-500 focus:bg-white focus:outline-none transition-all text-sm"
                      />
                      <button 
                        onClick={() => removeBullet(i)}
                        className="p-3 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
