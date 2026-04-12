import { Building2, Users, CreditCard, MessageSquare } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes.constants';

export const QUICK_NAV_ITEMS = [
  { label: 'Employers', path: ROUTES.ADMIN.EMPLOYERS, icon: Building2, color: 'text-teal-400' },
  { label: 'Candidates', path: ROUTES.ADMIN.CANDIDATES, icon: Users, color: 'text-mint-400' },
  { label: 'Plans', path: ROUTES.ADMIN.PLANS, icon: CreditCard, color: 'text-coral-400' },
  { label: 'Inquiries', path: ROUTES.ADMIN.INQUIRIES, icon: MessageSquare, color: 'text-blue-400' },
];

export const VERIFICATION_STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

