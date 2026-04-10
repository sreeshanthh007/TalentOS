export type UserRole = 'candidate' | 'employer' | 'admin'

export type BaseUser = {
  id: string
  email: string
  role: UserRole
  is_blocked: boolean
  is_email_verified: boolean
  created_at: string
}

export type CandidateUser = BaseUser & {
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  skills: string[]
  resume_url: string | null
}

export type EmployerUser = BaseUser & {
  company_name: string
  company_domain: string
  company_logo_url: string | null
  company_description: string | null
  industry: string | null
  website: string | null
  phone: string | null
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
