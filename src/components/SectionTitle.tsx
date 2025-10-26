
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  center = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(
      "mb-8   align-center  flex justify-center px-2  leading-relaxed md:leading-relaxed   dark:text-white flex-col items-center ",
      " text-center   ",
      className
    )}>
      {subtitle && (
        <span className="section-subtitle    dark:text-white inline-block">{subtitle}</span>
      )}
      
      <p className={cn(
          "text-2xl md:text-3xl  dark:text-white  lg:text-4xl font-extrabold leading-[1.7] "
      )}>
        {title}
      </p>
      {description && (
        <p className="text-gray-600 leading-[1.6] px-2   dark:text-gray-300 mt-4 max-w-7xl">
          {description}
        </p>
      )}
    </div>
  );
}
