import { useQuery } from '@tanstack/react-query'
import { getFeaturedJobsApi } from '../services/public.services'

export function useFeaturedJobs() {
  return useQuery({
    queryKey: ['jobs', 'featured'],
    queryFn: getFeaturedJobsApi,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
