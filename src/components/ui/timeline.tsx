import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import LazyImage from "@/components/LazyImage";

interface TimelineEntry {
  step: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
  isRTL?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({
  data,
  title = "Changelog from my journey",
  subtitle = "A journey through our process.",
  isRTL = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <div
      className={cn("w-full font-amiri", isRTL ? "text-right" : "text-left")}
      ref={containerRef}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto pb-12">
        <div
          className={cn(
            "absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-dental-gold/50 to-transparent hidden md:block",
            isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"
          )}
          style={{ height: height + "px" }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-dental-gold rounded-full"
          />
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col md:flex-row items-start mb-6 sm:mb-8 gap-3 md:gap-4"
            )}
          >
            <div
              className={cn(
                "w-full md:w-[48%] relative",
                isRTL && index % 2 === 0 ? "md:pr-2" : "md:pl-2",
                !isRTL && index % 2 === 0 ? "md:pl-2" : "md:pr-2",
                index % 2 === 0
                  ? isRTL
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                  : isRTL
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              )}
            >
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-dental-gold rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {item.step}
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                {item.description}
              </p>
              {item.imageSrc && (
                <LazyImage
                  src={item.imageSrc}
                  alt={item.imageAlt || `${item.step} image`}
                  className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
              )}
            </div>
            <div
              className={cn(
                "hidden md:flex items-center justify-center w-8 h-8 bg-dental-gold rounded-full shadow-md absolute left-1/2 -translate-x-1/2",
                index % 2 === 0
                  ? isRTL
                    ? "md:pr-2"
                    : "md:pl-2"
                  : isRTL
                  ? "md:pl-2"
                  : "md:pr-2"
              )}
            >
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
            <div
              className={cn(
                "hidden md:block md:w-[48%]",
                isRTL && index % 2 === 0 ? "md:pl-2" : "md:pr-2",
                !isRTL && index % 2 === 0 ? "md:pr-2" : "md:pl-2"
              )}
            >
              {item.imageSrc && index % 2 !== 0 && (
                <LazyImage
                  src={item.imageSrc}
                  alt={item.imageAlt || `${item.step} image`}
                  className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
