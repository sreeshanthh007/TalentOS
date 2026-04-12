export type EmployerProfileModel = {
  id: string
  user_id: string
  company_name: string
  company_domain: string
  company_logo_url: string | null
  company_description: string | null
  industry: string | null
  website: string | null
  phone: string | null
  address: string | null
  verification_status: 'pending' | 'submitted' | 'approved' | 'rejected'
  is_profile_complete: boolean
  created_at: string
  updated_at: string
}

export type JobModel = {
  id: string
  employer_id: string
  category_id: string | null
  title: string
  description: string | null
  requirements: string | null
  location: string | null
  job_type: string
  salary_min: number | null
  salary_max: number | null
  experience_years: number | null
  status: string
  source: string
  views_count: number
  created_at: string
  updated_at: string
}

export type ApplicationModel = {
  id: string
  job_id: string
  candidate_id: string
  status: string
  star_rating: number | null
  employer_notes: string | null
  applied_at: string
  updated_at: string
}

export type EmployerDocumentModel = {
  id: string
  employer_id: string
  document_type: 'pan' | 'incorporation_certificate' | 'other'
  file_url: string
  file_name: string | null
  uploaded_at: string
}

export type SubscriptionPlanModel = {
  id: string
  name: string
  price: number
  job_listing_limit: number
  features: string[]
  created_at: string
}

export type EmployerSubscriptionModel = {
  id: string
  employer_id: string
  plan_id: string
  status: string
  current_period_start: string
  current_period_end: string
  created_at: string
}

