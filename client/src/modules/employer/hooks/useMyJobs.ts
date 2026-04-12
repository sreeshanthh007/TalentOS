import { useQuery } from '@tanstack/react-query'
import { getMyJobsApi } from '../services/employer.service'

export function useMyJobs() {
  return useQuery({
    queryKey: ['employer', 'jobs'],
    queryFn: getMyJobsApi,
    staleTime: 1000 * 60 * 2
  })
}
