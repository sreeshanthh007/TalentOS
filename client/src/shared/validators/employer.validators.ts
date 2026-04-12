import * as Yup from 'yup'

export const jobValidationSchema = Yup.object({
  title: Yup.string().required('Job title is required').min(5, 'Title must be at least 5 characters'),
  description: Yup.string().required('Description is required').min(50, 'Description must be at least 50 characters'),
  requirements: Yup.string().required('Requirements are required').min(20, 'Requirements must be at least 20 characters'),
  location: Yup.string().required('Location is required'),
  job_type: Yup.string().required('Job type is required'),
  category_id: Yup.string().required('Please select a category'),
  salary_min: Yup.number().nullable().transform((v, o) => o === '' ? null : v),
  salary_max: Yup.number().nullable().transform((v, o) => o === '' ? null : v),
  experience_years: Yup.number().nullable().transform((v, o) => o === '' ? null : v)
})

export const employerProfileSchema = Yup.object({
  company_name: Yup.string().required('Company name is required'),
  industry: Yup.string().required('Industry is required'),
  website: Yup.string().url('Invalid URL format').nullable(),
  phone: Yup.string().required('Phone number is required'),
  company_description: Yup.string().required('Company description is required').min(20, 'At least 20 characters'),
  address: Yup.string().nullable(),
})
