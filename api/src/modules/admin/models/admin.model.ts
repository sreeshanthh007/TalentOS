import { JobModel, EmployerDocumentModel } from '@modules/employers/models/employer.model'

export type AdminStatsModel = {
  total_employers: number
  total_candidates: number
  total_jobs: number
  latest_jobs: JobModel[]
}

export type AdminEmployerModel = {
  id: string
  user_id: string
  email: string
  company_name: string
  company_domain: string
  industry: string | null
  website: string | null
  phone: string | null
  verification_status: string
  is_blocked: boolean
  created_at: string
  documents: EmployerDocumentModel[]
  subscription: { plan_name: string; status: string } | null
}

export type AdminCandidateModel = {
  id: string
  user_id: string
  email: string
  full_name: string | null
  phone: string | null
  location: string | null
  skills: string[]
  resume_url: string | null
  is_blocked: boolean
  created_at: string
  average_rating: number
}

export type MessageModel = {
  id: string
  inquiry_id: string
  sender_role: 'admin' | 'employer'
  sender_id: string
  content: string
  is_read: boolean
  sent_at: string
}

export type InquiryModel = {
  id: string
  employer_id: string
  plan_id: string | null
  subject: string
  initial_message: string
  status: string
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
}

export type TestimonialModel = {
  id: string
  author_name: string
  author_role: string | null
  avatar_url: string | null
  content: string
  rating: number
  is_active: boolean
  created_at: string
  updated_at: string
}
