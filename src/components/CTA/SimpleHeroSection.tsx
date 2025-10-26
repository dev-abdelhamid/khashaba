import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";

interface SimpleHeroSectionProps {
  Badge: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const SimpleHeroSection = ({
  Badge,
  title,
  subtitle,
  backgroundImage
}: SimpleHeroSectionProps) => {
  const { language, isRTL } = useApp();

  return (
    <section className="relative pt-28 mt-20 py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover" 
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dental-dark/80 via-dental-primary/70 to-dental-dark/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center text-white"
          dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Conditionally render badge only if provided */}
          {Badge && (
            <motion.div
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-dental-gold/10 backdrop-blur-md border border-dental-gold/40 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
                <div className="absolute inset-0 rounded-full overflow-hidden -z-10 border border-yellow-400/60 "></div>

              <span className="">
                {Badge}
              </span>
            </motion.div>
          )}
          
          <h1 className="text-4xl lg:text-5xl  font-bold mb-6 leading-[1.6]">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleHeroSection;
