import { useQuery } from '@tanstack/react-query'
import { getJobByIdApi, getJobsApi } from '../services/jobs.service'

export function useJobDetail(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobByIdApi(id),
    enabled: !!id,
  })
}

export function useJobs(filters: any) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => getJobsApi(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
