export type UserRole = 'candidate' | 'employer' | 'admin';

export interface Session {
  role: UserRole;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface CandidateUser {
  id: string;
  email: string;
  role: 'candidate';
  full_name: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  skills: string[];
  resume_url: string | null;
}

export interface EmployerUser {
  id: string;
  email: string;
  role: 'employer';
  company_name: string;
  company_domain: string;
  company_logo_url: string | null;
  verification_status: 'pending' | 'submitted' | 'approved' | 'rejected';
  is_profile_complete: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface CandidateRegisterValues {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  skills: string[];
  location: string;
}

export interface EmployerRegisterValues {
  company_name: string;
  email: string;
  password: string;
  company_domain: string;
  industry: string;
  website: string;
  phone: string;
  selected_plan: 'free' | 'premium' | 'enterprise';
}

export interface LoginValues {
  email: string;
  password: string;
  role: UserRole;
}
