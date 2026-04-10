import { useQuery } from '@tanstack/react-query'
import { getCategoriesApi } from '../services/categories.service'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
