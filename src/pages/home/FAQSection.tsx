import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet";
import SectionTitle from "@/components/SectionTitle";
import FAQItem from "@/components/FAQItem";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language = "ar" } = useApp();
  const isRTL = language === "ar";

  const faqs = isRTL
    ? [
        {
          question: "ما هي فينيرز الأسنان وفوائدها؟",
          answer: "الفينيرز هي قشور رقيقة من البورسلين أو الكومبوزيت تُوضع على الأسنان لتحسين مظهرها، تصحيح التصبغات، الفراغات، أو الأسنان غير المتناسقة. في عيادة د. محمد خشبة بالمنصورة، نقدم فينيرز عالية الجودة لابتسامة هوليود طبيعية ودائمة.",
        },
        {
          question: "كيف تتم عملية زراعة الأسنان؟",
          answer: "زراعة الأسنان تتضمن وضع غرسة تيتانيوم في عظم الفك كبديل لجذر السن المفقود، ثم تثبيت تاج صناعي. في عيادة د. محمد خشبة بالمنصورة، نستخدم تقنيات متقدمة لضمان نتائج دقيقة ومريحة.",
        },
        {
          question: "ما الفرق بين فينيرز وكومبوزيت فينيرز؟",
          answer: "الفينيرز مصنوعة من البورسلين لمظهر طبيعي ومتانة عالية، بينما كومبوزيت فينيرز مصنوعة من الراتنج المركب كخيار اقتصادي. في عيادة د. محمد خشبة، نقدم كلا الخيارين لتناسب احتياجاتك في المنصورة.",
        },
        {
          question: "هل تبييض الأسنان يؤثر على الأسنان؟",
          answer: "تبييض الأسنان في عيادة د. محمد خشبة بالمنصورة آمن تمامًا باستخدام تقنيات ليزر حديثة، مما يمنحك ابتسامة بيضاء مشرقة دون ضرر للأسنان أو اللثة في جلسة واحدة.",
        },
        {
          question: "ما هي أنواع تقويم الأسنان المتوفرة؟",
          answer: "نقدم تقويم أسنان تقليدي وتقويم شفاف في عيادة د. محمد خشبة بالمنصورة. التقويم الشفاف مثالي لتصحيح الأسنان بشكل غير مرئي، بينما التقويم التقليدي فعال للحالات المعقدة.",
        },
        {
          question: "ما هو تقويم الأسنان الشفاف؟",
          answer: "التقويم الشفاف هو نظام تصحيح أسنان يستخدم قوالب شفافة قابلة للإزالة. في عيادة د. محمد خشبة بالمنصورة، نقدم تقويمًا شفافًا مريحًا وفعالًا لتحقيق ابتسامة مثالية.",
        },
        {
          question: "كيف يمكن تحقيق ابتسامة هوليود؟",
          answer: "ابتسامة هوليود تتضمن فينيرز، تبييض أسنان، وأحيانًا تقويم أسنان للحصول على مظهر مثالي. في عيادة د. محمد خشبة بالمنصورة، نقدم خططًا مخصصة لتحقيق ابتسامة مشرقة.",
        },
        {
          question: "هل تبييض الأسنان يدوم طويلًا؟",
          answer: "نتائج تبييض الأسنان في عيادة د. محمد خشبة بالمنصورة تدوم لمدة طويلة مع العناية المناسبة، مثل تجنب المشروبات الملونة والحفاظ على نظافة الفم.",
        },
        {
          question: "هل يمكن تركيب فينيرز في جلسة واحدة؟",
          answer: "تركيب الفينيرز يتطلب عادةً جلستين: الأولى للتحضير والقياس، والثانية للتركيب. في عيادة د. محمد خشبة بالمنصورة، نضمن تجربة سلسة ونتائج مذهلة.",
        },
        {
          question: "ما هي مزايا زراعة الأسنان مقارنة بالجسور؟",
          answer: "زراعة الأسنان توفر حلاً دائمًا ومستقلًا دون الحاجة لتهيئة الأسنان المجاورة، على عكس الجسور. في عيادة د. محمد خشبة بالمنصورة، نستخدم غرسات عالية الجودة لنتائج طبيعية.",
        },
        {
          question: "هل تقويم الأسنان مؤلم؟",
          answer: "تقويم الأسنان قد يسبب إزعاجًا بسيطًا في البداية، لكن في عيادة د. محمد خشبة بالمنصورة، نستخدم تقنيات حديثة لتقليل الانزعاج وضمان راحة المريض.",
        },
        {
          question: "ما هي خدمات طب الأسنان التجميلي؟",
          answer: "تشمل خدمات طب الأسنان التجميلي في عيادة د. محمد خشبة بالمنصورة فينيرز، كومبوزيت فينيرز، تبييض الأسنان، وتقويم الأسنان لتحسين مظهر الابتسامة.",
        },
      ]
    : [
        {
          question: "What are dental veneers and their benefits?",
          answer: "Veneers are thin shells of porcelain or composite placed on teeth to improve their appearance, correct discoloration, gaps, or misaligned teeth. At Dr. Mohamed Khashaba Clinic in Mansoura, we provide high-quality veneers for a natural, lasting Hollywood smile.",
        },
        {
          question: "How is a dental implant procedure performed?",
          answer: "Dental implants involve placing a titanium implant in the jawbone as a replacement for a missing tooth root, followed by a custom crown. At Dr. Mohamed Khashaba Clinic in Mansoura, we use advanced techniques for precise, comfortable results.",
        },
        {
          question: "What’s the difference between veneers and composite veneers?",
          answer: "Veneers are made of porcelain for a natural look and high durability, while composite veneers are made from resin as a cost-effective option. At Dr. Mohamed Khashaba Clinic in Mansoura, we offer both to suit your needs.",
        },
        {
          question: "Does teeth whitening affect teeth?",
          answer: "Teeth whitening at Dr. Mohamed Khashaba Clinic in Mansoura is completely safe, using modern laser techniques to deliver a bright white smile without harming teeth or gums in a single session.",
        },
        {
          question: "What types of orthodontics are available?",
          answer: "We offer traditional and clear braces at Dr. Mohamed Khashaba Clinic in Mansoura. Clear aligners are ideal for discreet correction, while traditional braces are effective for complex cases.",
        },
        {
          question: "What are clear aligners?",
          answer: "Clear aligners are an invisible system for correcting teeth using removable transparent trays. At Dr. Mohamed Khashaba Clinic in Mansoura, we offer comfortable and effective clear aligners for a perfect smile.",
        },
        {
          question: "How can I achieve a Hollywood smile?",
          answer: "A Hollywood smile involves veneers, teeth whitening, and sometimes orthodontics for a perfect look. At Dr. Mohamed Khashaba Clinic in Mansoura, we provide customized plans for a radiant smile.",
        },
        {
          question: "How long do teeth whitening results last?",
          answer: "Teeth whitening results at Dr. Mohamed Khashaba Clinic in Mansoura last long with proper care, such as avoiding colored beverages and maintaining oral hygiene.",
        },
        {
          question: "Can veneers be placed in one session?",
          answer: "Veneer placement typically requires two sessions: one for preparation and measurements, and another for fitting. At Dr. Mohamed Khashaba Clinic in Mansoura, we ensure a seamless experience with stunning results.",
        },
        {
          question: "What are the advantages of dental implants over bridges?",
          answer: "Dental implants offer a permanent, standalone solution without altering adjacent teeth, unlike bridges. At Dr. Mohamed Khashaba Clinic in Mansoura, we use high-quality implants for natural results.",
        },
        {
          question: "Is orthodontics painful?",
          answer: "Orthodontics may cause minor discomfort initially, but at Dr. Mohamed Khashaba Clinic in Mansoura, we use modern techniques to minimize discomfort and ensure patient comfort.",
        },
        {
          question: "What are cosmetic dentistry services?",
          answer: "Cosmetic dentistry services at Dr. Mohamed Khashaba Clinic in Mansoura include veneers, composite veneers, teeth whitening, and orthodontics to enhance your smile’s appearance.",
        },
      ];

  const title = isRTL
    ? {
        subtitle: "الأسئلة الشائعة",
        title: "كل ما تحتاج معرفته عن خدماتنا ",
        description: "إجابات مفصلة عن أسئلتكم حول  فينيرز، زراعة الأسنان، تقويم الأسنان، تبييض الأسنان، وأكثر في عيادة د. محمد خشبة بالمنصورة.",
      }
    : { 
        subtitle: "Frequently Asked Questions",
        title: "Everything You Need to Know About Our Dental Services",
        description: "Detailed answers to your questions about veneers, dental implants, orthodontics, teeth whitening, and more at Dr. Mohamed Khashaba Clinic in Mansoura.",
      };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // SEO Keywords
  const keywordList = isRTL
    ? [
        "فينيرز المنصورة",
        "زراعة أسنان المنصورة",
        "كومبوزيت فينيرز المنصورة",
        "تقويم أسنان المنصورة",
        "تبييض أسنان المنصورة",
        "تقويم شفاف المنصورة",
        "ابتسامة هوليود المنصورة",
        "أفضل دكتور أسنان في المنصورة",
        "عيادة د. محمد خشبة",
        "طب أسنان تجميلي المنصورة",
        "خدمات أسنان فاخرة المنصورة",
        "علاج أسنان متقدم المنصورة",
      ]
    : [
        "veneers Mansoura",
        "dental implants Mansoura",
        "composite veneers Mansoura",
        "orthodontics Mansoura",
        "teeth whitening Mansoura",
        "clear aligners Mansoura",
        "Hollywood smile Mansoura",
        "best dentist in Mansoura",
        "Dr. Mohamed Khashaba Clinic",
        "cosmetic dentistry Mansoura",
        "premium dental services Mansoura",
        "advanced dental treatment Mansoura",
      ];

  return (
    <section className="py-16 bg-gradient-to-t from-dental-gold/10 to-gray-50 dark:bg-gradient-to-b dark:from-dental-black dark:to-dental-gold/10">
      <Helmet>
        <title>
          {isRTL
            ? "الأسئلة الشائعة حول خدمات الأسنان - عيادة د. محمد خشبة بالمنصورة"
            : "FAQ About Dental Services - Dr. Mohamed Khashaba Clinic in Mansoura"}
        </title>
        <meta
          name="description"
          content={title.description}
        />
        <meta name="keywords" content={keywordList.join(", ")} />
        <meta
          property="og:title"
          content={
            isRTL
              ? "الأسئلة الشائعة - عيادة د. محمد خشبة"
              : "FAQ - Dr. Mohamed Khashaba Clinic"
          }
        />
        <meta
          property="og:description"
          content={title.description}
        />
        <meta property="og:image" content="/images/faq-hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": isRTL ? "الرئيسية" : "Home",
                "item": window.location.origin,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": isRTL ? "الأسئلة الشائعة" : "FAQ",
                "item": `${window.location.origin}/faq`,
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hidden SEO Content */}
      <div hidden>
        <h2>{isRTL ? "أفضل عيادة أسنان في المنصورة" : "Best Dental Clinic in Mansoura"}</h2>
        <p>
          {isRTL
            ? "عيادة د. محمد خشبة تقدم خدمات فينيرز، زراعة أسنان، كومبوزيت فينيرز، تقويم أسنان، تبييض أسنان، تقويم شفاف، وابتسامة هوليود في المنصورة، الدقهلية. احصل على أفضل خدمات طب الأسنان التجميلي مع أفضل دكتور أسنان في المنصورة."
            : "Dr. Mohamed Khashaba Clinic offers veneers, dental implants, composite veneers, orthodontics, teeth whitening, clear aligners, and Hollywood smile in Mansoura, Dakahlia. Get the best cosmetic dentistry services with the best dentist in Mansoura."}
        </p>
        <ul>
          <li>{isRTL ? "فينيرز المنصورة - قشور بورسلين لابتسامة مثالية" : "Veneers Mansoura - Porcelain shells for a perfect smile"}</li>
          <li>{isRTL ? "زراعة أسنان المنصورة - غرسات تيتانيوم متينة" : "Dental implants Mansoura - Durable titanium implants"}</li>
          <li>{isRTL ? "كومبوزيت فينيرز - حل اقتصادي لتحسين الأسنان" : "Composite veneers - Affordable solution for teeth enhancement"}</li>
          <li>{isRTL ? "تقويم أسنان - تصحيح التزاحم والإطباق" : "Orthodontics - Correcting crowding and bite issues"}</li>
          <li>{isRTL ? "تبييض أسنان - ابتسامة مشرقة في جلسة واحدة" : "Teeth whitening - Bright smile in one session"}</li>
          <li>{isRTL ? "تقويم شفاف - تصحيح غير مرئي للأسنان" : "Clear aligners - Invisible teeth correction"}</li>
          <li>{isRTL ? "ابتسامة هوليود المنصورة - تصميم ابتسامة مثالية" : "Hollywood smile Mansoura - Perfect smile design"}</li>
        </ul>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          subtitle={title.subtitle}
          title={title.title}
          description={title.description}
          center
        />
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggle(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
