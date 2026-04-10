import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Users, CheckCircle, Zap, Globe } from 'lucide-react'
import { PricingCard } from '../components/PricingCard'
import { useCreateInquiry } from '../hooks/useCreateInquiry'
import { useToast } from '@/shared/hooks/useToast'
import { ROUTES } from '@/shared/constants/routes.constants'
import { pageVariants, staggerContainer, staggerItem } from '@/shared/animations/auth.animations'
import type { ContactInquiryPayload } from '@/shared/types'

const MOCK_PLANS = [
  { id: 'free' as const, display_name: 'Starter', price_monthly: 0, job_listing_limit: 3, features: ['3 Active Job Listings', 'Basic Candidate Matching', 'Community Support'] },
  { id: 'premium' as const, display_name: 'Growth', price_monthly: 199, job_listing_limit: 20, features: ['20 Active Job Listings', 'Advanced AI Matching pipeline', 'Priority Email Support', 'Custom Company Profile'] },
  { id: 'enterprise' as const, display_name: 'Enterprise', price_monthly: 899, job_listing_limit: -1, features: ['Unlimited Job Listings', 'ATS Integrations', 'Dedicated Account Manager', 'White-labeled portal'] },
]

export default function EmployersLandingPage() {
  const contactFormRef = useRef<HTMLDivElement>(null)
  const toast = useToast()
  const { mutate: createInquiry, isPending } = useCreateInquiry()

  const scrollToContact = (planId: string) => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })
    // In a full implementation, we'd pass the planId to the form state
  }

  const inquirySchema = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    email: Yup.string().email('Invalid email').test('is-work-email', 'Please use a work email (no gmail/yahoo)', val => {
      if (!val) return false
      return !val.match(/@(gmail|yahoo|hotmail|outlook)\./)
    }).required('Work email is required'),
    phone: Yup.string().required('Phone is required'),
    plan_interested: Yup.string().required('Required'),
    message: Yup.string().required('Message is required'),
  })

  const onSubmit = (values: ContactInquiryPayload, { resetForm }: any) => {
    createInquiry(values, {
      onSuccess: () => {
        toast.success("Inquiry sent successfully! Our team will contact you soon.")
        resetForm()
      },
      onError: () => toast.error("Failed to send inquiry. Please try again.")
    })
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-[#0a2329] min-h-screen text-white overflow-hidden"
    >
      {/* SECTION 1: HERO */}
      <section className="relative pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={staggerItem} className="inline-block bg-teal-500/10 text-teal-400 font-semibold px-4 py-1.5 rounded-full mb-6 border border-teal-500/20">
              For Employers & Recruiters
            </motion.div>
            <motion.h1 variants={staggerItem} className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Hire Smarter with <span className="text-teal-400">TalentOS</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
              The AI-powered recruitment platform trusted by 5,000+ companies. Cut your time-to-hire in half and find candidates who actually fit.
            </motion.p>
            <motion.div variants={staggerItem}>
              <Link 
                to={ROUTES.AUTH.REGISTER_EMPLOYER}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-teal-500/20 transition-all hover:scale-105 inline-block"
              >
                Start Hiring Free
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="perspective-1000 hidden lg:block"
          >
            {/* Mock Pipeline UI */}
            <div className="bg-[#0d2e36]/80 backdrop-blur-md rounded-2xl border border-teal-500/30 p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Active Pipeline: Senior Frontend Dev</h3>
                <span className="text-sm text-gray-400">24 Candidates</span>
              </div>
               
              <div className="space-y-4">
                {[
                  { name: "Sarah Jenkins", match: "98%", status: "Interview", color: "from-teal-500 to-mint" },
                  { name: "David Chen", match: "95%", status: "Screening", color: "from-blue-500 to-teal-400" },
                  { name: "Elena Rodriguez", match: "89%", status: "Applied", color: "from-gray-600 to-gray-500" }
                ].map((c, i) => (
                  <div key={i} className="bg-[#0a2329] p-4 rounded-xl border border-teal-900/50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-teal-900/80 flex items-center justify-center font-bold">{c.name[0]}</div>
                       <div>
                         <p className="font-bold">{c.name}</p>
                         <p className="text-xs text-gray-400">AI Match Score: <span className="text-teal-400">{c.match}</span></p>
                       </div>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${c.color} text-slate-900`}>
                       {c.status}
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="bg-[#0B151C] py-16 border-y border-teal-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-teal-900/30">
          <div><h4 className="text-4xl font-black text-teal-400 mb-2">50K+</h4><p className="text-gray-400">Vetted Candidates</p></div>
          <div><h4 className="text-4xl font-black text-teal-400 mb-2">98%</h4><p className="text-gray-400">Satisfaction Rate</p></div>
          <div><h4 className="text-4xl font-black text-teal-400 mb-2">3x</h4><p className="text-gray-400">Faster Hiring</p></div>
          <div><h4 className="text-4xl font-black text-teal-400 mb-2">500+</h4><p className="text-gray-400">Enterprise Clients</p></div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="py-24 max-w-7xl mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Top Companies Use TalentOS</h2>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
           {[
             { icon: <Zap size={32}/>, title: "AI Candidate Matching", desc: "Instantly surface the top 5% of candidates whose skills and experience perfectly map to your job requirements." },
             { icon: <Users size={32}/>, title: "Pipeline Management", desc: "A built-in lightweight ATS to move candidates seamlessly from application to offer." },
             { icon: <Globe size={32}/>, title: "Global Talent Pool", desc: "Access verified professionals globally for remote roles, handling the filtering heavy lifting for you." }
           ].map((f, i) => (
             <motion.div whileHover={{ y: -5 }} key={i} className="bg-[#0d2e36] p-8 rounded-2xl border border-teal-900/50">
               <div className="text-teal-400 mb-6">{f.icon}</div>
               <h3 className="text-xl font-bold mb-3">{f.title}</h3>
               <p className="text-gray-400">{f.desc}</p>
             </motion.div>
           ))}
         </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section className="bg-[#0B151C] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400">Only pay for what you need. Upgrade as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
             {MOCK_PLANS.map(plan => (
               <PricingCard 
                 key={plan.id} 
                 plan={plan} 
                 isPopular={plan.id === 'premium'}
                 onContactSales={scrollToContact} 
               />
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT FORM */}
      <section ref={contactFormRef} className="py-24 max-w-4xl mx-auto px-4">
        <div className="bg-[#0d2e36] rounded-3xl border border-teal-500/30 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl font-bold mb-4">Talk to Our Sales Team</h2>
            <p className="text-gray-400">Tell us about your hiring needs and we'll craft a custom solution.</p>
          </div>

          <Formik
            initialValues={{ company_name: '', email: '', phone: '', plan_interested: 'premium', message: '' } as ContactInquiryPayload}
            validationSchema={inquirySchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                    <Field name="company_name" className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none" />
                    <ErrorMessage name="company_name" component="div" className="text-coral text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Work Email</label>
                    <Field type="email" name="email" className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none" />
                    <ErrorMessage name="email" component="div" className="text-[#FF6B6B] text-xs mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                    <Field name="phone" className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none" />
                    <ErrorMessage name="phone" component="div" className="text-[#FF6B6B] text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Plan Interested</label>
                    <Field as="select" name="plan_interested" className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none hover:cursor-pointer">
                      <option value="free">Free Starter</option>
                      <option value="premium">Premium Growth</option>
                      <option value="enterprise">Enterprise</option>
                    </Field>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <Field as="textarea" rows={4} name="message" className="w-full bg-[#0a2329] border border-teal-900/50 rounded-xl p-3 text-white focus:border-teal-500 outline-none" placeholder="Tell us about your hiring volume and goals..." />
                  <ErrorMessage name="message" component="div" className="text-[#FF6B6B] text-xs mt-1" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || isPending}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-xl mt-4 disabled:opacity-50"
                >
                  {isSubmitting || isPending ? 'Sending...' : 'Send Inquiry'}
                </motion.button>
              </Form>
            )}
          </Formik>
        </div>
      </section>

    </motion.div>
  )
}
