import { useQuery } from '@tanstack/react-query'
import { getApplicantsByJobApi } from '../services/employer.service'

export function useApplicantsByJob(jobId: string) {
  return useQuery({
    queryKey: ['employer', 'applicants', jobId],
    queryFn: () => getApplicantsByJobApi(jobId),
    enabled: !!jobId,
    staleTime: 1000 * 60 * 1
  })
}
