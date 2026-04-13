export type CreateInquiryDTO = {
  employer_id?: string | null
  plan_id?: string | null
  subject: string
  initial_message: string
}

export type ContactInquiryPayload = {
  company_name: string
  email: string
  phone: string
  message: string
  plan_interested?: 'free' | 'premium' | 'enterprise'
}
