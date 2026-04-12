import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.routes'
import type { SubscriptionPlan, ApiResponse } from '@/shared/types'

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<SubscriptionPlan[]>>(API_ENDPOINTS.PLANS.LIST)
      return response.data
    }
  })
}
