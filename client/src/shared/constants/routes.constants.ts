export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER_CANDIDATE: '/auth/register/candidate',
    REGISTER_EMPLOYER: '/auth/register/employer'
  },
  JOBS: {
    LIST: '/jobs',
    DETAILS: (id: string) => `/jobs/${id}`
  },
  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    PROFILE: '/candidate/profile',
    RESUME_BUILDER: '/candidate/resume-builder'
  },
  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    JOB_MANAGEMENT: '/employer/jobs',
    APPLICANT_PIPELINE: '/employer/applicants'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EMPLOYERS: '/admin/employers',
    CANDIDATES: '/admin/candidates',
    PLANS: '/admin/plans'
  }
} as const;
