
import React from "react";
import { motion } from "framer-motion";
import CrownLoader from "./CrownLoader";

interface FullPageLoaderProps {
  show: boolean;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-white dark:bg-dental-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CrownLoader  />
      <motion.p
        className="mt-6 text-xl text-dental-gold font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        جاري التحميل...
      </motion.p>
    </motion.div>
  );
};

export default FullPageLoader;
