import { useQuery } from '@tanstack/react-query'
import { getFeaturedJobsApi } from '../services/jobs.service'

export function useFeaturedJobs() {
  return useQuery({
    queryKey: ['jobs', 'featured'],
    queryFn: getFeaturedJobsApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
