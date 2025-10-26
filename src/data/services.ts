export interface Service {
  id: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  longDescription: { ar: string; en: string };
  image: string;
  icon: string;
  benefits: Array<{ ar: string; en: string }>;
  process: Array<{
    title: { ar: string; en: string };
    description: { ar: string; en: string };
  }>;
  materials: Array<{
    name: { ar: string; en: string };
    description: { ar: string; en: string };
  }>;
  types: Array<{
    name: { ar: string; en: string };
    description: { ar: string; en: string };
  }>;
  statistics: Array<{ number: string; label: string }>;
  recommendations: Array<{ ar: string; en: string }>;
  cases: Array<{
    title: { ar: string; en: string };
    description: { ar: string; en: string };
  }>;
  recovery: {
    time: string;
    painLevel: string;
    restrictions: string;
  };
  doctorProfile: {
    name: string;
    title: string;
    experience: string;
    awards: string;
    image: string;
  };
  faq: Array<{
    question: { ar: string; en: string };
    answer: { ar: string; en: string };
  }>;
  gallery: Array<{
    before: string;
    after: string;
    description: { ar: string; en: string };
  }>;
}

export const servicesData: Record<string, Service> = {
  // تبييض الأسنان
  "teeth-whitening": {
    id: "teeth-whitening",
    title: { ar: "تبييض الأسنان", en: "Teeth Whitening" },
    subtitle: { ar: "ابتسامة مشرقة وواثقة في جلسة واحدة", en: "Radiant and Confident Smile in One Session" },
    description: {
      ar: "تقنيات متطورة لتبييض الأسنان بأمان لإزالة البقع وتحقيق ابتسامة مشرقة في المنصورة.",
      en: "Advanced, safe whitening techniques to remove stains and achieve a radiant smile in Mansoura."
    },
    longDescription: {
      ar: "في عيادة د. محمد خشبة، نقدم تبييض الأسنان باستخدام أحدث التقنيات ومواد آمنة مثل البيروكسيد لإزالة البقع الناتجة عن القهوة، الشاي، أو التدخين، مما يمنحك ابتسامة هوليوودية واثقة في جلسة واحدة. نضمن نتائج فورية وطويلة الأمد مع تجربة مريحة وآمنة.",
      en: "At Dr. Mohamed Khashaba’s clinic, we offer teeth whitening using cutting-edge technology and safe materials like peroxide to remove stains from coffee, tea, or smoking, giving you a confident Hollywood smile in one session. We ensure immediate, long-lasting results with a comfortable and safe experience."
    },
    image: "/تبييض.jpg",
    icon: "/icons/teeth-whitening.svg",
    benefits: [
      { ar: "ابتسامة مشرقة تعزز الثقة", en: "Radiant smile boosting confidence" },
      { ar: "إزالة البقع من القهوة والتدخين", en: "Removal of coffee and smoking stains" },
      { ar: "إجراء آمن ومريح", en: "Safe and comfortable procedure" },
      { ar: "نتائج فورية في جلسة واحدة", en: "Instant results in one session" },
      { ar: "تحسين المظهر العام للأسنان", en: "Enhanced overall teeth appearance" },
      { ar: "تجربة مخصصة في المنصورة", en: "Customized experience in Mansoura" }
    ],
    process: [
      { title: { ar: "التقييم الأولي", en: "Initial Evaluation" }, description: { ar: "فحص الأسنان لتحديد مدى ملاءمتها للتبييض.", en: "Assessing teeth suitability for whitening." } },
      { title: { ar: "حماية اللثة", en: "Gum Protection" }, description: { ar: "تطبيق مادة واقية لحماية اللثة أثناء الإجراء.", en: "Applying protective material to shield gums." } },
      { title: { ar: "تطبيق مادة التبييض", en: "Whitening Application" }, description: { ar: "وضع مادة التبييض على الأسنان بدقة.", en: "Precisely applying whitening agent to teeth." } },
      { title: { ar: "تفعيل التبييض", en: "Whitening Activation" }, description: { ar: "استخدام ليزر لتسريع عملية التبييض.", en: "Using laser to accelerate whitening process." } },
      { title: { ar: "الغسيل والتقييم", en: "Rinsing and Assessment" }, description: { ar: "غسل المبيض وتقييم النتائج النهائية.", en: "Rinsing whitener and evaluating final results." } },
      { title: { ar: "نصائح الصيانة", en: "Maintenance Tips" }, description: { ar: "تقديم نصائح للحفاظ على ابتسامة مشرقة.", en: "Providing tips to maintain a bright smile." } }
    ],
    materials: [
      { name: { ar: "بيروكسيد الهيدروجين", en: "Hydrogen Peroxide" }, description: { ar: "مادة آمنة وفعالة لتبييض الأسنان بسرعة.", en: "Safe and effective material for rapid whitening." } },
      { name: { ar: "ليزر التبييض", en: "Whitening Laser" }, description: { ar: "تقنية متقدمة لتفعيل مادة التبييض.", en: "Advanced technology to activate whitening agent." } },
      { name: { ar: "جل حماية اللثة", en: "Gum Protection Gel" }, description: { ar: "يحمي اللثة من المواد أثناء الإجراء.", en: "Protects gums during the procedure." } }
    ],
    types: [
      { name: { ar: "تبييض داخل العيادة", en: "In-Office Whitening" }, description: { ar: "إجراء سريع وفعال باستخدام ليزر في العيادة.", en: "Quick and effective laser-based in-office whitening." } },
      { name: { ar: "تبييض منزلي مخصص", en: "Custom At-Home Whitening" }, description: { ar: "قوالب مخصصة للتبييض في المنزل براحة.", en: "Custom trays for comfortable at-home whitening." } },
      { name: { ar: "تبييض مدمج", en: "Combined Whitening" }, description: { ar: "مزيج من التبييض داخل وخارج العيادة لنتائج مثالية.", en: "Combination of in-office and at-home for optimal results." } }
    ],
    statistics: [
      { number: "90%", label: "رضا العملاء" },
      { number: "15+", label: "سنوات الخبرة" },
      { number: "7000+", label: "جلسة تبييض ناجحة" },
      { number: "60 دقيقة", label: "مدة الجلسة" },
      { number: "2-4", label: "درجات تفتيح" },
      { number: "6-12", label: "أشهر مدة النتائج" }
    ],
    recommendations: [
      { ar: "تجنب المشروبات الملونة لمدة 48 ساعة", en: "Avoid colored beverages for 48 hours" },
      { ar: "تنظيف الأسنان يوميًا بالفرشاة والخيط", en: "Brush and floss teeth daily" },
      { ar: "إجراء جلسات صيانة دورية", en: "Schedule regular maintenance sessions" },
      { ar: "استخدام معجون أسنان مبيض لطيف", en: "Use gentle whitening toothpaste" },
      { ar: "تقليل القهوة والشاي للحفاظ على النتائج", en: "Reduce coffee and tea to maintain results" }
    ],
    cases: [
      { title: { ar: "بقع سطحية", en: "Surface Stains" }, description: { ar: "إزالة بقع القهوة والشاي بسهولة.", en: "Easily removing coffee and tea stains." } },
      { title: { ar: "اصفرار طبيعي", en: "Natural Yellowing" }, description: { ar: "تفتيح الأسنان الصفراء لمظهر طبيعي.", en: "Brightening yellowed teeth for a natural look." } },
      { title: { ar: "بقع التدخين", en: "Smoking Stains" }, description: { ar: "إزالة بقع النيكوتين لابتسامة مشرقة.", en: "Removing nicotine stains for a radiant smile." } },
      { title: { ar: "تبييض بعد التقويم", en: "Post-Orthodontic Whitening" }, description: { ar: "تعزيز الابتسامة بعد إزالة التقويم.", en: "Enhancing smile after braces removal." } }
    ],
    recovery: {
      time: "فوري، مع حساسية محتملة لمدة يوم",
      painLevel: "غير مؤلم، حساسية خفيفة محتملة",
      restrictions: "تجنب الأطعمة والمشروبات الملونة لمدة 48 ساعة"
    },
    doctorProfile: {
      name: "د. محمد خشبة",
      title: "استشاري طب الأسنان التجميلي",
      experience: "15+ سنة",
      awards: "عضو الجمعية العالمية لطب الأسنان التجميلي",
      image: "/dr2.jpg"
    },
    faq: [
      { question: { ar: "هل تبييض الأسنان آمن؟", en: "Is teeth whitening safe?" }, answer: { ar: "نعم، آمن تمامًا تحت إشراف طبيب متخصص.", en: "Yes, completely safe under professional supervision." } },
      { question: { ar: "كم تدوم نتائج التبييض؟", en: "How long do whitening results last?" }, answer: { ar: "من 6 أشهر إلى سنتين مع العناية المناسبة.", en: "From 6 months to 2 years with proper care." } },
      { question: { ar: "هل يسبب حساسية دائمة؟", en: "Does it cause permanent sensitivity?" }, answer: { ar: "لا، الحساسية مؤقتة وتختفي خلال يوم أو اثنين.", en: "No, sensitivity is temporary and fades within a day or two." } }
    ],
      "gallery": [
 
      { "before": "/before.jpg", "after": "/after.jpg", "description": { "ar": "زراعة فورية", "en": "Immediate implant" } }
    ]
  },
  // زراعة الأسنان
  "dental-implants": {
    id: "dental-implants",
    title: { ar: "زراعة الأسنان", en: "Dental Implants" },
    subtitle: { ar: "حل دائم لاستعادة ابتسامتك", en: "Permanent Solution to Restore Your Smile" },
    description: {
      ar: "غرسات تيتانيوم متطورة لاستبدال الأسنان المفقودة، توفر مظهرًا طبيعيًا ووظيفة مثالية في المنصورة.",
      en: "Advanced titanium implants to replace missing teeth, offering a natural look and perfect function in Mansoura."
    },
    longDescription: {
      ar: "في عيادة د. محمد خشبة، نقدم زراعة الأسنان كحل مثالي ودائم لاستبدال الأسنان المفقودة. نستخدم غرسات تيتانيوم عالية الجودة تتكامل مع عظم الفك، مما يوفر أساسًا قويًا للأسنان الاصطناعية. هذا الإجراء يعيد وظيفة الفم الطبيعية، يحسن المظهر الجمالي، ويمنع فقدان العظم، مما يجعلنا الخيار الأول في المنصورة.",
      en: "At Dr. Mohamed Khashaba’s clinic, we provide dental implants as the ideal, permanent solution for missing teeth. Using high-quality titanium implants that integrate with the jawbone, we create a strong foundation for artificial teeth. This procedure restores natural mouth function, enhances aesthetics, and prevents bone loss, making us the top choice in Mansoura."
    },
    "image": "/imp.jpg",
    icon: "/icons/dental-implants.svg",
    benefits: [
      { ar: "استبدال دائم للأسنان المفقودة", en: "Permanent replacement for missing teeth" },
      { ar: "مظهر طبيعي وجمالي", en: "Natural and aesthetic appearance" },
      { ar: "منع فقدان عظم الفك", en: "Prevention of jawbone loss" },
      { ar: "تحسين المضغ والنطق", en: "Improved chewing and speech" },
      { ar: "متانة تدوم مدى الحياة", en: "Durability lasting a lifetime" },
      { ar: "تعزيز الثقة بالنفس", en: "Boosted self-confidence" }
    ],
    process: [
      { title: { ar: "التقييم والتخطيط", en: "Evaluation and Planning" }, description: { ar: "فحص شامل وأشعة ثلاثية الأبعاد لوضع خطة مخصصة.", en: "Comprehensive exam and 3D imaging for customized planning." } },
      { title: { ar: "زراعة الغرسة", en: "Implant Placement" }, description: { ar: "إدخال غرسة التيتانيوم في الفك بدقة جراحية.", en: "Surgical insertion of titanium implant into the jaw." } },
      { title: { ar: "فترة الاندماج", en: "Integration Period" }, description: { ar: "3-6 أشهر لاندماج الغرسة مع العظم.", en: "3-6 months for implant to fuse with bone." } },
      { title: { ar: "تركيب الدعامة", en: "Abutment Placement" }, description: { ar: "تثبيت الدعامة التي تربط الغرسة بالتاج.", en: "Attaching abutment to connect implant to crown." } },
      { title: { ar: "تركيب التاج", en: "Crown Placement" }, description: { ar: "وضع السن الاصطناعي المصمم خصيصًا.", en: "Placing custom-made artificial tooth." } },
      { title: { ar: "المتابعة", en: "Follow-up" }, description: { ar: "زيارات دورية لضمان النتائج طويلة الأمد.", en: "Regular check-ups for long-term success." } }
    ],
    materials: [
      { name: { ar: "غرسات تيتانيوم", en: "Titanium Implants" }, description: { ar: "مادة متينة ومتوافقة حيويًا لاندماج مثالي.", en: "Durable, biocompatible material for optimal integration." } },
      { name: { ar: "تيجان زيركون", en: "Zirconia Crowns" }, description: { ar: "تيجان طبيعية المظهر للأسنان الاصطناعية.", en: "Natural-looking crowns for artificial teeth." } },
      { name: { ar: "دعامات مخصصة", en: "Custom Abutments" }, description: { ar: "قطع دقيقة تربط الغرسة بالتاج.", en: "Precise components connecting implant to crown." } }
    ],
    types: [
      { name: { ar: "زراعة فردية", en: "Single Implant" }, description: { ar: "استبدال سن واحد مفقود بغرسة وتاج.", en: "Replacing one missing tooth with implant and crown." } },
      { name: { ar: "جسر مدعوم", en: "Implant-Supported Bridge" }, description: { ar: "استبدال عدة أسنان بجسر مدعوم بغرسات.", en: "Replacing multiple teeth with implant-supported bridge." } },
      { name: { ar: "طقم كامل مدعوم", en: "Full Arch Implant" }, description: { ar: "استبدال فك كامل بطقم مدعوم بغرسات.", en: "Replacing full jaw with implant-supported denture." } }
    ],
    statistics: [
      { number: "98%", label: "نسبة النجاح" },
      { number: "20+", label: "سنوات الخبرة" },
      { number: "5000+", label: "غرسة ناجحة" },
      { number: "3-6", label: "أشهر للاندماج" },
      { number: "99%", label: "رضا العملاء" },
      { number: "95%", label: "متانة طويلة الأمد" }
    ],
    recommendations: [
      { ar: "الحفاظ على نظافة الفم يوميًا", en: "Maintain daily oral hygiene" },
      { ar: "زيارات دورية كل 6 أشهر", en: "Regular check-ups every 6 months" },
      { ar: "تجنب التدخين لتعزيز الشفاء", en: "Avoid smoking to enhance healing" },
      { ar: "اتباع نظام غذائي ناعم أوليًا", en: "Follow a soft diet initially" },
      { ar: "استخدام غسول فم مضاد للبكتيريا", en: "Use antibacterial mouthwash" }
    ],
    cases: [
      { title: { ar: "فقدان سن أمامي", en: "Missing Front Tooth" }, description: { ar: "زراعة غرسة لتحسين المظهر الجمالي.", en: "Implant to enhance aesthetic appearance." } },
      { title: { ar: "فقدان أسنان خلفية", en: "Missing Back Teeth" }, description: { ar: "جسر مدعوم لاستعادة وظيفة المضغ.", en: "Implant-supported bridge to restore chewing function." } },
      { title: { ar: "فقدان فك كامل", en: "Full Jaw Loss" }, description: { ar: "طقم كامل مدعوم لابتسامة مريحة.", en: "Full implant-supported denture for comfort." } },
      { title: { ar: "زراعة فورية", en: "Immediate Implant" }, description: { ar: "زراعة بعد خلع سن متضرر.", en: "Implant after extracting damaged tooth." } }
    ],
    recovery: {
      time: "3-6 أشهر للاندماج، أسبوع للجرح الأولي",
      painLevel: "ألم خفيف يمكن التحكم به",
      restrictions: "تجنب الأطعمة الصلبة والتدخين لأسابيع"
    },
    doctorProfile: {
      name: "د. محمد خشبة",
      title: "استشاري زراعة الأسنان",
      experience: "20+ سنة",
      awards: "عضو الجمعية المصرية لزراعة الأسنان، أفضل طبيب زراعة في المنصورة",
      image: "/dr2.jpg"
    },
    faq: [
      { question: { ar: "كم تستغرق زراعة الأسنان؟", en: "How long does a dental implant take?" }, answer: { ar: "3-6 أشهر للاندماج مع جلسات قليلة.", en: "3-6 months for integration with minimal sessions." } },
      { question: { ar: "هل الإجراء مؤلم؟", en: "Is the procedure painful?" }, answer: { ar: "غير مؤلم مع التخدير، ألم خفيف بعد ذلك.", en: "Painless with anesthesia, mild discomfort after." } },
      { question: { ar: "ما نسبة نجاح الزراعة؟", en: "What is the success rate?" }, answer: { ar: "98% في عيادتنا بالمنصورة.", en: "98% at our Mansoura clinic." } }
    ],
    gallery: [
    ]
 
  },

  // قشور الأسنان (فينيرز)
  "veneers": {
    id: "veneers",
    title: { ar: "فينيرز الأسنان", en: " Veneers" },
    subtitle: { ar: "ابتسامة هوليوودية بمظهر طبيعي", en: "Hollywood Smile with a Natural Look" },
    description: {
      ar: "قشور رقيقة من البورسلين تُثبت على الأسنان لتحسين المظهر وإصلاح العيوب في المنصورة.",
      en: "Thin porcelain shells bonded to teeth to enhance appearance and fix imperfections in Mansoura."
    },
    longDescription: {
      ar: "فينيرز الأسنان في عيادة د. محمد خشبة هي الحل التجميلي المثالي لتصحيح التصبغات، التشققات، أو عدم الانتظام. نستخدم قشور بورسلين مخصصة لتوفير ابتسامة هوليوودية طبيعية ومتينة، مع تجربة مريحة ونتائج فورية تعزز الثقة بالنفس.",
      en: "Dental veneers at Dr. Mohamed Khashaba’s clinic are the perfect cosmetic solution for correcting discoloration, cracks, or misalignment. We use custom porcelain shells to deliver a natural, durable Hollywood smile, with a comfortable experience and instant results that boost confidence."
    },
    image: "/vennn.jpg",
    icon: "/icons/veneers.svg",
    benefits: [
      { ar: "تحسين فوري لشكل الأسنان", en: "Instant improvement in teeth appearance" },
      { ar: "مقاومة عالية للبقع والتصبغات", en: "High resistance to stains and discoloration" },
      { ar: "مظهر طبيعي وجمالي", en: "Natural and aesthetic look" },
      { ar: "إجراء غير جراحي نسبيًا", en: "Minimally invasive procedure" },
      { ar: "متانة تدوم 10-15 سنة", en: "Durability lasting 10-15 years" },
      { ar: "تعزيز الثقة بالابتسامة", en: "Enhanced smile confidence" }
    ],
    process: [
      { title: { ar: "الاستشارة الأولية", en: "Initial Consultation" }, description: { ar: "تقييم الأسنان ومناقشة الأهداف الجمالية.", en: "Assessing teeth and discussing aesthetic goals." } },
      { title: { ar: "تحضير الأسنان", en: "Tooth Preparation" }, description: { ar: "إزالة طبقة رقيقة من مينا الأسنان.", en: "Removing a thin layer of tooth enamel." } },
      { title: { ar: "أخذ القياسات", en: "Impressions" }, description: { ar: "أخذ انطباعات دقيقة لتصميم الفينيرز.", en: "Taking precise impressions for veneer design." } },
      { title: { ar: "تركيب الفينيرز", en: "Veneer Placement" }, description: { ar: "تثبيت القشور بمادة لاصقة قوية.", en: "Bonding veneers with strong adhesive." } },
      { title: { ar: "التعديل النهائي", en: "Final Adjustment" }, description: { ar: "ضبط الفينيرز للراحة والمظهر المثالي.", en: "Adjusting veneers for comfort and perfect look." } }
    ],
    materials: [
      { name: { ar: "بورسلين", en: "Porcelain" }, description: { ar: "مادة متينة توفر مظهرًا طبيعيًا.", en: "Durable material for a natural appearance." } },
      { name: { ar: "زيركون", en: "Zirconia" }, description: { ar: "مادة قوية وشفافة لنتائج جمالية.", en: "Strong, translucent material for aesthetic results." } },
      { name: { ar: "مادة لاصقة طبية", en: "Medical Adhesive" }, description: { ar: "مادة قوية لتثبيت الفينيرز.", en: "Strong adhesive for securing veneers." } }
    ],
    types: [
      { name: { ar: "فينيرز البورسلين", en: "Porcelain Veneers" }, description: { ar: "متينة وطبيعية المظهر لابتسامة مثالية.", en: "Durable and natural-looking for a perfect smile." } },
      { name: { ar: "فينيرز الزيركون", en: "Zirconia Veneers" }, description: { ar: "قوية جدًا ومناسبة للأسنان الخلفية.", en: "Very strong, suitable for back teeth." } }
    ],
    statistics: [
      { number: "95%", label: "رضا العملاء" },
      { number: "15+", label: "سنوات الخبرة" },
      { number: "5000+", label: "فينير مركب" },
      { number: "2 جلسات", label: "مدة الإجراء" },
      { number: "10-15", label: "سنوات عمر الفينير" },
      { number: "98%", label: "نسبة النجاح" }
    ],
    recommendations: [
      { ar: "تنظيف الأسنان يوميًا بالفرشاة والخيط", en: "Brush and floss daily" },
      { ar: "تجنب الأطعمة الصلبة التي قد تتلف الفينير", en: "Avoid hard foods that may damage veneers" },
      { ar: "زيارات دورية للصيانة كل 6 أشهر", en: "Regular maintenance visits every 6 months" },
      { ar: "استخدام واقي أسنان إذا لزم الأمر", en: "Use a night guard if needed" },
      { ar: "تجنب التدخين للحفاظ على اللون", en: "Avoid smoking to maintain color" }
    ],
    cases: [
      { title: { ar: "تصبغات الأسنان", en: "Tooth Discoloration" }, description: { ar: "تصحيح الأسنان المصفرة أو المبقعة.", en: "Correcting yellowed or stained teeth." } },
      { title: { ar: "تشققات الأسنان", en: "Cracked Teeth" }, description: { ar: "إصلاح الأسنان المشققة أو المكسورة.", en: "Repairing cracked or chipped teeth." } },
      { title: { ar: "عدم انتظام الأسنان", en: "Misaligned Teeth" }, description: { ar: "تحسين شكل الأسنان غير المنتظمة.", en: "Improving the shape of uneven teeth." } },
      { title: { ar: "فراغات بين الأسنان", en: "Gaps Between Teeth" }, description: { ar: "سد الفراغات بين الأسنان لابتسامة مثالية.", en: "Closing gaps for a perfect smile." } }
    ],
    recovery: {
      time: "فوري إلى أسبوع حسب الحالة",
      painLevel: "ألم خفيف محتمل",
      restrictions: "تجنب الأطعمة الصلبة أو الملونة لأيام"
    },
    doctorProfile: {
      name: "د. محمد خشبة",
      title: "استشاري طب الأسنان التجميلي",
      experience: "15+ سنة",
      awards: "عضو الجمعية العالمية لطب الأسنان التجميلي",
      image: "/images/dr-khashaba.jpg"
    },
    faq: [
      { question: { ar: "كم تدوم فينيرز الأسنان؟", en: "How long do veneers last?" }, answer: { ar: "10-15 سنة مع العناية الجيدة.", en: "10-15 years with proper care." } },
      { question: { ar: "هل تركيب الفينير مؤلم؟", en: "Is veneer placement painful?" }, answer: { ar: "غير مؤلم مع التخدير الموضعي.", en: "Painless with local anesthesia." } },
      { question: { ar: "هل يمكن إزالة الفينير؟", en: "Can veneers be removed?" }, answer: { ar: "دائمة ولكن يمكن استبدالها.", en: "Permanent but can be replaced." } }
    ],
    gallery: [
      {  "before": "/portfolio3.jpg", "after": "/portfolio3after.jpg",description: { ar: "تصحيح تصبغات الأسنان", en: "Correcting tooth discoloration" } },
      { "before": "/portfolio1.jpg", "after": "/portfolio1after.jpg", description: { ar: "إصلاح تشققات الأسنان", en: "Repairing cracked teeth" } },
      { "before": "/portfolio4.jpg", "after": "/portfolio4after.jpg", description: { ar: "تحسين عدم انتظام الأسنان", en: "Fixing misaligned teeth" } }
    ]
  },
  

  // تقويم الأسنان الشفاف
  "clear-aligners": {
    id: "clear-aligners",
    title: { ar: "تقويم شفاف", en: "Clear Aligners" },
    subtitle: { ar: "تصحيح الأسنان بطريقة غير مرئية", en: "Invisible Teeth Alignment" },
    description: {
      ar: "تقويم شفاف قابل للإزالة يصحح الأسنان بطريقة مريحة وغير مرئية، مثالي للبالغين في المنصورة.",
      en: "Removable, invisible clear aligners for comfortable and discreet teeth correction, ideal for adults in Mansoura."
    },
    longDescription: {
      ar: "في عيادة د. محمد خشبة، نقدم تقويم الأسنان الشفاف كحل مبتكر لتصحيح تزاحم الأسنان أو الفراغات دون الحاجة إلى الأقواس المعدنية. القوالب الشفافة المخصصة مريحة، قابلة للإزالة، وتوفر نتائج سريعة وفعالة مع الحفاظ على مظهر طبيعي.",
      en: "At Dr. Mohamed Khashaba’s clinic, we offer clear aligners as an innovative solution to correct crowded teeth or gaps without metal braces. Custom transparent trays are comfortable, removable, and deliver fast, effective results while maintaining a natural appearance."
    },
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=90&w=1920&auto=format&fit=crop",
    icon: "/icons/clear-aligners.svg",
    benefits: [
      { ar: "تصحيح غير مرئي للأسنان", en: "Invisible teeth correction" },
      { ar: "راحة عالية وقابلية للإزالة", en: "High comfort and removability" },
      { ar: "سهولة التنظيف والعناية", en: "Easy to clean and maintain" },
      { ar: "نتائج سريعة في الحالات البسيطة", en: "Fast results in mild cases" },
      { ar: "مناسب للبالغين والمراهقين", en: "Ideal for adults and teens" },
      { ar: "تحسين الابتسامة بثقة", en: "Enhanced smile with confidence" }
    ],
    process: [
      { title: { ar: "الاستشارة الأولية", en: "Initial Consultation" }, description: { ar: "تقييم الأسنان وأخذ قياسات رقمية.", en: "Assessing teeth and taking digital impressions." } },
      { title: { ar: "تصميم القوالب", en: "Tray Design" }, description: { ar: "تصميم قوالب شفافة مخصصة للعلاج.", en: "Designing custom transparent trays for treatment." } },
      { title: { ar: "تسليم القوالب", en: "Tray Delivery" }, description: { ar: "تسليم القوالب مع تعليمات الاستخدام.", en: "Delivering trays with usage instructions." } },
      { title: { ar: "المتابعة الدورية", en: "Regular Follow-up" }, description: { ar: "زيارات لمتابعة تقدم العلاج.", en: "Visits to monitor treatment progress." } },
      { title: { ar: "الانتهاء والتثبيت", en: "Completion and Retention" }, description: { ar: "إزالة القوالب وتركيب أجهزة التثبيت.", en: "Removing trays and fitting retainers." } }
    ],
    materials: [
      { name: { ar: "بلاستيك طبي شفاف", en: "Medical-Grade Transparent Plastic" }, description: { ar: "مادة مرنة وآمنة لتصحيح الأسنان.", en: "Flexible, safe material for teeth alignment." } },
      { name: { ar: "أجهزة تثبيت", en: "Retainers" }, description: { ar: "أجهزة للحفاظ على نتائج التقويم.", en: "Devices to maintain alignment results." } }
    ],
    types: [
      { name: { ar: "إنفيزالاين", en: "Invisalign" }, description: { ar: "تقويم شفاف متقدم من إنفيزالاين.", en: "Advanced clear aligners from Invisalign." } },
      { name: { ar: "كلير كوريكت", en: "ClearCorrect" }, description: { ar: "بديل فعال وأقل تكلفة.", en: "Effective and cost-efficient alternative." } }
    ],
    statistics: [
      { number: "95%", label: "رضا العملاء" },
      { number: "15+", label: "سنوات الخبرة" },
      { number: "4000+", label: "حالة ناجحة" },
      { number: "6-18", label: "أشهر مدة العلاج" },
      { number: "99%", label: "توافق مع البالغين" },
      { number: "85%", label: "تحسين الإطباق" }
    ],
    recommendations: [
      { ar: "ارتداء القوالب 20-22 ساعة يوميًا", en: "Wear trays 20-22 hours daily" },
      { ar: "تنظيف القوالب بانتظام", en: "Clean trays regularly" },
      { ar: "إزالة القوالب أثناء الطعام", en: "Remove trays during eating" },
      { ar: "الالتزام بمواعيد المتابعة", en: "Adhere to follow-up appointments" },
      { ar: "تجنب المشروبات الساخنة أثناء الارتداء", en: "Avoid hot beverages while wearing trays" }
    ],
    cases: [
      { title: { ar: "تزاحم خفيف", en: "Mild Crowding" }, description: { ar: "تصحيح تزاحم الأسنان البسيط.", en: "Correcting mild tooth crowding." } },
      { title: { ar: "فراغات صغيرة", en: "Small Gaps" }, description: { ar: "سد فراغات صغيرة بين الأسنان.", en: "Closing small gaps between teeth." } },
      { title: { ar: "مشاكل إطباق خفيفة", en: "Mild Bite Issues" }, description: { ar: "تصحيح مشاكل إطباق خفيفة.", en: "Correcting mild bite issues." } }
    ],
    recovery: {
      time: "أسبوع للتعود، 6-18 شهر للعلاج",
      painLevel: "انزعاج خفيف في البداية",
      restrictions: "تجنب الأطعمة الصلبة أثناء الارتداء"
    },
    doctorProfile: {
      name: "د. محمد خشبة",
      title: "استشاري تقويم الأسنان",
      experience: "15+ سنة",
      awards: "عضو الجمعية الأوروبية لتقويم الأسنان",
      image: "/dr2.jpg"
    },
    faq: [
      { question: { ar: "هل التقويم الشفاف فعال؟", en: "Are clear aligners effective?" }, answer: { ar: "نعم، فعال للحالات البسيطة إلى المتوسطة.", en: "Yes, effective for mild to moderate cases." } },
      { question: { ar: "كم ساعة يجب ارتداء القوالب؟", en: "How long to wear trays daily?" }, answer: { ar: "20-22 ساعة يوميًا لنتائج مثالية.", en: "20-22 hours daily for optimal results." } },
      { question: { ar: "هل مناسب للأطفال؟", en: "Are they suitable for children?" }, answer: { ar: "مناسب للمراهقين، التقليدي أفضل للأطفال الصغار.", en: "Suitable for teens, traditional braces better for younger children." } }
    ],
    gallery: [

      { "before": "/portfolio2.jpg", "after": "/portfolio2after.jpg", description: { ar: "تصحيح أسنان غير منتظمة", en: "Fixing misaligned teeth" } }
    ]
  },

  // كومبوزيت فينيرز (إضافة جديدة للتوافق مع allServices)
  "composite-veneers": {
    id: "composite-veneers",
    title: { ar: "كومبوزيت فينيرز", en: "Composite Veneers" },
    subtitle: { ar: "ابتسامة جميلة بتكلفة مناسبة", en: "Beautiful Smile at an Affordable Cost" },
    description: {
      ar: "قشور كومبوزيت اقتصادية تُطبق في جلسة واحدة لتحسين مظهر الأسنان في المنصورة.",
      en: "Affordable composite shells applied in one session to enhance teeth appearance in Mansoura."
    },
    longDescription: {
      ar: "كومبوزيت فينيرز في عيادة د. محمد خشبة هو الحل المثالي لمن يبحث عن تحسين سريع وفعال للأسنان بتكلفة مناسبة. تُصنع القشور من مادة الكومبوزيت مباشرة على الأسنان، مما يوفر مظهرًا طبيعيًا ويصحح عيوب مثل التصبغات أو التشققات بسهولة وراحة.",
      en: "Composite veneers at Dr. Mohamed Khashaba’s clinic are the perfect solution for those seeking a quick, cost-effective way to enhance their smile. Applied directly to teeth, these composite shells offer a natural look and correct imperfections like discoloration or cracks with ease and comfort."
    },
    image: "/This is what “WORLD-CLASS quality” means .. 🎩✨.jpg",
    icon: "/icons/composite-veneers.svg",
    benefits: [
      { ar: "تكلفة اقتصادية مقارنة بالبورسلين", en: "Cost-effective compared to porcelain" },
      { ar: "تركيب سريع في جلسة واحدة", en: "Quick application in one session" },
      { ar: "مظهر طبيعي وجمالي", en: "Natural and aesthetic appearance" },
      { ar: "إصلاح التصبغات والتشققات", en: "Fixing discoloration and cracks" },
      { ar: "إجراء غير جراحي", en: "Non-invasive procedure" },
      { ar: "تعزيز الثقة بالابتسامة", en: "Enhanced smile confidence" }
    ],
    process: [
      { title: { ar: "الاستشارة الأولية", en: "Initial Consultation" }, description: { ar: "تقييم الأسنان وتحديد الأهداف الجمالية.", en: "Assessing teeth and defining aesthetic goals." } },
      { title: { ar: "تحضير الأسنان", en: "Tooth Preparation" }, description: { ar: "تنظيف الأسنان دون إزالة مينا كبيرة.", en: "Cleaning teeth without removing much enamel." } },
      { title: { ar: "تطبيق الكومبوزيت", en: "Composite Application" }, description: { ar: "تشكيل الكومبوزيت مباشرة على الأسنان.", en: "Shaping composite directly on teeth." } },
      { title: { ar: "التصلب بالضوء", en: "Light Curing" }, description: { ar: "استخدام ضوء لتصلب مادة الكومبوزيت.", en: "Using light to cure the composite material." } },
      { title: { ar: "التشكيل النهائي", en: "Final Shaping" }, description: { ar: "تشكيل وتلميع القشور لمظهر طبيعي.", en: "Shaping and polishing veneers for a natural look." } }
    ],
    materials: [
      { name: { ar: "راتنج الكومبوزيت", en: "Composite Resin" }, description: { ar: "مادة مرنة وطبيعية المظهر.", en: "Flexible and natural-looking material." } },
      { name: { ar: "ضوء التصلب", en: "Curing Light" }, description: { ar: "تقنية لتصلب الكومبوزيت بسرعة.", en: "Technology to quickly cure composite." } }
    ],
    types: [
      { name: { ar: "كومبوزيت مباشر", en: "Direct Composite Veneers" }, description: { ar: "تُطبق مباشرة في العيادة بجلسة واحدة.", en: "Applied directly in one clinic session." } },
      { name: { ar: "كومبوزيت مسبق الصنع", en: "Prefabricated Composite" }, description: { ar: "قشور جاهزة تُعدل حسب الحاجة.", en: "Pre-made shells adjusted as needed." } }
    ],
    statistics: [
      { number: "90%", label: "رضا العملاء" },
      { number: "15+", label: "سنوات الخبرة" },
      { number: "3000+", label: "كومبوزيت مركب" },
      { number: "1 جلسة", label: "مدة الإجراء" },
      { number: "5-7", label: "سنوات عمر الكومبوزيت" },
      { number: "95%", label: "نسبة النجاح" }
    ],
    recommendations: [
      { ar: "تنظيف الأسنان يوميًا بالفرشاة والخيط", en: "Brush and floss daily" },
      { ar: "تجنب الأطعمة الصلبة التي قد تتلف القشور", en: "Avoid hard foods that may damage veneers" },
      { ar: "زيارات دورية للصيانة", en: "Regular maintenance visits" },
      { ar: "استخدام واقي أسنان إذا لزم الأمر", en: "Use a night guard if needed" },
      { ar: "تجنب التدخين للحفاظ على اللون", en: "Avoid smoking to maintain color" }
    ],
    cases: [
      { title: { ar: "تصبغات خفيفة", en: "Mild Discoloration" }, description: { ar: "تصحيح تصبغات الأسنان البسيطة.", en: "Correcting mild tooth discoloration." } },
      { title: { ar: "تشققات صغيرة", en: "Small Cracks" }, description: { ar: "إصلاح تشققات الأسنان البسيطة.", en: "Repairing small tooth cracks." } },
      { title: { ar: "فراغات بسيطة", en: "Minor Gaps" }, description: { ar: "سد فراغات صغيرة بين الأسنان.", en: "Closing minor gaps between teeth." } },
      { title: { ar: "تحسين الشكل", en: "Shape Improvement" }, description: { ar: "تحسين شكل الأسنان غير المنتظمة.", en: "Improving uneven tooth shapes." } }
    ],
    recovery: {
      time: "فوري",
      painLevel: "غير مؤلم",
      restrictions: "تجنب الأطعمة الصلبة لمدة 24 ساعة"
    },
    doctorProfile: {
      name: "د. محمد خشبة",
      title: "استشاري طب الأسنان التجميلي",
      experience: "8+ سنة",
      awards: "عضو الجمعية العالمية لطب الأسنان التجميلي",
      image: "/dr2.jpg"
    },
    faq: [
      { question: { ar: "كم تدوم كومبوزيت فينيرز؟", en: "How long do composite veneers last?" }, answer: { ar: "5-7 سنوات مع العناية الجيدة.", en: "5-7 years with proper care." } },
      { question: { ar: "هل الإجراء مؤلم؟", en: "Is the procedure painful?" }, answer: { ar: "غير مؤلم ولا يتطلب تخديرًا عادةً.", en: "Painless and usually requires no anesthesia." } },
      { question: { ar: "هل يمكن إصلاح الكومبوزيت؟", en: "Can composite veneers be repaired?" }, answer: { ar: "نعم، يمكن إصلاحها أو استبدالها بسهولة.", en: "Yes, they can be easily repaired or replaced." } }
    ],
    gallery: [
      {  "before": "/portfolio4.jpg", "after": "/portfolio4after.jpg", description: { ar: "تصحيح تصبغات خفيفة", en: "Correcting mild discoloration" } },

    ]
  },

  // تقويم الأسنان (إضافة جديدة للتوافق مع allServices)
  "orthodontics": {
    id: "orthodontics",
    title: { ar: "تقويم الأسنان", en: "Orthodontics" },
    subtitle: { ar: "ابتسامة متناسقة وصحية", en: "Harmonious and Healthy Smile" },
    description: {
      ar: "تصحيح الأسنان والفك باستخدام أقواس معدنية أو خزفية لتحقيق ابتسامة مثالية في المنصورة.",
      en: "Correcting teeth and jaw alignment with metal or ceramic braces for a perfect smile in Mansoura."
    },
    longDescription: {
      ar: "في عيادة د. محمد خشبة، نقدم تقويم الأسنان لتصحيح التزاحم، الفراغات، ومشاكل الإطباق باستخدام أحدث الأقواس المعدنية أو الخزفية. هذا العلاج يعزز وظيفة الفم، يحسن المظهر الجمالي، ويمنحك ابتسامة متناسقة تدوم مدى الحياة مع الرعاية المناسبة.",
      en: "At Dr. Mohamed Khashaba’s clinic, we offer orthodontics to correct crowding, gaps, and bite issues using advanced metal or ceramic braces. This treatment enhances mouth function, improves aesthetics, and delivers a harmonious smile that lasts a lifetime with proper care."
    },
    image: "/taq.webp",
    icon: "/icons/orthodontics.svg",
    benefits: [
      { ar: "تصحيح التزاحم وفراغات الأسنان", en: "Correcting crowding and gaps" },
      { ar: "تحسين إطباق الفك", en: "Improving jaw alignment" },
      { ar: "تعزيز صحة الفم العامة", en: "Enhancing overall oral health" },
      { ar: "مظهر جمالي ومتناسق", en: "Aesthetic and harmonious appearance" },
      { ar: "نتائج طويلة الأمد", en: "Long-lasting results" },
      { ar: "تعزيز الثقة بالابتسامة", en: "Boosted smile confidence" }
    ],
    process: [
      { title: { ar: "الاستشارة الأولية", en: "Initial Consultation" }, description: { ar: "تقييم الأسنان ووضع خطة علاجية.", en: "Assessing teeth and planning treatment." } },
      { title: { ar: "تركيب الأقواس", en: "Braces Placement" }, description: { ar: "تثبيت الأقواس المعدنية أو الخزفية.", en: "Installing metal or ceramic braces." } },
      { title: { ar: "التعديلات الدورية", en: "Regular Adjustments" }, description: { ar: "زيارات دورية لضبط الأقواس.", en: "Regular visits to adjust braces." } },
      { title: { ar: "إزالة الأقواس", en: "Braces Removal" }, description: { ar: "إزالة الأقواس بعد اكتمال التصحيح.", en: "Removing braces after correction." } },
      { title: { ar: "التثبيت", en: "Retention" }, description: { ar: "تركيب أجهزة تثبيت للحفاظ على النتائج.", en: "Fitting retainers to maintain results." } }
    ],
    materials: [
      { name: { ar: "أقواس معدنية", en: "Metal Braces" }, description: { ar: "أقواس قوية وفعالة لتصحيح الأسنان.", en: "Strong, effective braces for teeth correction." } },
      { name: { ar: "أقواس خزفية", en: "Ceramic Braces" }, description: { ar: "أقواس شفافة لمظهر جمالي.", en: "Transparent braces for aesthetic look." } },
      { name: { ar: "أجهزة تثبيت", en: "Retainers" }, description: { ar: "أجهزة للحفاظ على نتائج التقويم.", en: "Devices to maintain orthodontic results." } }
    ],
    types: [
      { name: { ar: "تقويم معدني", en: "Metal Braces" }, description: { ar: "أقواس معدنية فعالة للحالات المعقدة.", en: "Effective metal braces for complex cases." } },
      { name: { ar: "تقويم خزفي", en: "Ceramic Braces" }, description: { ar: "أقواس شبه شفافة لمظهر طبيعي.", en: "Semi-transparent braces for a natural look." } }
    ],
    statistics: [
      { number: "95%", label: "رضا العملاء" },
      { number: "15+", label: "سنوات الخبرة" },
      { number: "3500+", label: "حالة ناجحة" },
      { number: "12-24", label: "أشهر مدة العلاج" },
      { number: "98%", label: "نسبة النجاح" },
      { number: "90%", label: "تحسين الإطباق" }
    ],
    recommendations: [
      { ar: "تنظيف الأسنان بعناية حول الأقواس", en: "Clean teeth carefully around braces" },
      { ar: "تجنب الأطعمة اللاصقة أو الصلبة", en: "Avoid sticky or hard foods" },
      { ar: "زيارات دورية لضبط الأقواس", en: "Regular visits for brace adjustments" },
      { ar: "استخدام فرشاة خاصة بالتقويم", en: "Use orthodontic-specific toothbrush" },
      { ar: "ارتداء أجهزة التثبيت بعد العلاج", en: "Wear retainers post-treatment" }
    ],
    cases: [
      { title: { ar: "تزاحم الأسنان", en: "Tooth Crowding" }, description: { ar: "تصحيح تزاحم الأسنان الشديد.", en: "Correcting severe tooth crowding." } },
      { title: { ar: "فراغات كبيرة", en: "Large Gaps" }, description: { ar: "سد فراغات كبيرة بين الأسنان.", en: "Closing large gaps between teeth." } },
      { title: { ar: "مشاكل الإطباق", en: "Bite Issues" }, description: { ar: "تصحيح مشاكل إطباق الفك.", en: "Correcting jaw bite issues." } },
      { title: { ar: "عدم انتظام الأسنان", en: "Misaligned Teeth" }, description: { ar: "تحسين تناسق الأسنان.", en: "Improving teeth alignment." } }
    ],
    recovery: {
      time: "أسبوع للتعود، 12-24 شهر للعلاج",
      painLevel: "انزعاج خفيف في البداية",
      restrictions: "تجنب الأطعمة الصلبة واللاصقة"
    },
    doctorProfile: {
      name: "د. محمد خشبة",
      title: "استشاري تقويم الأسنان",
      experience: "8+ سنة",
      awards: "عضو الجمعية الأوروبية لتقويم الأسنان",
      image: "/dr2.jpg"
    },
    faq: [
      { question: { ar: "كم تستغرق مدة التقويم؟", en: "How long does orthodontic treatment take?" }, answer: { ar: "12-24 شهرًا حسب الحالة.", en: "12-24 months depending on the case." } },
      { question: { ar: "هل التقويم مؤلم؟", en: "Is orthodontics painful?" }, answer: { ar: "انزعاج خفيف في البداية يقل تدريجيًا.", en: "Mild discomfort initially that fades gradually." } },
      { question: { ar: "هل الأقواس الخزفية فعالة؟", en: "Are ceramic braces effective?" }, answer: { ar: "نعم، فعالة وجمالية.", en: "Yes, effective and aesthetic." } }
    ],
    gallery: [

    ]
  },



  
};