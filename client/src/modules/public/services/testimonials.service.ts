import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.constants'
import type { Testimonial, ApiResponse } from '@/shared/types'

export async function getTestimonialsApi(): Promise<ApiResponse<Testimonial[]>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.TESTIMONIALS.LIST)
  return data
}
