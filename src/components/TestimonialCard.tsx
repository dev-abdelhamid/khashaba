
import { cn } from "@/lib/utils";
import LazyImage from "./LazyImage";
import { CSSProperties } from "react";

interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating: number;
  className?: string;
  style?: CSSProperties;
}

export default function TestimonialCard({
  name,
  role,
  content,
  avatar,
  rating,
  className,
  style,
}: TestimonialCardProps) {
  return (
    <div 
      className={cn(
        "testimonial-card",
        className
      )}
      style={style}
    >
      <div className="flex items-center mb-4">
        {avatar && (
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <LazyImage
              src={avatar}
              alt={name}
              className="h-14 w-14 rounded-full object-cover border-2 border-dental-gold"
            />
          </div>
        )}
        <div>
          <h4 className="font-bold">{name}</h4>
          {role && <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>}
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0",
                  i < rating ? "text-dental-gold" : "text-gray-300 dark:text-gray-600"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">{content}</p>
    </div>
  );
}
