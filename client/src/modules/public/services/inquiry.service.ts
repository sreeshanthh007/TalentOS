import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.constants'
import type { ContactInquiryPayload, ApiResponse } from '@/shared/types'

export async function createInquiryApi(payload: ContactInquiryPayload): Promise<ApiResponse<null>> {
  const { data } = await axiosInstance.post(API_ENDPOINTS.INQUIRIES.CREATE, payload)
  return data
}
