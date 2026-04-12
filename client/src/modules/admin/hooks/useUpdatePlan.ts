import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePlanApi } from '../services/admin.service'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'
import type { UpdatePlanPayload } from '@/shared/types'

export function useUpdatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ planId, data }: { planId: string; data: UpdatePlanPayload }) => updatePlanApi(planId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans'] })
      toast.success(MESSAGES.ADMIN.PLAN_UPDATED)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update plan')
    }
  })
}
