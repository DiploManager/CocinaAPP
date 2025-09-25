import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${
        hover ? 'hover:shadow-lg hover:border-gray-200 transition-all duration-300' : ''
      } ${className}`}
      whileHover={hover ? { y: -2 } : {}}
    >
      {children}
    </motion.div>
  );
}