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
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
}

export type UpdateProfileDTO = {
  full_name?: string
  phone?: string
  bio?: string
  location?: string
  skills?: string[]
  avatar_url?: string
  education?: Education[]
  experience?: Experience[]
}

export type ApplyJobDTO = {
  job_id: string
  resume_url: string
}

export type GenerateResumeDTO = {
  target_job_title: string
}

export type ResumeBuilderOutput = {
  summary: string
  skills_section: string
  experience_bullets: string[]
}
