import { useQuery } from '@tanstack/react-query'
import { getCandidateProfileApi } from '../services/candidate.service'

export function useCandidateProfile() {
  return useQuery({
    queryKey: ['candidate', 'profile'],
    queryFn: getCandidateProfileApi,
    staleTime: 1000 * 60 * 5,
  })
}
