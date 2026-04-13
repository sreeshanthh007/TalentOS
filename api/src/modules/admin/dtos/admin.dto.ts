export type UpdatePlanDTO = {
  price_monthly?: number
  features?: string[]
  display_name?: string
}

export type UpdateVerificationDTO = {
  status: 'approved' | 'rejected'
}

export type UpdateInquiryStatusDTO = {
  status: 'open' | 'in_progress' | 'resolved'
}

export type SendMessageDTO = {
  inquiry_id: string
  content: string
}

export type BlockUserDTO = {
  is_blocked: boolean
}

export type CreateTestimonialDTO = {
  author_name: string
  author_role?: string
  content: string
  rating: number
  is_active?: boolean
  avatar_url?: string
}
