import { useQuery } from '@tanstack/react-query'
import { getTestimonialsApi } from '../services/testimonials.service'

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonialsApi,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
