import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InquiryTable } from '../components/InquiryTable'
import { useInquiries } from '../hooks/useInquiries'
// import { useUpdateVerification } from '../hooks/useUpdateVerification' // reusing status update logic if similar
import { updateInquiryStatusApi } from '../services/admin.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ROUTES } from '@/shared/constants/routes.constants'

const InquiriesPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: res, isLoading } = useInquiries()

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string, status: any }) => updateInquiryStatusApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] })
      toast.success('Inquiry status updated')
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Inquiry <span className="text-blue-400">Stream</span></h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Manage sales leads and support tickets</p>
      </div>

      <InquiryTable 
        inquiries={res?.data || []}
        isLoading={isLoading}
        onOpenChat={(id) => navigate(ROUTES.ADMIN.CHAT.replace(':id', id))}
        onUpdateStatus={(id, status) => updateStatus({ id, status: status as any })}
      />
    </div>
  )
}

export default InquiriesPage
