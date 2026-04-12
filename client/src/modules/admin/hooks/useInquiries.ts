import { useQuery } from '@tanstack/react-query'
import { getInquiriesApi } from '../services/admin.service'

export function useInquiries() {
  return useQuery({
    queryKey: ['admin', 'inquiries'],
    queryFn: getInquiriesApi,
    staleTime: 1000 * 60 * 1
  })
}
