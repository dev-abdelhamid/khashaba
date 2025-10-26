import React from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dental-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <img 
            src="/logogold.png" 
            alt="Khashaba Dental Clinics" 
            className="h-24 md:h-28 mb-6"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>
                
        <motion.div 
          className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-400"
        >
          جاري التحميل...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
