export interface UserModel {
  id: string;
  email: string;
  password_hash: string;
  role: 'candidate' | 'employer' | 'admin';
  is_blocked: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface EducationModel {
  id: string
  type: 'academic' | 'institution'
  institution: string
  degree: string
  field_of_study: string
  start_year: number
  end_year: number | null
  is_current: boolean
}

export interface ExperienceModel {
  id: string
  company: string
  position: string
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
}

export interface CandidateProfileData {
  id?: string;
  user_id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  skills?: string[];
  resume_url?: string;
  education?: EducationModel[];
  experience?: ExperienceModel[];
}

export interface EmployerProfileData {
  user_id: string;
  company_name: string;
  company_domain: string;
  industry?: string;
  website?: string;
  phone?: string;
}

export interface ApplicationModel {
  id: string
  job_id: string
  candidate_id: string
  status: 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  star_rating: number | null
  employer_notes: string | null
  applied_at: string
  updated_at: string
}

export interface CreateUserData {
  email: string;
  password_hash: string;
  role: 'candidate' | 'employer' | 'admin';
}
