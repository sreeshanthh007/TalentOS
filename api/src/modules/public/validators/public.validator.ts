import { z } from 'zod';

export const createInquirySchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  plan_interested: z.enum(['free', 'premium', 'enterprise']).optional()
});
