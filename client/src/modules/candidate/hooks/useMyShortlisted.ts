import { useQuery } from '@tanstack/react-query'
import { getMyShortlistedApi } from '../services/candidate.service'

export function useMyShortlisted() {
  return useQuery({
    queryKey: ['candidate', 'shortlisted'],
    queryFn: getMyShortlistedApi,
    staleTime: 1000 * 60 * 2,
  })
}
