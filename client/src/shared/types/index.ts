export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
}

export interface Candidate {
  id: string;
  userId: string;
  fullName: string;
  resumeUrl?: string;
}

export interface Employer {
  id: string;
  userId: string;
  companyName: string;
  logoUrl?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
}
