import { useQuery } from '@tanstack/react-query'
import { getMyApplicationsApi } from '../services/candidate.service'

export function useMyApplications() {
  return useQuery({
    queryKey: ['candidate', 'applications'],
    queryFn: getMyApplicationsApi,
    staleTime: 1000 * 60 * 2,
  })
}
