import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getAdminTestimonialsApi, 
  createTestimonialApi, 
  updateTestimonialApi, 
  deleteTestimonialApi, 
  toggleTestimonialApi 
} from '../services/admin.service'
import { useToast } from '@/shared/hooks/useToast'
import {type  CreateTestimonialPayload } from '@/shared/types'

export function useAdminTestimonials() {
  return useQuery({
    queryKey: ['admin', 'testimonials'],
    queryFn: getAdminTestimonialsApi,
    select: (res) => res.data
  })
}

export function useCreateTestimonial() {
  const toast = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateTestimonialPayload) => createTestimonialApi(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
      toast.success(res.message)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create testimonial')
    }
  })
}

export function useUpdateTestimonial() {
  const toast = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<CreateTestimonialPayload> }) => 
      updateTestimonialApi(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
      toast.success(res.message)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update testimonial')
    }
  })
}

export function useDeleteTestimonial() {
  const toast = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTestimonialApi(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
      toast.success(res.message)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete testimonial')
    }
  })
}

export function useToggleTestimonial() {
  const toast = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => 
      toggleTestimonialApi(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to toggle status')
    }
  })
}
