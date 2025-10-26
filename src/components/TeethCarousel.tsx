
import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Star, Sparkles } from "lucide-react";

const TeethCarousel = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Tooth icon SVG component
  const ToothIcon = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 5.5c-1.5-1-4-1-5.5-.5-1.5.5-2.5 1.5-3 3-.5 1.5-.5 3 0 4.5.5 1.5 1.5 2.5 3 3s3 .5 4.5 0c1.5-.5 2.5-1.5 3-3 .5-1.5.5-3 0-4.5-.5-1.5-1.5-2.5-3-3z" />
      <path d="M9 4c-.5-1.5-2.5-1.5-3 0-.5 1.5-1 6 0 8 1 2 3 3 4.5 1.5 1.5-1.5 1-4 0-6-.3-.6-1-2-1.5-3.5z" />
      <path d="M15 4c.5-1.5 2.5-1.5 3 0 .5 1.5 1 6 0 8-1 2-3 3-4.5 1.5-1.5-1.5-1-4 0-6 .3-.6 1-2 1.5-3.5z" />
    </svg>
  );

  // Carousel items
  const carouselItems = [
    {
      title: "تقويم الأسنان",
      description: "نقدم خدمات تقويم الأسنان بأحدث التقنيات والأساليب العلاجية لتصحيح وضعية الأسنان.",
      icon: <ToothIcon className="h-12 w-12 text-dental-gold" />,
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "زراعة الأسنان",
      description: "نقدم خدمات زراعة الأسنان بأحدث التقنيات والأجهزة لتعويض الأسنان المفقودة.",
      icon: <Crown className="h-12 w-12 text-dental-gold" />,
      color: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "تبييض الأسنان",
      description: "نقدم خدمات تبييض الأسنان بأحدث التقنيات للحصول على ابتسامة أكثر إشراقاً.",
      icon: <Star className="h-12 w-12 text-dental-gold" />,
      color: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "حشو الأسنان",
      description: "نقدم خدمات حشو الأسنان بمواد عالية الجودة ومتطابقة مع لون الأسنان الطبيعي.",
      icon: <ToothIcon className="h-12 w-12 text-dental-gold" />,
      color: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "تركيبات الأسنان",
      description: "نقدم خدمات تركيبات الأسنان المتحركة والثابتة بأحدث التقنيات وأجود الخامات.",
      icon: <Crown className="h-12 w-12 text-dental-gold" />,
      color: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      title: "طب أسنان الأطفال",
      description: "نقدم خدمات طب أسنان الأطفال بأسلوب مميز يساعد طفلك على تجربة طبية ممتعة.",
      icon: <Sparkles className="h-12 w-12 text-dental-gold" />,
      color: "bg-cyan-50 dark:bg-cyan-900/20"
    }
  ];

  return (
    <motion.div 
      className="w-full py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <motion.div variants={itemVariants}>
                <Card className={`${item.color} border-none shadow-md hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-white dark:bg-dental-black p-4 shadow-md">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
                    <p className="text-center text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-dental-gold text-dental-gold" />
        <CarouselNext className="border-dental-gold text-dental-gold" />
      </Carousel>
    </motion.div>
  );
};

export default TeethCarousel;
