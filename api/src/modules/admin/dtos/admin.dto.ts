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
