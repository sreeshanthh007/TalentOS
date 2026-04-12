import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  BookOpen, 
  Briefcase, 
  Loader2
} from 'lucide-react'
import { nanoid } from 'nanoid'
import { useCandidateProfile } from '../hooks/useCandidateProfile'
import { useUpdateCandidateProfile } from '../hooks/useUpdateCandidateProfile'
import { uploadAvatarApi } from '../services/candidate.service'
import { type Education, type Experience, type UpdateCandidateProfilePayload, type CandidateUser } from '@/shared/types'
import { toast } from 'sonner'
import { cn } from '@/shared/utils/cn'
import { useAppDispatch } from '@/store/hooks'
import { candidateLogin } from '@/store/slices/candidateSlice'

// Components
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { BasicInfoForm } from '../components/profile/BasicInfoForm'
import { EducationSection } from '../components/profile/EducationSection'
import { ExperienceSection } from '../components/profile/ExperienceSection'

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: User },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'experience', label: 'Experience', icon: Briefcase },
]

const CandidateProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data: profileRes, isLoading: isProfileLoading } = useCandidateProfile()
  const profile = profileRes?.data
  
  const [activeTab, setActiveTab] = useState('basic')
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateCandidateProfile()


  React.useEffect(() => {
    if (profile) {
      dispatch(candidateLogin(profile as CandidateUser))
    }
  }, [profile, dispatch])

  const [education, setEducation] = useState<Education[]>([])
  const [experience, setExperience] = useState<Experience[]>([])

  React.useEffect(() => {
    if (profile) {
      setEducation(profile.education || [])
      setExperience(profile.experience || [])
    }
  }, [profile])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      setIsUploadingAvatar(true)
      const res = await uploadAvatarApi(file)
      console.log("res",res)
      updateProfile({ avatar_url: res.data.avatar_url })
      toast.success('Avatar updated successfully')
    } catch (error) {
      toast.error('Failed to upload avatar')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  // Education Helpers
  const addEducation = (type: 'academic' | 'institution' = 'academic') => {
    setEducation([
      ...education,
      {
        id: nanoid(),
        type,
        institution: '',
        degree: '',
        field_of_study: '',
        start_year: new Date().getFullYear(),
        end_year: null,
        is_current: false,
      }
    ])
  }

  const removeEducation = (id: string) => {
    if (window.confirm('Are you sure you want to remove this education entry?')) {
      setEducation(education.filter(e => e.id !== id))
    }
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  // Experience Helpers
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: nanoid(),
        company: '',
        position: '',
        location: '',
        start_date: '',
        end_date: null,
        is_current: false,
        description: '',
      }
    ])
  }

  const removeExperience = (id: string) => {
    if (window.confirm('Are you sure you want to remove this experience entry?')) {
      setExperience(experience.filter(e => e.id !== id))
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const handleSaveAll = (type: 'education' | 'experience') => {
    const payload: UpdateCandidateProfilePayload = {
      [type]: type === 'education' ? education : experience
    }
    updateProfile(payload)
  }

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-teal-500" size={40} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <ProfileHeader 
        profile={profile} 
        isUploadingAvatar={isUploadingAvatar} 
        onAvatarUpload={handleAvatarUpload} 
      />

      {/* Tabs Navigation */}
      <div className="flex border-b border-teal-900/30 gap-8">
         {tabs.map((tab) => (
           <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-sm font-bold uppercase tracking-widest relative transition-colors",
              activeTab === tab.id ? "text-teal-400" : "text-gray-500 hover:text-gray-300"
            )}
           >
             <div className="flex items-center gap-2">
               <tab.icon size={18} />
               {tab.label}
             </div>
             {activeTab === tab.id && (
               <motion.div 
                layoutId="profile-tab-active" 
                className="absolute bottom-0 left-0 right-0 h-1 bg-teal-400 rounded-t-full" 
               />
             )}
           </button>
         ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'basic' && (
          <BasicInfoForm 
            profile={profile} 
            isUpdating={isUpdating} 
            onSubmit={(values) => updateProfile(values)} 
          />
        )}

        {activeTab === 'education' && (
           <EducationSection 
            education={education}
            addEducation={addEducation}
            removeEducation={removeEducation}
            updateEducation={updateEducation}
            handleSaveAll={handleSaveAll}
            isUpdating={isUpdating}
           />
        )}

        {activeTab === 'experience' && (
           <ExperienceSection 
            experience={experience}
            addExperience={addExperience}
            removeExperience={removeExperience}
            updateExperience={updateExperience}
            handleSaveAll={handleSaveAll}
            isUpdating={isUpdating}
           />
        )}
      </AnimatePresence>
    </div>
  )
}

export default CandidateProfilePage

