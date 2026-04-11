import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { JobCategory } from '@/shared/types'

type CategoryCardProps = {
  category: JobCategory
  onClick?: () => void
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const toPascalCase = (str: string) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  const iconName = toPascalCase(category.icon || '');
  const IconComponent = (Icons as any)[iconName] || Icons.Briefcase;

  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: '#4ECDC4' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-[#0d2e36] rounded-2xl border border-teal-900/50 p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg hover:shadow-teal-500/10 transition-all aspect-square group"
    >
      <div className="w-14 h-14 rounded-full bg-[#0a2329] border border-teal-900/50 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 group-hover:text-teal-300 text-gray-400 transition-colors">
        <IconComponent size={24} />
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{category.name}</h3>
      {category.job_count !== undefined && (
        <span className="text-gray-400 text-xs">
          {category.job_count} open jobs
        </span>
      )}
    </motion.div>
  )
}
