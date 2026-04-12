export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER_CANDIDATE: '/register/candidate',
    REGISTER_EMPLOYER: '/register/employer',
  },
  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    APPLIED_JOBS: '/candidate/applied-jobs',
    SHORTLISTED: '/candidate/shortlisted',
    RESUME_BUILDER: '/candidate/resume-builder',
    PROFILE: '/candidate/profile',
  },
  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    JOBS: '/employer/jobs',
    JOB_CREATE: '/employer/jobs/create',
    JOB_EDIT: '/employer/jobs/:id/edit',
    APPLICANTS: '/employer/jobs/:id/applicants',
    SUBSCRIPTION: '/employer/subscription',
    PROFILE: '/employer/profile',
    VERIFICATION: '/employer/verification',
    INQUIRIES: '/employer/inquiries',
    CHAT: '/employer/inquiries/:id/chat',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EMPLOYERS: '/admin/employers',
    EMPLOYER_DETAIL: '/admin/employers/:id',
    CANDIDATES: '/admin/candidates',
    PLANS: '/admin/plans',
    INQUIRIES: '/admin/inquiries',
    CHAT: '/admin/inquiries/:id/chat',
  },

  PUBLIC: {
    JOBS: '/jobs',
    JOB_DETAIL: '/jobs/:id',
    EMPLOYERS: '/employers',
    ABOUT: '/about',
  }
}
