import * as Yup from 'yup'

import { MESSAGES } from '../constants/messages.constants'

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('This field is required'),
  role: Yup.string()
    .oneOf(['candidate', 'employer', 'admin'])
    .required('This field is required'),
})

export const candidateValidationSchema = Yup.object({
  full_name: Yup.string().required('This field is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('This field is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('This field is required'),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one skill')
    .required('This field is required'),
  location: Yup.string().required('This field is required'),
  resume_url: Yup.string().required(MESSAGES.UPLOAD.RESUME_REQUIRED),
})

const invalidDomains = [
  'gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol',
  'protonmail', 'ymail', 'live', 'msn', 'me', 'googlemail'
]

export const employerValidationSchema = Yup.object({
  company_name: Yup.string().required('This field is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('This field is required')
    .test('is-business-email', 'Please use your company email address', (value) => {
      if (!value) return true
      const domainParts = value.split('@')
      if (domainParts.length < 2) return false
      const domain = domainParts[1]?.split('.')[0]?.toLowerCase()
      if (!domain) return false
      return !invalidDomains.includes(domain)
    }),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('This field is required'),
  company_domain: Yup.string().required('This field is required'),
  industry: Yup.string().required('This field is required'),
  website: Yup.string()
    .url('Please enter a valid URL')
    .optional(),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('This field is required'),
  selected_plan: Yup.string()
    .oneOf(['free', 'premium', 'enterprise'])
    .required('This field is required'),
})
