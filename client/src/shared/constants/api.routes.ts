export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER_CANDIDATE: '/api/v1/auth/register/candidate',
    REGISTER_EMPLOYER: '/api/v1/auth/register/employer',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH_TOKEN: '/api/v1/auth/refresh-token',
    CLOUDINARY_SIGNATURE: '/api/v1/auth/cloudinary-signature',
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
  },
  CANDIDATE: {
    PROFILE: '/api/v1/candidate/profile',
    UPDATE_AVATAR: '/api/v1/candidate/profile/avatar',
    APPLICATIONS: '/api/v1/candidate/applications',
    SHORTLISTED: '/api/v1/candidate/shortlisted',
    RESUME_GENERATE: '/api/v1/candidate/resume/generate',
  },
  APPLICATIONS: {
    APPLY: '/api/v1/applications',
  }
} as const

