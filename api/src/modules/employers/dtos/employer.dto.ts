export type CreateJobDTO = {
  title: string
  description: string
  requirements: string
  location: string
  job_type: string
  salary_min?: number
  salary_max?: number
  experience_years?: number
  category_id?: string
  status: 'draft' | 'active'
}

export type UpdateJobDTO = Partial<CreateJobDTO>

export type UpdateApplicationStatusDTO = {
  status: string
  star_rating?: number
  employer_notes?: string
}

export type UpdateEmployerProfileDTO = {
  company_name?: string
  company_logo_url?: string
  company_description?: string
  industry?: string
  website?: string
  phone?: string
  address?: string
}

export type UploadDocumentDTO = {
  document_type: 'pan' | 'incorporation_certificate' | 'other'
  file_url: string
  file_name: string
}
