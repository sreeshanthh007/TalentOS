import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

interface StatusTabsProps {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap relative",
            activeTab === tab 
              ? "text-teal-400" 
              : "text-gray-500 hover:text-white"
          )}
        >
          {activeTab === tab && (
            <motion.div 
              layoutId="active-pill"
              className="absolute inset-0 bg-teal-500/10 border border-teal-500/20 rounded-full"
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
};
