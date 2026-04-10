import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.constants'
import type { Job, JobFilters, PaginatedResponse, ApiResponse } from '@/shared/types'

export async function getJobsApi(filters: Partial<JobFilters>): Promise<ApiResponse<PaginatedResponse<Job>>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, { params: filters })
  return data
}

export async function getFeaturedJobsApi(): Promise<ApiResponse<Job[]>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.JOBS.FEATURED)
  return data
}

export async function getJobByIdApi(id: string): Promise<ApiResponse<Job>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.JOBS.DETAIL(id))
  return data
}
