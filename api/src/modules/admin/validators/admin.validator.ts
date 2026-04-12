import { z } from 'zod';

export const updatePlanSchema = z.object({
  price_monthly: z.number().min(0).optional(),
  features: z.array(z.string()).optional(),
  display_name: z.string().min(1).optional()
});

export const updateVerificationSchema = z.object({
  status: z.enum(['approved', 'rejected'])
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['open', 'in_progress', 'resolved'])
});

export const blockUserSchema = z.object({
  is_blocked: z.boolean()
});

export const sendMessageSchema = z.object({
  inquiry_id: z.string().min(1, "Inquiry ID is required"),
  content: z.string().min(1, "Message content cannot be empty")
});
