import { useQuery } from '@tanstack/react-query'
import { getJobByIdApi } from '../services/jobs.service'

export function useJobDetail(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobByIdApi(id),
    enabled: !!id,
  })
}
