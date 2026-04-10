import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useDebounce } from '@/shared/hooks/useDebounce'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search by job title, company, or keywords..."
}) => {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, 500)

  // Update parent when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  // Sync from parent if changed externally
  useEffect(() => {
    if (value !== debouncedValue) {
      setLocalValue(value)
    }
  }, [value, debouncedValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(localValue)
      onSearch()
    }
  }

  return (
    <motion.div 
      whileFocus={{ scale: 1.02 }}
      className="relative flex items-center w-full max-w-3xl mx-auto"
    >
      <div className="absolute left-4 text-gray-400 pointer-events-none">
        <Search size={24} />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-[#0d2e36] text-white rounded-2xl py-4 pl-12 pr-32 border border-teal-900/50 focus:border-teal-500 focus:outline-none shadow-xl placeholder:text-gray-500 transition-colors text-lg"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onChange(localValue)
          onSearch()
        }}
        className="absolute right-2 top-2 bottom-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-6 rounded-xl transition-colors"
      >
        Search
      </motion.button>
    </motion.div>
  )
}
