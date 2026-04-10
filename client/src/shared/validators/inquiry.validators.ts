import * as Yup from 'yup';

export const inquiryValidationSchema = Yup.object().shape({
  company_name: Yup.string().required('Company name is required'),
  email: Yup.string().email('Invalid email').test('is-work-email', 'Please use a work email (no gmail/yahoo)', val => {
    if (!val) return false;
    return !val.match(/@(gmail|yahoo|hotmail|outlook)\./);
  }).required('Work email is required'),
  phone: Yup.string().required('Phone is required'),
  plan_interested: Yup.string().required('Required'),
  message: Yup.string().required('Message is required'),
});
