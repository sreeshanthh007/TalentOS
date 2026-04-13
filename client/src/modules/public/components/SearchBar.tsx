import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/shared/hooks/useDebounce'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search by job title, company, or keywords..."
}) => {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, 400)
  const isFirstRender = useRef(true)

  // Sync from parent ONLY if the change is external (e.g. "Clear All" button)
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value)
    }
  }, [value])

  // Call onChange ONLY when debouncedValue changes, and NOT on first mount if it matches value
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onChange(debouncedValue)
  }, [debouncedValue, onChange])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(localValue)
      onSearch?.()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex items-center w-full max-w-4xl mx-auto group"
    >
      <div className="absolute left-5 text-teal-500/50 group-focus-within:text-teal-400 transition-colors pointer-events-none">
        <Search size={22} />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-[#0d2e36]/80 backdrop-blur-xl text-white rounded-2xl py-5 pl-14 pr-36 border border-teal-800/30 focus:border-teal-500/50 focus:outline-none focus:ring-4 focus:ring-teal-500/10 shadow-2xl placeholder:text-gray-500 transition-all text-lg"
      />

      <div className="absolute right-3 flex items-center gap-2">
        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            onChange(localValue)
            onSearch?.()
          }}
          className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-7 py-2.5 rounded-xl transition-all shadow-lg shadow-teal-500/20"
        >
          Search
        </motion.button>
      </div>
    </motion.div>
  )
}
