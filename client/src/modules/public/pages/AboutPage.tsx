
import { motion } from 'framer-motion'
import { Target, Lightbulb, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'
import { pageVariants, staggerContainer, staggerItem } from '@/shared/animations/auth.animations'

export default function AboutPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-[#0a2329] min-h-screen text-white pt-10"
    >
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-mint"
        >
          Redefining How Talent Meets Opportunity
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 leading-relaxed"
        >
          TalentOS was built to fix the broken hiring ecosystem. We believe finding a job shouldn't resemble throwing resumes into a black box, and hiring shouldn't be an endless sift through unqualified applicants.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#0B151C] py-24 border-y border-teal-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div variants={staggerItem} className="bg-[#0d2e36] p-10 rounded-3xl border border-teal-900/50">
              <Target size={40} className="text-[#FF6B6B] mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To build the most transparent, efficient, and equitable career platform in the world. By leveraging AI to reduce bias and highlight true potential, we aim to match every professional with a role in which they can truly excel.
              </p>
            </motion.div>
            
            <motion.div variants={staggerItem} className="bg-[#0d2e36] p-10 rounded-3xl border border-teal-900/50">
              <Lightbulb size={40} className="text-teal-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                A world where talent liquidity flows freely across borders and boundaries. We envision an economy where skills and ambition are the only currencies that matter, completely detached from traditional pedigree gates.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield size={32} />, title: 'Radical Transparency', desc: 'No hidden salaries, no ghosting, no secret algorithmic biases.' },
            { icon: <Users size={32} />, title: 'Candidate First', desc: 'If the candidate succeeds, the employer succeeds. We build for the talent.' },
            { icon: <Lightbulb size={32} />, title: 'Continuous Innovation', desc: 'We iterate relentlessly to remove friction from the hiring process.' }
          ].map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{v.title}</h3>
              <p className="text-gray-400">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Placeholders */}
      <section className="bg-[#0B151C] py-24 border-t border-teal-900/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">The Minds Behind TalentOS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-32 h-32 bg-[#0d2e36] rounded-full border border-teal-900/50 mb-4 group-hover:border-teal-500 transition-colors" />
                <h4 className="font-bold">Team Member {i}</h4>
                <p className="text-gray-500 text-sm">Lead Engineer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Join the Movement</h2>
        <p className="text-xl text-gray-400 mb-10">Whether you're looking to take the next step in your career or searching for the perfect addition to your team, TalentOS is here.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.AUTH.REGISTER_CANDIDATE} className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl">I'm a Candidate</Link>
          <Link to={ROUTES.AUTH.REGISTER_EMPLOYER} className="bg-[#0d2e36] hover:bg-[#153e49] border border-teal-800 text-white font-bold px-8 py-4 rounded-xl">I'm an Employer</Link>
        </div>
      </section>
    </motion.div>
  )
}
