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

export interface CandidateProfileData {
  user_id: string;
  full_name?: string;
  phone?: string;
  location?: string;
  skills?: string[];
}

export interface EmployerProfileData {
  user_id: string;
  company_name: string;
  company_domain: string;
  industry?: string;
  website?: string;
  phone?: string;
}

export interface CreateUserData {
  email: string;
  password_hash: string;
  role: 'candidate' | 'employer' | 'admin';
}
