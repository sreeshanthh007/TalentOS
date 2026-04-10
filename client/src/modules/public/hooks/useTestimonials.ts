import { useQuery } from '@tanstack/react-query'
import { getTestimonialsApi } from '../services/public.services'

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonialsApi,
    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  })
}
