import { useQuery } from '@tanstack/react-query'
import { getCandidateProfileApi } from '../services/candidate.service'

export function useCandidateProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: ['candidate', 'profile'],
    queryFn: getCandidateProfileApi,
    staleTime: 1000 * 60 * 5,
    enabled,
  })
}
