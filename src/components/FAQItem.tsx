import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

export interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  const { language = "ar" } = useApp();
  const isRTL = language === "ar";

  return (
    <div className="border border-dental-gold/20 rounded-lg overflow-hidden mb-4 shadow-sm bg-white dark:bg-dental-black/50">
      <button
        className={cn(
          "w-full flex justify-between items-center p-4 font-medium transition-colors duration-200",
          isOpen
            ? "bg-dental-gold/10 text-dental-gold"
            : "bg-white dark:bg-dental-black/40 hover:bg-dental-gold/5 text-gray-800 dark:text-gray-200",
          isRTL ? "text-right" : "text-left"
        )}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
        role="button"
      >
        <span className="text-sm md:text-lg font-amiri leading-tight">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-dental-gold" />
        ) : (
          <ChevronDown className="h-5 w-5 text-dental-gold" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
            id={`faq-answer-${question}`}
          >
            <div
              className={cn(
                "p-4 bg-white dark:bg-dental-black/20 text-gray-600 dark:text-gray-300 text-sm md:text-base",
                isRTL ? "text-right" : "text-left"
              )}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;