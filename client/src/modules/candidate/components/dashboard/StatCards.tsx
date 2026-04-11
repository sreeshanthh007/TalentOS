import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Bookmark, MessageSquare, CheckCircle } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface StatCardsProps {
  stats: {
    applied: number;
    shortlisted: number;
    interviewing: number;
    hired: number;
  };
}

const CountUp: React.FC<{ end: number }> = ({ end }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const duration = 1000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [end]);
  
  return <>{count}</>;
};

export const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  const statItems = [
    { label: 'Applied', value: stats.applied, icon: Briefcase, color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { label: 'Shortlisted', value: stats.shortlisted, icon: Bookmark, color: 'text-mint', bg: 'bg-mint/10' },
    { label: 'Interviewing', value: stats.interviewing, icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Hired', value: stats.hired, icon: CheckCircle, color: 'text-teal-300', bg: 'bg-teal-300/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          className="bg-[#0d2e36] border border-teal-900/50 rounded-2xl p-6 flex items-center gap-4"
        >
          <div className={cn("p-3 rounded-xl", stat.bg)}>
            <stat.icon className={stat.color} size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">
              <CountUp end={stat.value} />
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
