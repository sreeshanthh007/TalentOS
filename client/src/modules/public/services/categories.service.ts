import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.constants'
import type { JobCategory, ApiResponse } from '@/shared/types'

export async function getCategoriesApi(): Promise<ApiResponse<JobCategory[]>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.LIST)
  return data
}
