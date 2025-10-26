
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter } from "lucide-react";
import LazyImage from "./LazyImage";
import { CSSProperties } from "react";

interface DoctorCardProps {
  name: string;
  title: string;
  image: string;
  specialty: string;
  description: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  className?: string;
  style?: CSSProperties;
}

export default function DoctorCard({
  name,
  title,
  image,
  specialty,
  description,
  social,
  className,
  style,
}: DoctorCardProps) {
  return (
    <div 
      className={cn(
        "doctor-card group",
        className
      )}
      style={style}
    >
      <div className="relative overflow-hidden rounded-lg mb-6 h-64">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dental-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex space-x-3 rtl:space-x-reverse">
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-dental-gold flex items-center justify-center text-white hover:bg-white hover:text-dental-gold transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-dental-gold flex items-center justify-center text-white hover:bg-white hover:text-dental-gold transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {social?.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-dental-gold flex items-center justify-center text-white hover:bg-white hover:text-dental-gold transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold font-playfair mb-1">{name}</h3>
        <p className="text-dental-gold font-medium text-sm mb-3">{title}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}
