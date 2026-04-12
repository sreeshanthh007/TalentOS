export interface RegisterCandidateDTO {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  skills?: string[];
  resume_url?: string;
}

export interface RegisterEmployerDTO {
  company_name: string;
  email: string;
  password: string;
  company_domain: string;
  industry?: string;
  website?: string;
  phone?: string;
  selected_plan?: 'free' | 'premium' | 'enterprise';
  plan_id?: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
  role: 'candidate' | 'employer' | 'admin';
}

export interface LoginOutputDTO {
  user: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenInputDTO {
  refreshToken: string;
}



export interface TokenResponseDTO {
  accessToken: string;
  role: string;
}
