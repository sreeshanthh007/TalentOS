import React from 'react';
import { useFormik, type FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import type { ContactInquiryPayload } from '@/shared/types';
import { inquiryValidationSchema } from '@/shared/validators/inquiry.validators';

interface ContactInquiryFormProps {
  onSubmit: (values: ContactInquiryPayload, helpers: FormikHelpers<ContactInquiryPayload>) => void;
  isLoading?: boolean;
}

export const ContactInquiryForm: React.FC<ContactInquiryFormProps> = ({ onSubmit, isLoading }) => {
  const formik = useFormik<ContactInquiryPayload>({
    initialValues: {
      company_name: '',
      email: '',
      phone: '',
      plan_interested: 'premium',
      message: '',
    },
    validationSchema: inquiryValidationSchema,
    onSubmit: (values, helpers) => {
      onSubmit(values, helpers);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 relative z-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Company Name</label>
          <input
            name="company_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.company_name}
            className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none"
          />
          {formik.touched.company_name && formik.errors.company_name ? (
            <div className="text-[#FF6B6B] text-xs mt-1">{formik.errors.company_name}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Work Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-[#FF6B6B] text-xs mt-1">{formik.errors.email}</div>
          ) : null}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
          <input
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-[#FF6B6B] text-xs mt-1">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Plan Interested</label>
          <select
            name="plan_interested"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.plan_interested}
            className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none hover:cursor-pointer"
          >
            <option value="free">Free Starter</option>
            <option value="premium">Premium Growth</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Message</label>
        <textarea
          rows={4}
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none"
          placeholder="Tell us about your hiring volume and goals..."
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="text-[#FF6B6B] text-xs mt-1">{formik.errors.message}</div>
        ) : null}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={formik.isSubmitting || isLoading}
        className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-xl mt-4 disabled:opacity-50"
      >
        {formik.isSubmitting || isLoading ? 'Sending...' : 'Send Inquiry'}
      </motion.button>
    </form>
  );
};
