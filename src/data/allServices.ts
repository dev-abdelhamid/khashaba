export interface Service {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  link: string;
  category: string;
  keywords: string[];
}

export const allServices: Service[] = [
  // Veneers
  {
    id: 1,
    title: { ar: "فينيرز الأسنان", en: "Dental Veneers" },
    description: {
      ar: "حلمك بابتسامة هوليود بقى حقيقة مع فينيرز الأسنان في عيادة د. محمد خشبة بالمنصورة! بنختار درجة اللون والشفافية بعناية فائقة عشان تديك مظهر طبيعي يلفت الأنظار. فينيرز الإيماكس بتقنياتنا المتطورة بتضمنلك نتيجة تدوم مدى الحياة. لو عايز ثقة جديدة وابتسامة تجذب الكل، احجز موعدك النهاردة واستمتع بتجربة مختلفة!",
      en: "Your dream of a Hollywood smile comes true with dental veneers at Dr. Mohamed Khashaba’s clinic in Mansoura! We carefully select the color and transparency for a natural, eye-catching look. Our advanced Emax veneers ensure lifelong results. If you want newfound confidence and a smile that captivates, book your appointment today and experience the difference!"
    },
    image: "/vennn.jpg",
    link: "/services/veneers",
    category: "cosmetic",
    keywords: [
      "أفضل دكتور فينيرز بالمنصورة",
      "فينيرز أسنان المنصورة",
      "هوليود سمايل المنصورة",
      "تجميل الأسنان القاهرة",
      "فينيرز السعودية",
      "فينيرز الإمارات",
      "د. محمد خشبة",
      "ابتسامة هوليود مصر",
      "فينيرز إيماكس المنصورة",
      "أفضل عيادة أسنان بالمنصورة"
    ]
  },



  {
    id: 2,
    title: { ar: "زراعة الأسنان", en: "Dental Implants" },
    description: {
      ar: "استعد قوة ابتسامتك مع زراعة الأسنان في عيادة د. محمد خشبة بالمنصورة! بنستخدم أحدث التقنيات عشان نضمن تركيب دقيق ونتايج قوية زي الأسنان الطبيعية. لو عايز تستمتع بأكلك وابتسامتك بدون أي قلق، زراعة الأسنان هي الحل الأمثل. احجز استشارتك وخلّي فريقنا يرجعلك الثقة بخطوات بسيطة ومريحة!",
      en: "Restore the strength of your smile with dental implants at Dr. Mohamed Khashaba’s clinic in Mansoura! We use cutting-edge technology for precise placement and results that feel like natural teeth. If you want to enjoy eating and smiling without worry, dental implants are the perfect solution. Book your consultation and let our team bring back your confidence with simple, comfortable steps!"
    },
    image: "/fahhhhs.webp",
    link: "/services/dental-implants",
    category: "implants",
    keywords: [
      "أفضل دكتور زراعة أسنان بالمنصورة",
      "زراعة أسنان المنصورة",
      "زراعة الأسنان القاهرة",
      "زراعة أسنان السعودية",
      "زراعة أسنان الإمارات",
      "د. محمد خشبة",
      "أفضل عيادة زراعة أسنان بالمنصورة",
      "ابتسامة قوية مصر",
      "زراعة أسنان حديثة المنصورة",
      "زراعة أسنان دائمة مصر"
    ]
  },
  // Composite Veneers
  {
    id: 3,
    title: { ar: "كومبوزيت فينيرز", en: "Composite Veneers" },
    description: {
      ar: "غيّر مظهر ابتسامتك بسرعة وسهولة مع كومبوزيت فينيرز في عيادة د. محمد خشبة بالمنصورة! بنركز على التفاصيل من اختيار اللون المناسب للشفافية المثالية عشان تديك ابتسامة طبيعية ومشرقة في جلسات قليلة. الخدمة دي مثالية لو عايز نتيجة سريعة بجودة عالية. تواصل معانا وابدأ رحلتك نحو ابتسامة أحلامك النهاردة!",
      en: "Transform your smile quickly and easily with composite veneers at Dr. Mohamed Khashaba’s clinic in Mansoura! We focus on details, from choosing the right color to perfect transparency, for a natural, radiant smile in just a few sessions. This service is ideal for quick, high-quality results. Contact us and start your journey to your dream smile today!"
    },
    image: "/Nothing different or new .. The well known E-Max veneers but in a process done with complete pas (3).jpg",
    link: "/services/composite-veneers",
    category: "cosmetic",
    keywords: [
      "أفضل دكتور كومبوزيت فينيرز بالمنصورة",
      "كومبوزيت فينيرز المنصورة",
      "تجميل الأسنان الإسكندرية",
      "ابتسامة طبيعية مصر",
      "كومبوزيت فينيرز السعودية",
      "كومبوزيت فينيرز الإمارات",
      "د. محمد خشبة",
      "أفضل عيادة تجميل أسنان بالمنصورة",
      "ابتسامة مشرقة المنصورة",
      "كومبوزيت فينيرز مصر"
    ]
  },
  // Dental Implants
  
  // Orthodontics
  {
    id: 4,
    title: { ar: "تقويم الأسنان", en: "Orthodontics" },
    description: {
      ar: "امنح أسنانك التناسق المثالي مع تقويم الأسنان في عيادة د. محمد خشبة بالمنصورة! سواء كنت عايز تقويم شفاف عصري أو تقليدي قوي، بنختار الحل اللي يناسبك عشان تحصل على ابتسامة منظمة وجذابة. فريقنا بيستخدم تقنيات متطورة عشان العلاج يكون مريح وسريع. ابدأ خطوة نحو ابتسامة واثقة وتواصل معانا النهاردة!",
      en: "Give your teeth perfect alignment with orthodontics at Dr. Mohamed Khashaba’s clinic in Mansoura! Whether you want modern clear braces or strong traditional ones, we choose the solution that suits you for a neat, attractive smile. Our team uses advanced techniques for comfortable and fast treatment. Take the first step toward a confident smile and contact us today!"
    },
    image: "/taq.webp",
    link: "/services/orthodontics",
    category: "orthodontics",
    keywords: [
      "أفضل دكتور تقويم أسنان بالمنصورة",
      "تقويم أسنان المنصورة",
      "تقويم أسنان شفاف القاهرة",
      "تقويم أسنان السعودية",
      "تقويم أسنان الإمارات",
      "د. محمد خشبة",
      "أفضل عيادة تقويم أسنان بالمنصورة",
      "ابتسامة متناسقة مصر",
      "تقويم أسنان حديث المنصورة",
      "تقويم أسنان مريح مصر"
    ]
  },
  // Teeth Whitening
  {
    id: 5,
    title: { ar: "تبييض الأسنان", en: "Teeth Whitening" },
    description: {
      ar: "خلّي ابتسامتك تلمع زي النجوم مع تبييض الأسنان بالليزر في عيادة د. محمد خشبة بالمنصورة! بنستخدم تقنيات آمنة وحديثة عشان تديك بياض طبيعي يدوم طويلاً في جلسة واحدة. لو عايز تبهر الكل بابتسامة مشرقة، جرب خدمتنا اللي بتجمع بين السرعة والجودة العالية. احجز موعدك النهاردة واستمتع بثقة جديدة!",
      en: "Make your smile shine like the stars with laser teeth whitening at Dr. Mohamed Khashaba’s clinic in Mansoura! We use safe, modern techniques for long-lasting, natural whiteness in just one session. If you want to dazzle everyone with a radiant smile, try our service that blends speed and high quality. Book your appointment today and embrace new confidence!"
    },
    image: "/تبييض.jpg",
    link: "/services/teeth-whitening",
    category: "cosmetic",
    keywords: [
      "أفضل دكتور تبييض أسنان بالمنصورة",
      "تبييض أسنان المنصورة",
      "تبييض أسنان الإسكندرية",
      "تبييض أسنان السعودية",
      "تبييض أسنان الإمارات",
      "د. محمد خشبة",
      "أفضل عيادة تبييض أسنان بالمنصورة",
      "ابتسامة بيضاء مصر",
      "تبييض أسنان بالليزر المنصورة",
      "تبييض أسنان آمن مصر"
    ]
  },
  // Clear Aligners
  {
    id: 6,
    title: { ar: "تقويم شفاف", en: "Clear Aligners" },
    description: {
      ar: "حقق تناسق أسنانك بسهولة مع التقويم الشفاف في عيادة د. محمد خشبة بالمنصورة! تقنية مريحة وغير ملحوظة لابتسامة مثالية بدون إحراج. بنستخدم أحدث الأنظمة لضمان نتايج سريعة وفعالة. احجز استشارتك النهاردة وابدأ رحلتك نحو ابتسامة واثقة!",
      en: "Achieve perfect teeth alignment easily with clear aligners at Dr. Mohamed Khashaba’s clinic in Mansoura! Comfortable, discreet technology for a perfect smile without embarrassment. We use the latest systems for fast, effective results. Book your consultation today and start your journey to a confident smile!"
    },
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=90&w=1920&auto=format&fit=crop",
    link: "/services/clear-aligners",
    category: "orthodontics",
    keywords: [
      "تقويم شفاف المنصورة",
      "تقويم أسنان شفاف القاهرة",
      "تقويم شفاف السعودية",
      "تقويم شفاف الإمارات",
      "د. محمد خشبة",
      "عيادة تقويم شفاف بالمنصورة",
      "ابتسامة متناسقة مصر",
      "تقويم شفاف حديث المنصورة",
      "تقويم أسنان مريح مصر",
      "أفضل دكتور تقويم شفاف بالمنصورة"
    ]
  }
];