import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes.constants'
import { SearchBar } from '../components/SearchBar'
import { SparklineWidget } from '../components/SparklineWidget'
import { CategoryCard } from '../components/CategoryCard'
import { JobCard } from '../components/JobCard'
import { TestimonialCard } from '../components/TestimonialCard'
import { useCategories } from '../hooks/useCategories'
import { useFeaturedJobs } from '../hooks/useFeaturedJobs'
import { useTestimonials } from '../hooks/useTestimonials'
import { pageVariants, staggerContainer, staggerItem } from '@/shared/animations/auth.animations'

export default function HomePage() {
  const navigate = useNavigate()
  
  // Data hooks
  const { data: categoriesResp, isLoading: catLoading } = useCategories()
  const { data: jobsResp, isLoading: jobsLoading } = useFeaturedJobs()
  const { data: testimonialsResp, isLoading: testLoading } = useTestimonials()

  const categories = categoriesResp?.data || []
  const featuredJobs = jobsResp?.data || []
  const testimonials = testimonialsResp?.data || []

  // const handleSearch = (term: string) => {
  //   if (term) navigate(`${ROUTES.PUBLIC.JOBS}?search=${encodeURIComponent(term)}`)
  // }

  // Ref for count up animation trigger
  const statsRef = React.useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-screen"
    >
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-gradient-to-br from-[#0a2329] via-[#0d2e36] to-[#0A1929] px-4 pt-20 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-mint/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6"
          >
            <motion.h1 variants={staggerItem} className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Find Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-mint">
                Dream Career
              </span>
            </motion.h1>
            
            <motion.p variants={staggerItem} className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Join thousands of professionals finding their next big opportunity. 
              The AI-powered recruitment platform connecting top talent with world-class companies.
            </motion.p>
            
            <motion.div variants={staggerItem} className="mt-4">
              <SearchBar value="" onChange={() => {}} onSearch={() => {}} placeholder="Search jobs, skills, or companies..." />
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-sm text-gray-500 font-medium tracking-wide">Popular:</span>
              {['Technology', 'Marketing', 'Finance', 'Design', 'Healthcare'].map(tag => (
                <button key={tag} className="text-xs bg-teal-900/40 hover:bg-teal-800/60 text-teal-300 border border-teal-800/50 rounded-full px-3 py-1.5 transition-colors">
                  {tag}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-end relative"
          >
            <div className="absolute -top-10 -right-10 w-full h-full bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full blur-3xl" />
            <SparklineWidget />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: STATS BAR */}
      <section ref={statsRef} className="bg-[#0B151C] border-y border-teal-900/30 py-12 relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-teal-900/50">
          {[
            { label: 'Active Jobs', value: '10,000+' },
            { label: 'Companies', value: '5,000+' },
            { label: 'Candidates', value: '50,000+' },
            { label: 'Placement Rate', value: '95%' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-3xl md:text-4xl font-black text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CATEGORIES */}
      <section className="py-24 bg-[#0a2329]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
              <p className="text-gray-400 max-w-2xl">Find the role that fits your passion and skills perfectly.</p>
            </div>
          </div>
          
          {catLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} className="h-40 rounded-2xl bg-[#0d2e36] animate-pulse" />)}
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-5 gap-6"
            >
              {categories.slice(0, 10).map((cat) => (
                <motion.div key={cat.id} variants={staggerItem}>
                  <CategoryCard category={cat} onClick={() => navigate(`${ROUTES.PUBLIC.JOBS}?category_id=${cat.id}`)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 4: FEATURED JOBS */}
      <section className="py-24 bg-[#0B151C]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Featured Opportunities</h2>
              <p className="text-gray-400 max-w-2xl">Top handpicked roles from verified companies actively hiring.</p>
            </div>
            <Link to={ROUTES.PUBLIC.JOBS} className="text-teal-400 font-medium hover:text-teal-300 flex items-center gap-2 group">
              View All Jobs <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {jobsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 rounded-2xl bg-[#0d2e36] animate-pulse" />)}
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {featuredJobs.map(job => (
                <motion.div key={job.id} variants={staggerItem} className="h-full">
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="py-24 bg-[#0a2329] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Why Professionals Trust TalentOS</h2>
            <p className="text-gray-400">Our platform is designed to eliminate the noise and connect genuine talent with transparent employers efficiently.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Sparkles size={32} />,
                title: "AI-Powered Matching",
                desc: "Our algorithms analyze your profile beyond keywords to match you with cultures and roles where you'll thrive.",
                color: "text-teal-400",
                bg: "bg-teal-500/10"
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Verified Employers",
                desc: "Every company on TalentOS is manually verified. Complete transparency on salaries and remote policies.",
                color: "text-mint",
                bg: "bg-mint/10"
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Real-time Pipeline",
                desc: "No more black holes. Track your application status in real-time with our transparent candidate pipeline.",
                color: "text-[#FF6B6B]",
                bg: "bg-[#FF6B6B]/10"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={staggerItem}
                className="bg-[#0d2e36]/50 backdrop-blur-sm border border-teal-900/30 rounded-3xl p-8 hover:bg-[#0d2e36] transition-colors"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-24 bg-[#0B151C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
          </div>

          {testLoading ? null : (
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
              {testimonials.map(t => (
                <div key={t.id} className="min-w-[300px] md:min-w-[400px] snap-center">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7: CTA BANNER */}
      <section className="bg-teal-900 py-20 border-y border-teal-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to find your perfect match?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={ROUTES.PUBLIC.JOBS}
              className="bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1"
            >
              Find Jobs
            </Link>
            <Link 
              to={ROUTES.AUTH.REGISTER_EMPLOYER}
              className="bg-[#0a2329] hover:bg-[#0d2e36] text-white border border-teal-500/50 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-1"
            >
              Post a Job
            </Link>
          </div>
        </motion.div>
      </section>

    </motion.div>
  )
}
