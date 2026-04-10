import { useQuery } from '@tanstack/react-query'
import { getJobByIdApi, getJobsApi } from '../services/public.services'

export function useJobDetail(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobByIdApi(id),
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export function useJobs(filters: any) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => getJobsApi(filters),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
