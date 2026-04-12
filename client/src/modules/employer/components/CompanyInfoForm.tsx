import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useFormik } from 'formik'
import { employerProfileSchema } from '@/shared/validators/employer.validators'
import type { EmployerUser } from '@/shared/types'

interface CompanyInfoFormProps {
  employer?: EmployerUser | null
  onSubmit: (values: any) => void
  isUpdating: boolean
}

export const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ employer, onSubmit, isUpdating }) => {
  const formik = useFormik({
    initialValues: {
      company_name: employer?.company_name || '',
      industry: employer?.industry || '',
      website: employer?.website || '',
      phone: employer?.phone || '',
      company_description: employer?.company_description || '',
      address: employer?.address || '',
      company_logo_url: employer?.company_logo_url || ''
    },
    enableReinitialize: true,
    validationSchema: employerProfileSchema,
    onSubmit
  })

  return (
    <motion.form
      key="info"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      onSubmit={formik.handleSubmit}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
              <Building2 size={12} /> Company Name
            </label>
            <input
              {...formik.getFieldProps('company_name')}
              className="w-full bg-[#0D4F4F]/20 border border-teal-800/30 rounded-2xl px-5 py-4 text-white focus:border-teal-500 transition-all outline-none"
            />
            {formik.touched.company_name && formik.errors.company_name && (
              <p className="text-red-400 text-[10px] mt-1 italic">{formik.errors.company_name as string}</p>
            )}
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
              <ArrowRight size={12} /> Industry
            </label>
            <select
              {...formik.getFieldProps('industry')}
              className="w-full bg-[#0D4F4F]/20 border border-teal-800/30 rounded-2xl px-5 py-4 text-white focus:border-teal-500 transition-all outline-none"
            >
              <option value="">Select Industry</option>
              {['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Engineering', 'Legal', 'Operations', 'Other'].map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            {formik.touched.industry && formik.errors.industry && (
              <p className="text-red-400 text-[10px] mt-1 italic">{formik.errors.industry as string}</p>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
              <Globe size={12} /> Website URL
            </label>
            <input
              {...formik.getFieldProps('website')}
              className="w-full bg-[#0D4F4F]/20 border border-teal-800/30 rounded-2xl px-5 py-4 text-white focus:border-teal-500 transition-all outline-none"
              placeholder="https://company.com"
            />
            {formik.touched.website && formik.errors.website && (
              <p className="text-red-400 text-[10px] mt-1 italic">{formik.errors.website as string}</p>
            )}
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
              <Phone size={12} /> Phone Number
            </label>
            <input
              {...formik.getFieldProps('phone')}
              className="w-full bg-[#0D4F4F]/20 border border-teal-800/30 rounded-2xl px-5 py-4 text-white focus:border-teal-500 transition-all outline-none"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-400 text-[10px] mt-1 italic">{formik.errors.phone as string}</p>
            )}
         </div>
      </div>

      <div className="space-y-2">
         <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
           About Your Company
         </label>
         <textarea
           {...formik.getFieldProps('company_description')}
           rows={5}
           className="w-full bg-[#0D4F4F]/20 border border-teal-800/30 rounded-2xl px-5 py-4 text-white focus:border-teal-500 transition-all outline-none resize-none"
           placeholder="Describe your company culture, mission and what you do..."
         />
         {formik.touched.company_description && formik.errors.company_description && (
           <p className="text-red-400 text-[10px] mt-1 italic">{formik.errors.company_description as string}</p>
         )}
      </div>

      <div className="space-y-2">
         <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
           <MapPin size={12} /> Headquarter Address
         </label>
         <input
           {...formik.getFieldProps('address')}
           className="w-full bg-[#0D4F4F]/20 border border-teal-800/30 rounded-2xl px-5 py-4 text-white focus:border-teal-500 transition-all outline-none"
         />
         {formik.touched.address && formik.errors.address && (
           <p className="text-red-400 text-[10px] mt-1 italic">{formik.errors.address as string}</p>
         )}
      </div>

      <button
         type="submit"
         disabled={isUpdating}
         className="px-10 py-4 bg-teal-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 disabled:opacity-50"
      >
         {isUpdating ? 'Saving Changes...' : 'Save Profile'}
      </button>
    </motion.form>
  )
}
