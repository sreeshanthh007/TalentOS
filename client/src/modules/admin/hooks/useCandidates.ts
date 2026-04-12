import { useQuery } from '@tanstack/react-query'
import { getCandidatesApi } from '../services/admin.service'

export function useCandidates(params?: { search?: string; page?: number }) {
  return useQuery({
    queryKey: ['admin', 'candidates', params],
    queryFn: () => getCandidatesApi(params),
    staleTime: 1000 * 60 * 1
  })
}
