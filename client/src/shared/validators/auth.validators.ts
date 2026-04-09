import * as Yup from 'yup';

const invalidDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
  'icloud.com', 'aol.com', 'protonmail.com'
];

export const candidateValidationSchema = Yup.object({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  phone: Yup.string(),
  skills: Yup.array().of(Yup.string()),
  location: Yup.string(),
});

export const employerValidationSchema = Yup.object().shape({
  company_name: Yup.string().required('Company name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .test('is-business-email', 'Please use your company email address', (value) => {
      if (!value) return true;
      const domain = value.split('@')[1];
      return !invalidDomains.includes(domain?.toLowerCase() || '');
    }),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  company_domain: Yup.string().required('Company domain is required'),
  industry: Yup.string().required('Industry is required'),
  website: Yup.string().url('Must be a valid URL'),
  phone: Yup.string(),
  selected_plan: Yup.string().oneOf(['free', 'premium', 'enterprise']).required(),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  role: Yup.string().oneOf(['candidate', 'employer', 'admin']).required(),
});
