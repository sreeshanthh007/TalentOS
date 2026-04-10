import React, { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageVariants } from '@/shared/animations/auth.animations'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}  
    </motion.div>
  )
}
