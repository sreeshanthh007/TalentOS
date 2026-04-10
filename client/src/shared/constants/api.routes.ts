export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER_CANDIDATE: '/api/v1/auth/register/candidate',
    REGISTER_EMPLOYER: '/api/v1/auth/register/employer',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH_TOKEN: '/api/v1/auth/refresh-token',
  },
  JOBS: {
    LIST: '/api/v1/jobs',
    DETAIL: (id: string) => `/api/v1/jobs/${id}`,
    FEATURED: '/api/v1/jobs/featured',
  },
  CATEGORIES: {
    LIST: '/api/v1/categories',
  },
  TESTIMONIALS: {
    LIST: '/api/v1/testimonials',
  },
  INQUIRIES: {
    CREATE: '/api/v1/inquiries',
  },
  PLANS: {
    LIST: '/api/v1/plans',
  }
} as const
