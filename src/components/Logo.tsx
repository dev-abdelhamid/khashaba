import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Logo = ({ scrolled, isRTL, isMobile = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "",
        isMobile 
          ? "h-16  w-18" 
          : scrolled ? "h-14 w-auto" : "h-14 w-auto"
      )}
    >
      <img 
        src="/logogold.png" 
        alt="Dr. Mohamed Khashaba Logo"
        className="h-16 md:20 w-auto object-contain " 
      />
    </motion.div>
  );
};

export default Logo;
