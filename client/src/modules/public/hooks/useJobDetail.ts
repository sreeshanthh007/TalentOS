import { useQuery } from '@tanstack/react-query'
import { getJobByIdApi } from '../services/public.services'

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
