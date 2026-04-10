import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

const mockData = [
  { value: 20 },
  { value: 45 },
  { value: 30 },
  { value: 65 },
  { value: 50 },
  { value: 85 },
  { value: 100 },
]

export const SparklineWidget: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-[#0d2e36]/80 backdrop-blur-md rounded-2xl border border-teal-900/50 p-4 shadow-2xl relative overflow-hidden group cursor-pointer w-64"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-[#FF6B6B]" />
          AI Talent Availability
        </h4>
        <span className="text-xs text-mint bg-mint/10 px-2 py-1 rounded-full border border-mint/20">Live</span>
      </div>

      <div className="h-16 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FF6B6B"
              strokeWidth={3}
              dot={false}
              isAnimationActive={isMounted}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>Trending Up</span>
        <span className="text-[#FF6B6B] font-bold group-hover:text-white transition-colors">
          AI Resume Builder →
        </span>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF6B6B]/5 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  )
}
