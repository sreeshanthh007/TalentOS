import { useQuery } from '@tanstack/react-query'
import { getCategoriesApi } from '../services/public.services'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  })
}
