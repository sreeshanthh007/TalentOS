import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.routes'
import type { 
  Job, 
  JobFilters, 
  PaginatedResponse, 
  ApiResponse, 
  JobCategory, 
  ContactInquiryPayload, 
  Testimonial 
} from '@/shared/types'

// Jobs Services
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

// Categories Services
export async function getCategoriesApi(): Promise<ApiResponse<JobCategory[]>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.LIST)
  return data
}

// Inquiries Services
export async function createInquiryApi(payload: ContactInquiryPayload): Promise<ApiResponse<null>> {
  const { data } = await axiosInstance.post(API_ENDPOINTS.INQUIRIES.CREATE, payload)
  return data
}

// Testimonials Services
export async function getTestimonialsApi(): Promise<ApiResponse<Testimonial[]>> {
  const { data } = await axiosInstance.get(API_ENDPOINTS.TESTIMONIALS.LIST)
  return data
}
