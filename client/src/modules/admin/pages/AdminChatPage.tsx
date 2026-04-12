import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChatWindow } from '../components/ChatWindow'
import { useInquiries } from '../hooks/useInquiries'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes.constants'

import type { RootState } from '@/shared/store'

const AdminChatPage: React.FC = () => {
  const { id: inquiryId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: res } = useInquiries()
  const user = useSelector((state: RootState) => state.auth.user)

  const currentInquiry = res?.data.find(q => q.id === inquiryId)

  if (!inquiryId) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
         <button 
           onClick={() => navigate(ROUTES.ADMIN.INQUIRIES)}
           className="flex items-center gap-2 group text-gray-500 hover:text-white transition-colors"
         >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all">
               <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Inquiries</span>
         </button>

         {currentInquiry && (
            <div className="text-right">
               <h2 className="text-sm font-black text-white uppercase italic tracking-widest">{currentInquiry.employer?.company_name}</h2>
               <p className="text-[10px] text-gray-500 font-bold uppercase">{currentInquiry.subject}</p>
            </div>
         )}
      </div>

      <ChatWindow 
        inquiryId={inquiryId}
        currentRole="admin"
        currentUserId={user?.id || ''}
        title={currentInquiry?.subject}
      />
    </div>
  )
}

export default AdminChatPage
