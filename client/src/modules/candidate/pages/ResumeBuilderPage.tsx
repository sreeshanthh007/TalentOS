import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useCandidateProfile } from '../hooks/useCandidateProfile'
import { useGenerateResume } from '../hooks/useGenerateResume'
import { useUpdateCandidateProfile } from '../hooks/useUpdateCandidateProfile'
import { toast } from 'sonner'

import { ResumeBuilderControls } from '../components/resume/ResumeBuilderControls'
import { ResumeEditor } from '../components/resume/ResumeEditor'

const ResumeBuilderPage: React.FC = () => {
  const { data: profileRes } = useCandidateProfile()
  const profile = profileRes?.data

  const [targetJob, setTargetJob] = useState('')
  const [resumeData, setResumeData] = useState<{
    summary: string
    skills_section: string
    experience_bullets: string[]
  } | null>(null)

  const { mutate: generate, isPending: isGenerating } = useGenerateResume()
  const { mutate: updateProfile, isPending: isSaving } = useUpdateCandidateProfile()

  const handleGenerate = () => {
    if (!targetJob) {
      toast.error('Please enter a target job title')
      return
    }
    generate({ target_job_title: targetJob }, {
      onSuccess: (res) => {
        setResumeData(res.data)
      }
    })
  }

  const handleSave = () => {
    if (!resumeData) return
    updateProfile({
      bio: resumeData.summary,
      skills: resumeData.skills_section.split(',').map(s => s.trim())
    })
  }

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          AI Resume Builder <Sparkles className="text-coral" />
        </h1>
        <p className="text-gray-400 mt-2">Tailor your profile summary and skills for specific roles using Gemini AI.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ResumeBuilderControls 
          targetJob={targetJob}
          setTargetJob={setTargetJob}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          profile={profile}
          onUpdateProfile={(payload) => updateProfile(payload)}
        />

        <ResumeEditor 
          resumeData={resumeData}
          isGenerating={isGenerating}
          isSaving={isSaving}
          onSave={handleSave}
          onUpdateResumeData={setResumeData}
        />
      </div>
    </div>
  )
}

export default ResumeBuilderPage
