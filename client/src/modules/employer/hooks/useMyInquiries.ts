import { useQuery } from '@tanstack/react-query'
import { getMyInquiriesApi } from '../services/employer.service'

export function useMyInquiries() {
  return useQuery({
    queryKey: ['employer', 'inquiries'],
    queryFn: getMyInquiriesApi,
    staleTime: 1000 * 60 * 2
  })
}
