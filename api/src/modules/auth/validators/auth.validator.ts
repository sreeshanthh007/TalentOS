import { z } from 'zod';

const BLOCKED_DOMAINS = [
  'gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol', 'protonmail', 'ymail', 'live', 'msn', 'me'
];

export const validateCompanyDomain = (email: string): boolean => {
  const domainPart = email.split('@')[1];
  if (!domainPart) return false;
  
  const domain = domainPart.split('.')[0].toLowerCase();
  return !BLOCKED_DOMAINS.includes(domain);
};

export const registerCandidateSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  resume_url: z.string().optional()
});

export const registerEmployerSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email format").refine(validateCompanyDomain, {
    message: "Please use your company email address"
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  company_domain: z.string().min(1, "Company domain is required"),
  industry: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal('')),
  phone: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(['candidate', 'employer', 'admin'])
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required")
});
