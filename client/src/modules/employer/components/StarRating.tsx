import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface StarRatingProps {
  value: number
  onChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, readonly = false, size = 'md' }) => {
  const [hover, setHover] = useState(0)

  const starSize = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={readonly}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => onChange?.(star)}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer"
          )}
        >
          <Star 
            size={starSize[size]} 
            className={cn(
              "transition-all duration-300",
              (hover || value) >= star 
                ? "fill-teal-400 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" 
                : "text-gray-600 fill-transparent"
            )}
          />
        </motion.button>
      ))}
    </div>
  )
}
