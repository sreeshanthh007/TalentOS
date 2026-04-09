import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const stepVariants: Variants = {
  initial: (direction: number) => ({ x: direction * 100, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -100, opacity: 0 }),
};
