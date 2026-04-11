import { z } from 'zod';

export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field_of_study: z.string().min(1, "Field of study is required"),
  start_year: z.number().int().min(1900).max(new Date().getFullYear()),
  end_year: z.number().int().min(1900).max(new Date().getFullYear() + 10).nullable().optional(),
  is_current: z.boolean(),
  type: z.enum(['academic', 'institution'])
});

export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().nullable().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().nullable().optional(),
  is_current: z.boolean(),
  description: z.string().nullable().optional()
});


export const updateProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required").optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  avatar_url: z.string().optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional()
});

export const applyJobSchema = z.object({
  job_id: z.string().min(1, "Job ID is required"),
  resume_url: z.string().url("Invalid resume URL")
});

export const generateResumeSchema = z.object({
  target_job_title: z.string().min(1, "Target job title is required")
});
