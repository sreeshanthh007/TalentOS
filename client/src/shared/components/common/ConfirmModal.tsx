import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false
}) => {
  const themes = {
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      button: 'bg-red-500 hover:bg-red-600 shadow-red-500/20',
      glow: 'bg-red-500/10'
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: 'text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20',
      glow: 'bg-amber-500/10'
    },
    info: {
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      icon: 'text-teal-400',
      button: 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/20',
      glow: 'bg-teal-500/10'
    }
  };

  const theme = themes[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#0d2e36] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Glow Effect */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl ${theme.glow}`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${theme.bg} border ${theme.border} ${theme.icon}`}>
                  <AlertCircle size={32} />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {message}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 rounded-xl text-slate-900 font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 ${theme.button}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                       <span className="w-3 h-3 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                       Processing...
                    </span>
                  ) : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
