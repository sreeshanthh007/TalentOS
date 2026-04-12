import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendEmployerMessageApi } from '../services/employer.service'
import type { SendMessagePayload } from '@/shared/types'

export function useSendEmployerMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SendMessagePayload) => sendEmployerMessageApi(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['messages', res.data.inquiry_id] })
    }
  })
}
