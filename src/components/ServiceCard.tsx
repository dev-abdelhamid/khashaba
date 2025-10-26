
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
  itemScope?: boolean;
  itemType?: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  link,
  className,
  itemScope,
  itemType,
}: ServiceCardProps) {
  const { isRTL, language } = useApp();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={link}
      className="block group"
      aria-label={language === 'ar' ? `تعرف على المزيد عن ${title}` : `Learn more about ${title}`}
    >
      <article
        className={cn(
          'relative h-[320px] overflow-hidden rounded-xl transition-all duration-300',
          className
        )}
        itemScope={itemScope}
        itemType={itemType}
      >
        {/* Skeleton Loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer rounded-xl flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-gray-300/50 dark:bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
        )}

        {/* Image */}
        <img
          src={image}
          alt={language === 'ar' ? `${title} - خدمات طب الأسنان في المنصورة` : `${title} - Dental Services in Mansoura`}
          loading="lazy"
          
          className={cn(
            'absolute inset-0 w-full h-full object-cover  transition-opacity duration-500',
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col justify-end h-full">
          <h3 className="text-xl font-bold text-white mb-2" itemProp="name">
            {title}
          </h3>
          <p className="text-sm text-gray-200 mb-4 line-clamp-2" itemProp="description">
            {description}
          </p>
          <div className="flex items-center underline  justify-center text-sm text-dental-gold font-medium">
            <span>{language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}</span>
           
          </div>
        </div>

        {/* Schema.org Microdata */}
        <meta itemProp="image" content={image} />
        <meta itemProp="url" content={`https://khashaba-clinics.tsd-education.com${link}`} />
        <meta itemProp="serviceType" content={title} />
        <meta itemProp="provider" content="Dr. Mohamed Khashaba Clinic" />
      </article>
    </Link>
  );
}