import { useQuery } from '@tanstack/react-query'
import { getVerificationDocsApi } from '../services/employer.service'

export function useVerificationDocs() {
  return useQuery({
    queryKey: ['employer', 'verification', 'docs'],
    queryFn: getVerificationDocsApi
  })
}
