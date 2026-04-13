export type UserRole = 'candidate' | 'employer' | 'admin'

export type BaseUser = {
  id: string
  email: string
  role: UserRole
  is_blocked: boolean
  is_email_verified: boolean
  created_at: string
}

export type Education = {
  id: string
  type: 'academic' | 'institution'
  institution: string
  degree: string
  field_of_study: string
  start_year: number
  end_year: number | null
  is_current: boolean
}

export type Experience = {
  id: string
  company: string
  position: string
  location: string | null
  start_date: string    // 'YYYY-MM'
  end_date: string | null
  is_current: boolean
  description: string | null
}

export type Application = {
  id: string
  job_id: string
  candidate_id: string
  status: 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  star_rating: number | null
  employer_notes: string | null
  applied_at: string
  updated_at: string
  job?: Job   // joined
}

export type ProfileCompletionResult = {
  percentage: number
  missing: string[]
}

export type ResumeBuilderInput = {
  target_job_title: string
}

export type ResumeBuilderOutput = {
  summary: string
  skills_section: string
  experience_bullets: string[]
}

export type UpdateCandidateProfilePayload = {
  full_name?: string
  phone?: string
  bio?: string
  location?: string
  skills?: string[]
  avatar_url?: string
  education?: Education[]
  experience?: Experience[]
}

export type CandidateUser = BaseUser & {
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  skills: string[]
  resume_url: string | null
  education: Education[]
  experience: Experience[]
}

export type EmployerUser = BaseUser & {
  company_name: string
  company_domain: string
  company_logo_url: string | null
  company_description: string | null
  industry: string | null
  website: string | null
  phone: string | null
  address: string | null
  verification_status: 'pending' | 'submitted' | 'approved' | 'rejected'
}

export type AdminUser = BaseUser

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type AuthResponseData = {
  user: CandidateUser | EmployerUser | AdminUser
}

export type LoginValues = {
  email: string
  password: string
  role: UserRole
}

export type CandidateRegisterValues = {
  full_name: string
  email: string
  password: string
  phone: string
  skills: string[]
  location: string
  resume_url: string
}

export type EmployerRegisterValues = {
  company_name: string
  email: string
  password: string
  company_domain: string
  industry: string
  website: string
  phone: string
  selected_plan: 'free' | 'premium' | 'enterprise'
  plan_id?: string
}

export type SessionData = {
  role: UserRole
}

export type Job = {
  id: string
  employer_id: string
  category_id: string | null
  title: string
  description: string | null
  requirements: string | null
  location: string | null
  job_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote' | 'hybrid'
  salary_min: number | null
  salary_max: number | null
  experience_years: number | null
  status: 'draft' | 'active' | 'closed' | 'expired'
  source: string
  views_count: number
  applications_count?: number
  created_at: string
  updated_at: string
  employer?: {
    company_name: string
    company_logo_url: string | null
    industry: string | null
  }
  category?: {
    name: string
    icon: string
  }
}

export type EmployerStats = {
  active_jobs: number
  total_applications: number
  shortlisted_candidates: number
  hired_candidates: number
}

export type Applicant = {
  id: string           // application id
  job_id: string
  candidate_id: string
  status: 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  star_rating: number | null
  employer_notes: string | null
  applied_at: string
  updated_at: string
  resume_url: string | null
  candidate: {
    id: string
    full_name: string | null
    email: string
    phone: string | null
    avatar_url: string | null
    location: string | null
    skills: string[]
    resume_url: string | null
  }
}

export type EmployerDocument = {
  id: string
  employer_id: string
  document_type: 'pan' | 'incorporation_certificate' | 'other'
  file_url: string
  file_name: string | null
  uploaded_at: string
}

export type EmployerSubscription = {
  id: string
  employer_id: string
  status: 'active' | 'expired' | 'cancelled'
  started_at: string
  expires_at: string | null
  plan: {
    id: string
    name: string
    display_name: string
    price_monthly: number
    job_listing_limit: number
    features: string[]
  }
}

export type CreateJobPayload = {
  title: string
  description: string
  requirements: string
  location: string
  job_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote' | 'hybrid'
  salary_min: number | null
  salary_max: number | null
  experience_years: number | null
  category_id: string | null
  status: 'draft' | 'active'
}

export type UpdateJobPayload = Partial<CreateJobPayload>

export type UpdateApplicationStatusPayload = {
  status: 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  star_rating?: number
  employer_notes?: string
}

export type UploadDocumentPayload = {
  document_type: 'pan' | 'incorporation_certificate' | 'other'
  file_url: string
  file_name: string
}


export type JobCategory = {
  id: string
  name: string
  icon: string
  job_count?: number
}

export type Testimonial = {
  id: string
  author_name: string
  author_role: string | null
  avatar_url: string | null
  content: string
  rating: number
  is_active: boolean
}

export type CreateTestimonialPayload = {
  author_name: string
  author_role?: string
  content: string
  rating: number
  is_active?: boolean
  avatar_url?: string
}

export type JobFilters = {
  search: string
  job_type: string
  category_id: string
  source: string
  page: number
  limit: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ContactInquiryPayload = {
  company_name: string
  email: string
  phone: string
  message: string
  plan_interested: 'free' | 'premium' | 'enterprise'
}

export type AdminStats = {
  total_employers: number
  total_candidates: number
  total_jobs: number
  latest_jobs: Job[]
}

export type AdminEmployer = {
  id: string
  user_id: string
  email: string
  company_name: string
  company_domain: string
  industry: string | null
  website: string | null
  phone: string | null
  verification_status: 'pending' | 'submitted' | 'approved' | 'rejected'
  is_blocked: boolean
  is_profile_complete: boolean
  created_at: string
  subscription?: {
    plan_name: string
    status: string
  }
  documents?: EmployerDocument[]
}

export type AdminCandidate = {
  id: string
  user_id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  location: string | null
  skills: string[]
  resume_url: string | null
  is_blocked: boolean
  created_at: string
  average_rating?: number
}

export type SubscriptionPlan = {
  id: string
  name: 'free' | 'premium' | 'enterprise'
  display_name: string
  price_monthly: number
  job_listing_limit: number
  features: string[]
  is_active: boolean
}

export type UpdatePlanPayload = {
  price_monthly?: number
  features?: string[]
  display_name?: string
}

export type Inquiry = {
  id: string
  employer_id: string
  plan_id: string | null
  subject: string
  initial_message: string
  status: 'open' | 'in_progress' | 'resolved'
  created_at: string
  updated_at: string
  employer?: {
    company_name: string
    email: string
    industry: string | null
  }
  plan?: {
    display_name: string
  }
  unread_count?: number
}

export type Message = {
  id: string
  inquiry_id: string
  sender_role: 'admin' | 'employer'
  sender_id: string
  content: string
  is_read: boolean
  sent_at: string
}

export type SendMessagePayload = {
  inquiry_id: string
  content: string
}

