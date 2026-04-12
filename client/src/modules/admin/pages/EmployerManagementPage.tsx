import React, { useState } from 'react'
import { EmployerTable } from '../components/EmployerTable'
import { EmployerDetailModal } from '../components/EmployerDetailModal'
import { useEmployers } from '../hooks/useEmployers'
import { useBlockUser } from '../hooks/useBlockUser'
import { useDeleteEmployer } from '../hooks/useDeleteEmployer'
import { useUpdateVerification } from '../hooks/useUpdateVerification'
import { Search } from 'lucide-react'
import type { AdminEmployer } from '@/shared/types'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { VERIFICATION_STATUS_OPTIONS } from '../constants/admin.constants'
import { ConfirmModal } from '@/shared/components/common/ConfirmModal'

const EmployerManagementPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [verificationFilter, setVerificationFilter] = useState('')
  const [page, setPage] = useState(1)
  const [selectedEmployer, setSelectedEmployer] = useState<AdminEmployer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const { data: res, isLoading } = useEmployers({ 
    search: debouncedSearch, 
    verification_status: verificationFilter, 
    page 
  })
  
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser()
  const { mutate: deleteEmployer, isPending: isDeleting } = useDeleteEmployer()
  const { mutate: updateVerification } = useUpdateVerification()

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'block' | 'delete';
    userId?: string;
    employerId?: string;
    isBlocked?: boolean;
    name?: string;
  }>({ isOpen: false, type: 'delete' })

  const handleView = (emp: AdminEmployer) => {
    setSelectedEmployer(emp)
    setIsModalOpen(true)
  }

  const handleAction = (data: typeof confirmModal) => {
    setConfirmModal(data)
  }

  const handleConfirm = () => {
    if (confirmModal.type === 'block' && confirmModal.userId) {
      blockUser({ 
        userId: confirmModal.userId, 
        isBlocked: !!confirmModal.isBlocked, 
        role: 'employer' 
      }, {
        onSuccess: () => setConfirmModal({ ...confirmModal, isOpen: false })
      })
    } else if (confirmModal.type === 'delete' && confirmModal.employerId) {
      deleteEmployer(confirmModal.employerId, {
        onSuccess: () => setConfirmModal({ ...confirmModal, isOpen: false })
      })
    }
  }

  const handleApprove = (id: string) => {
    updateVerification({ employerId: id, status: 'approved' }, {
      onSuccess: () => setIsModalOpen(false)
    })
  }

  const handleReject = (id: string) => {
    updateVerification({ employerId: id, status: 'rejected' }, {
      onSuccess: () => setIsModalOpen(false)
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Employer <span className="text-teal-400">Registry</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Manage partner companies and verifications</p>
        </div>

        <div className="flex flex-wrap gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-teal-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search company or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0D4F4F]/20 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 w-full md:w-64 transition-all"
              />
           </div>

           <select 
             value={verificationFilter}
             onChange={(e) => setVerificationFilter(e.target.value)}
             className="bg-[#0D4F4F]/20 border border-white/5 rounded-2xl px-6 py-3 text-sm text-gray-400 focus:outline-none focus:border-teal-500/50 transition-all uppercase font-bold tracking-widest"
           >
              {VERIFICATION_STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
           </select>
        </div>
      </div>

      <EmployerTable 
        employers={res?.data.data || []}
        isLoading={isLoading}
        onView={handleView}
        onBlock={(uid, status) => handleAction({
          isOpen: true,
          type: 'block',
          userId: uid,
          isBlocked: status,
          name: res?.data.data.find(e => e.user_id === uid)?.company_name
        })}
        onDelete={(id) => handleAction({
          isOpen: true,
          type: 'delete',
          employerId: id,
          name: res?.data.data.find(e => e.id === id)?.company_name
        })}
      />

      <EmployerDetailModal 
        employer={selectedEmployer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirm}
        title={confirmModal.type === 'block' ? (confirmModal.isBlocked ? 'Block Employer?' : 'Unblock Employer?') : 'Delete Employer profile?'}
        message={confirmModal.type === 'block' 
          ? `Are you sure you want to ${confirmModal.isBlocked ? 'block' : 'unblock'} ${confirmModal.name || 'this company'}? ${confirmModal.isBlocked ? 'They will no longer be able to post jobs or manage their account.' : 'They will regain full access.'}`
          : `Permanently delete ${confirmModal.name || 'this employer profile'}'s record? This cannot be undone.`
        }
        confirmText={confirmModal.type === 'block' ? (confirmModal.isBlocked ? 'Block Now' : 'Unblock Now') : 'Delete Permanently'}
        type={confirmModal.type === 'delete' ? 'danger' : 'warning'}
        isLoading={isBlocking || isDeleting}
      />
    </div>
  )
}

export default EmployerManagementPage
