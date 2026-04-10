import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import type { Testimonial } from '@/shared/types'

type TestimonialCardProps = {
  testimonial: Testimonial
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#0d2e36] rounded-2xl border border-teal-900/50 p-6 shadow-xl flex flex-col h-full relative"
    >
      <Quote size={32} className="text-[#FF6B6B]/20 absolute top-4 right-4" />
      <div className="flex gap-1 mb-4 text-[#4ECDC4]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} className={i >= testimonial.rating ? "text-gray-600" : ""} />
        ))}
      </div>
      
      <p className="text-gray-300 italic mb-6 flex-grow leading-relaxed">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-3">
        {testimonial.avatar_url ? (
          <img
            src={testimonial.avatar_url}
            alt={testimonial.author_name}
            className="w-10 h-10 rounded-full object-cover border border-teal-900/50"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold border border-teal-500/30">
            {testimonial.author_name[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <div>
          <h4 className="text-white font-medium text-sm">{testimonial.author_name}</h4>
          {testimonial.author_role && (
            <p className="text-gray-400 text-xs">{testimonial.author_role}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
