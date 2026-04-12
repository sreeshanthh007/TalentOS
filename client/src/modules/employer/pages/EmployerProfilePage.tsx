import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ShieldCheck, Camera } from 'lucide-react'
import { useEmployerProfile } from '../hooks/useEmployerProfile'
import { useUpdateEmployerProfile } from '../hooks/useUpdateEmployerProfile'
import { useVerificationDocs } from '../hooks/useVerificationDocs'
import { useUploadVerificationDoc } from '../hooks/useUploadVerificationDoc'
import { useSubmitVerification } from '../hooks/useSubmitVerification'
import { CompanyInfoForm } from '../components/CompanyInfoForm'
import { VerificationCenter } from '../components/VerificationCenter'
import { cn } from '@/shared/utils/cn'
import { uploadEmployerLogoApi } from '../services/employer.service'
import { toast } from 'sonner'
import { useAppDispatch } from '@/store/hooks'
import { employerLogin } from '@/store/slices/employerSlice'

const EmployerProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<'info' | 'verification'>('info')
  const { data: profileRes, refetch } = useEmployerProfile()
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateEmployerProfile()
  const { data: docsRes } = useVerificationDocs()
  const { mutate: uploadDoc } = useUploadVerificationDoc()
  const { mutate: submitVerification, isPending: isSubmitting } = useSubmitVerification()

  const [isUploadingLogo, setIsUploadingLogo] = useState(false)

  const employer = profileRes?.data
  const docs = docsRes?.data || []

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]
     if (!file) return

     try {
       setIsUploadingLogo(true)
       const res = await uploadEmployerLogoApi(file)
       dispatch(employerLogin(res.data))
       toast.success('Logo updated successfully')
       refetch()
     } catch (err: unknown) {
       const message = err instanceof Error ? err.message : 'Logo upload failed'
       toast.error(message)
     } finally {
       setIsUploadingLogo(false)
     }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-8 mb-12">
         <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-[#0D4F4F] border-2 border-teal-500/30 overflow-hidden flex items-center justify-center shadow-2xl relative">
               {employer?.company_logo_url ? (
                  <img src={employer.company_logo_url} className={cn("w-full h-full object-cover", isUploadingLogo && "opacity-50")} alt="Logo" />
               ) : (
                  <Building2 size={40} className="text-teal-400/50" />
               )}
               {isUploadingLogo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                     <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  </div>
               )}
            </div>
            <label className="absolute -bottom-2 -right-2 p-2 bg-teal-500 text-white rounded-xl cursor-pointer hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30">
               <Camera size={16} />
               <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={isUploadingLogo} />
            </label>
         </div>
         <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Company Profile</h1>
            <p className="text-gray-400 mt-1">Manage your corporate identity and verification assets.</p>
         </div>
      </div>

      <div className="flex gap-2 p-1 bg-[#0a2329] rounded-2xl w-fit mb-10 border border-teal-500/10 backdrop-blur-md">
         {[
           { id: 'info', label: 'Company Info', icon: Building2 },
           { id: 'verification', label: 'Verification Center', icon: ShieldCheck }
         ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'info' | 'verification')}
              className={cn(
                "relative px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all",
                activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-teal-400"
              )}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="profile-tab" className="absolute inset-0 bg-teal-500 rounded-xl shadow-lg shadow-teal-500/20" />
              )}
              <tab.icon size={16} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
         ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'info' ? (
          <CompanyInfoForm 
            employer={employer} 
            onSubmit={(values) => updateProfile(values)} 
            isUpdating={isUpdating} 
          />
        ) : (
          <VerificationCenter 
            employer={employer} 
            docs={docs} 
            onUploadDoc={(data) => uploadDoc(data)}
            onSubmitVerification={() => submitVerification()}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EmployerProfilePage
