import { type Variants } from 'framer-motion'

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

export const stepVariants: Variants = {
  initial: (direction: number) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -60 : 60, transition: { duration: 0.25 } })
}

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.08 } }
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

export const buttonTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 }
}
