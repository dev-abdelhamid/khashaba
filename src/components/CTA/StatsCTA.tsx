import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function StatCounter({ value, label, suffix = "+", duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const totalMilSecDur = duration;
    const incrementTime = totalMilSecDur / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-dental-gold mb-2 font-playfair">
        {count}{suffix}
      </div>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
}

export default function StatsCTA() {
  const { isRTL } = useApp();

  const getStats = (isRTL: boolean) => [
    { 
      value: 8, 
      label: isRTL ? "سنوات من الخبرة" : "Years of Experience", 
      suffix: "+" 
    },
    { 
      value: 5000, 
      label: isRTL ? "مريض سعيد" : "Happy Patients", 
      suffix: "+" 
    },
    { 
      value: 3, 
      label: isRTL ? "دورة تدريبية" : "Training Courses", 
      suffix: "+" 
    },
    { 
      value: 5, 
      label: isRTL ? "أطباء متخصصين" : "Specialized Doctors", 
      suffix: "" 
    }
  ];

  const stats = getStats(isRTL);
  
  return (
    <>
      <section 
        className="py-6 bg-gradient-to-b from-dental-gold/20 to-white dark:from-dental-gold/20 dark:to-black"
        dir={isRTL ? "rtl" : "ltr"}
        aria-labelledby="stats-title"
      >
        <div className="px-4 md:px-6 lg:px-8 xl:px-10 mx-auto">
          <div className="text-center mb-12">
            <h2 
              id="stats-title"
              className={cn(
                "text-3xl md:text-4xl dark:text-white font-bold mb-4",
                isRTL ? "font-arabic" : "font-english"
              )}
            >
              {isRTL ? (
                <>أرقام <span className="text-dental-gold">تتحدث</span> عنا</>
              ) : (
                <>Numbers That <span className="text-dental-gold">Speak</span> For Us</>
              )}
            </h2>
            <p className={cn(
              "text-gray-600 dark:text-gray-300 max-w-2xl mx-auto",
              isRTL ? "font-arabic" : "font-english"
            )}>
              {isRTL 
                ? "نفتخر بإنجازاتنا وثقة مرضانا بنا على مدى سنوات من الخدمة المتميزة في مجال طب الأسنان"
                : "We are proud of our achievements and our patients' trust in us over years of distinguished service in dentistry"
              }
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StatCounter 
                key={index}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": isRTL ? "عيادة د. محمد خشبة لطب الأسنان" : "Dr. Mohamed Khashaba Dental Clinic",
            "description": isRTL 
              ? "عيادة طب أسنان متخصصة مع 12+ سنة خبرة و 5000+ مريض راضٍ"
              : "Specialized dental clinic with 12+ years experience and 5000+ satisfied patients",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500",
              "bestRating": "5"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "EG",
              "addressLocality": isRTL ? "القاهرة" : "Cairo"
            },
            "telephone": "+201234567890",
            "priceRange": "$$"
          })
        }}
      />

      {/* Hidden SEO Keywords Content */}
      <div className="sr-only">
        {/* Arabic SEO Keywords */}
        {isRTL ? (
          <>
            <h3>أفضل طبيب أسنان في مصر - د. محمد خشبة</h3>
            <p>
              طبيب أسنان متخصص، زراعة أسنان فورية، ابتسامة هوليود، تقويم أسنان شفاف، 
              تبييض أسنان بالليزر، فينير الأسنان، لومينير، علاج عصب الأسنان، 
              جراحة اللثة، تركيبات الأسنان، أسنان زيركون، أسنان إيماكس، 
              عيادة أسنان القاهرة، أفضل دكتور أسنان، طبيب أسنان تجميلي، 
              زراعة الأسنان بدون ألم، ابتسامة المشاهير، تجميل الأسنان، 
              علاج الأسنان، طوارئ الأسنان، أسعار زراعة الأسنان، 
              تكلفة ابتسامة هوليود، أفضل عيادة أسنان، طبيب أسنان أطفال، 
              تقويم الأسنان المعدني، تقويم الأسنان الشفاف، إنفزلاين، 
              تبييض الأسنان المنزلي، تنظيف الأسنان، علاج التهاب اللثة، 
              خلع ضرس العقل، حشو الأسنان، تاج الأسنان، جسر الأسنان، 
              طقم أسنان متحرك، طقم أسنان ثابت، زراعة عظم الفك، 
              رفع الجيوب الأنفية، جراحة الفكين، تجميل اللثة، 
              علاج الصرير، واقي الأسنان الليلي، فحص الأسنان الدوري، 
              أشعة الأسنان، أشعة بانوراما، أشعة ثلاثية الأبعاد للأسنان
            </p>
            <ul>
              <li>12+ سنوات خبرة في طب الأسنان التجميلي والعلاجي</li>
              <li>5000+ مريض حقق ابتسامة أحلامه في عيادتنا</li>
              <li>3+ دورات تدريبية متخصصة في أحدث تقنيات طب الأسنان</li>
              <li>5 أطباء متخصصين في جميع فروع طب الأسنان</li>
              <li>أحدث الأجهزة الألمانية والسويسرية في طب الأسنان</li>
              <li>تقنيات متطورة في زراعة الأسنان الفورية</li>
              <li>ضمان مدى الحياة على جميع أعمال زراعة الأسنان</li>
              <li>أسعار تنافسية مع إمكانية التقسيط بدون فوائد</li>
            </ul>
          </>
        ) : (
          <>
            <h3>Best Dentist in Egypt - Dr. Mohamed Khashaba</h3>
            <p>
              Specialized dentist, immediate dental implants, Hollywood smile, clear aligners, 
              laser teeth whitening, dental veneers, lumineers, root canal treatment, 
              gum surgery, dental crowns, zirconia teeth, emax teeth, 
              Cairo dental clinic, best dentist, cosmetic dentist, 
              painless dental implants, celebrity smile, dental aesthetics, 
              dental treatment, dental emergency, dental implant prices, 
              Hollywood smile cost, best dental clinic, pediatric dentist, 
              metal braces, clear braces, Invisalign, 
              home teeth whitening, dental cleaning, gum disease treatment, 
              wisdom tooth extraction, dental filling, dental crown, dental bridge, 
              removable dentures, fixed dentures, jaw bone grafting, 
              sinus lift, jaw surgery, gum contouring, 
              bruxism treatment, night guard, regular dental checkup, 
              dental X-ray, panoramic X-ray, 3D dental imaging
            </p>
            <ul>
              <li>12+ years experience in cosmetic and therapeutic dentistry</li>
              <li>5000+ patients achieved their dream smile at our clinic</li>
              <li>3+ specialized training courses in latest dental techniques</li>
              <li>5 specialized doctors in all branches of dentistry</li>
              <li>Latest German and Swiss dental equipment</li>
              <li>Advanced techniques in immediate dental implants</li>
              <li>Lifetime warranty on all dental implant work</li>
              <li>Competitive prices with interest-free installment options</li>
            </ul>
          </>
        )}
        
        {/* Location and Contact SEO */}
        <div>
          <strong>{isRTL ? "الموقع:" : "Location:"}</strong>
          {isRTL 
            ? "القاهرة، مصر - أفضل عيادة أسنان في القاهرة"
            : "Cairo, Egypt - Best dental clinic in Cairo"
          }
        </div>
        <div>
          <strong>{isRTL ? "التخصصات:" : "Specializations:"}</strong>
          {isRTL
            ? "زراعة أسنان، ابتسامة هوليود، تقويم أسنان، تبييض أسنان، فينير، لومينير"
            : "dental implants, Hollywood smile, orthodontics, teeth whitening, veneers, lumineers"
          }
        </div>
        <div>
          <strong>{isRTL ? "الخدمات:" : "Services:"}</strong>
          {isRTL
            ? "علاج الأسنان، تجميل الأسنان، جراحة الفم، طب أسنان الأطفال، طوارئ الأسنان"
            : "dental treatment, cosmetic dentistry, oral surgery, pediatric dentistry, dental emergency"
          }
        </div>
      </div>

      {/* Additional Meta Tags for SEO */}
      {typeof window !== 'undefined' && (
        <>
          <meta name="description" content={
            isRTL 
              ? "د. محمد خشبة - أفضل طبيب أسنان في مصر. 12+ سنة خبرة، 5000+ مريض راضٍ. زراعة أسنان فورية، ابتسامة هوليود، تقويم شفاف. احجز استشارتك المجانية!"
              : "Dr. Mohamed Khashaba - Best dentist in Egypt. 12+ years experience, 5000+ satisfied patients. Immediate dental implants, Hollywood smile, clear aligners. Book your free consultation!"
          } />
          <meta name="keywords" content={
            isRTL
              ? "طبيب أسنان, زراعة أسنان, ابتسامة هوليود, تقويم أسنان, تبييض أسنان, د محمد خشبة, عيادة أسنان القاهرة, أفضل طبيب أسنان مصر, فينير الأسنان, لومينير, علاج عصب, جراحة لثة"
              : "dentist, dental implants, Hollywood smile, orthodontics, teeth whitening, Dr Mohamed Khashaba, dental clinic Cairo, best dentist Egypt, dental veneers, lumineers, root canal, gum surgery"
          } />
          <meta property="og:title" content={
            isRTL
              ? "أرقام تتحدث عنا - د. محمد خشبة | أفضل طبيب أسنان في مصر"
              : "Numbers That Speak For Us - Dr. Mohamed Khashaba | Best Dentist in Egypt"
          } />
          <meta property="og:description" content={
            isRTL
              ? "12+ سنة خبرة، 5000+ مريض راضٍ، 3+ دورات تدريبية، 5 أطباء متخصصين. أرقام تؤكد تميزنا في طب الأسنان"
              : "12+ years experience, 5000+ satisfied patients, 3+ training courses, 5 specialized doctors. Numbers that confirm our excellence in dentistry"
          } />
        </>
      )}
    </>
  );
}
