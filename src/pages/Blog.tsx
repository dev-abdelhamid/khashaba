
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight,Clock , Tag ,Calendar, User ,Eye  } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { Badge } from "@/components/ui/badge";
import LazyImage from "@/components/LazyImage";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import SimpleHeroSection from "@/components/CTA/SimpleHeroSection";

// Sample blog posts data - in a real app, this would come from an API or database// Blog posts data with updated content and dates
const blogPosts = [
  {
    id: 1,
    title: {
      ar: "تبييض الأسنان: أحدث التقنيات والطرق الآمنة في 2024",
      en: "Teeth Whitening: Latest Safe Techniques and Methods in 2024"
    },
    excerpt: {
      ar: "اكتشف أحدث تقنيات تبييض الأسنان الآمنة والفعالة في عيادة د. محمد خشبة بالمنصورة، مع نصائح الخبراء للحفاظ على أسنان بيضاء صحية.",
      en: "Discover the latest safe and effective teeth whitening techniques at Dr. Mohamed Khashaba's clinic in Mansoura, with expert tips for maintaining healthy white teeth."
    },
    image: "https://images.unsplash.com/photo-1581585378385-71ce39d4b47d?q=80&w=2670&auto=format&fit=crop",
    date: {
      ar: "15 ديسمبر 2024",
      en: "December 15, 2024"
    },
   
    category: {
      ar: "طب الأسنان التجميلي",
      en: "Cosmetic Dentistry"
    },
    readTime: {
      ar: "5 دقائق قراءة",
      en: "5 min read"
    },
    views: "1,250",
    slug: "teeth-whitening-2024-techniques"
  },
  {
    id: 2,
    title: {
      ar: "زراعة الأسنان بالتقنيات المتطورة: دليل شامل 2024",
      en: "Advanced Dental Implants: Complete Guide 2024"
    },
    excerpt: {
      ar: "كل ما تحتاج معرفته عن زراعة الأسنان بأحدث التقنيات في أفضل عيادة أسنان بالمنصورة، مع د. محمد خشبة خبير زراعة الأسنان.",
      en: "Everything you need to know about dental implants with the latest techniques at the best dental clinic in Mansoura, with Dr. Mohamed Khashaba, dental implant expert."
    },
    image: "https://images.unsplash.com/photo-1606265752409-ad6783e0f9a3?q=80&w=2670&auto=format&fit=crop",
    date: {
      ar: "8 ديسمبر 2024",
      en: "December 8, 2024"
    },
    author: {
      ar: "د. محمد خشبة",
      en: "Dr. Mohamed Khashaba"
    },
    category: {
      ar: "زراعة الأسنان",
      en: "Dental Implants"
    },
    readTime: {
      ar: "8 دقائق قراءة",
      en: "8 min read"
    },
    views: "2,100",
    slug: "advanced-dental-implants-2024"
  },
  {
    id: 3,
    title: {
      ar: "العناية اليومية بالأسنان: نصائح من أفضل طبيب أسنان بمصر",
      en: "Daily Dental Care: Tips from Egypt's Best Dentist"
    },
    excerpt: {
      ar: "نصائح وعادات يومية من د. محمد خشبة للحفاظ على صحة أسنانك ولثتك، وتجنب مشاكل صحة الفم الشائعة في المنصورة ومصر.",
      en: "Daily tips and habits from Dr. Mohamed Khashaba to maintain your teeth and gum health, and avoid common oral health problems in Mansoura and Egypt."
    },
    image: "https://images.unsplash.com/photo-1588776813761-ec49ecda2d4a?q=80&w=2670&auto=format&fit=crop",
    date: {
      ar: "1 ديسمبر 2024",
      en: "December 1, 2024"
    },
    author: {
      ar: "د. محمد خشبة",
      en: "Dr. Mohamed Khashaba"
    },
    category: {
      ar: "صحة الفم",
      en: "Oral Health"
    },
    readTime: {
      ar: "6 دقائق قراءة",
      en: "6 min read"
    },
    views: "1,800",
    slug: "daily-dental-care-tips-2024"
  },
  {
    id: 4,
    title: {
      ar: "تقويم الأسنان الشفاف: الحل العصري لابتسامة مثالية",
      en: "Clear Aligners: Modern Solution for Perfect Smile"
    },
    excerpt: {
      ar: "دليل شامل حول تقويم الأسنان الشفاف وأنواع التقويم المختلفة في عيادة د. محمد خشبة، أفضل عيادة تقويم أسنان بالمنصورة.",
      en: "Complete guide to clear aligners and different types of orthodontics at Dr. Mohamed Khashaba's clinic, the best orthodontic clinic in Mansoura."
    },
    image: "https://images.unsplash.com/photo-1624431776244-fe6f0f5cd0f0?q=80&w=2670&auto=format&fit=crop",
    date: {
      ar: "25 نوفمبر 2024",
      en: "November 25, 2024"
    },
    author: {
      ar: "د. محمد خشبة",
      en: "Dr. Mohamed Khashaba"
    },
    category: {
      ar: "تقويم الأسنان",
      en: "Orthodontics"
    },
    readTime: {
      ar: "7 دقائق قراءة",
      en: "7 min read"
    },
    views: "1,650",
    slug: "clear-aligners-orthodontics-2024"
  },
  {
    id: 5,
    title: {
      ar: "طب أسنان الأطفال: كيفية العناية بأسنان طفلك في 2024",
      en: "Pediatric Dentistry: How to Care for Your Child's Teeth in 2024"
    },
    excerpt: {
      ar: "نصائح هامة من د. محمد خشبة للعناية بصحة أسنان الأطفال وتأسيس عادات صحية، في أفضل عيادة أسنان أطفال بالمنصورة.",
      en: "Important tips from Dr. Mohamed Khashaba for children's dental health care and establishing healthy habits, at the best pediatric dental clinic in Mansoura."
    },
    image: "",
    date: {
      ar: "18 نوفمبر 2024",
      en: "November 18, 2024"
    },
    author: {
      ar: "د. محمد خشبة",
      en: "Dr. Mohamed Khashaba"
    },
    category: {
      ar: "طب أسنان الأطفال",
      en: "Pediatric Dentistry"
    },
    readTime: {
      ar: "5 دقائق قراءة",
      en: "5 min read"
    },
    views: "1,400",
    slug: "pediatric-dentistry-care-2024"
  },
  {
    id: 6,
    title: {
      ar: "علاج قنوات الجذور بدون ألم: التقنيات الحديثة",
      en: "Painless Root Canal Treatment: Modern Techniques"
    },
    excerpt: {
      ar: "شرح مفصل لعلاج قنوات الجذور بأحدث التقنيات في عيادة د. محمد خشبة، وكيفية التعامل مع العلاج بدون ألم.",
      en: "Detailed explanation of root canal treatment with the latest techniques at Dr. Mohamed Khashaba's clinic, and how to handle treatment painlessly."
    },
    image: "",
    date: {
      ar: "10 نوفمبر 2024",
      en: "November 10, 2024"
    },
    author: {
      ar: "د. محمد خشبة",
      en: "Dr. Mohamed Khashaba"
    },
    category: {
      ar: "علاجات الأسنان",
      en: "Dental Treatments"
    },
    readTime: {
      ar: "6 دقائق قراءة",
      en: "6 min read"
    },
    views: "1,950",
    slug: "painless-root-canal-treatment-2024"
  }
];

const categories = {
  ar: [
    "طب الأسنان التجميلي",
    "زراعة الأسنان", 
    "صحة الفم",
    "تقويم الأسنان",
    "طب أسنان الأطفال",
    "علاجات الأسنان",
    "نصائح غذائية",
    "الوقاية من أمراض الأسنان"
  ],
  en: [
    "Cosmetic Dentistry",
    "Dental Implants",
    "Oral Health", 
    "Orthodontics",
    "Pediatric Dentistry",
    "Dental Treatments",
    "Nutritional Tips",
    "Dental Disease Prevention"
  ]
};



export default function Blog() {
 const { language, isRTL } = useApp();

  useEffect(() => {
    // SEO optimization
    const title = isRTL 
      ? "مدونة د. محمد خشبة | أفضل عيادة أسنان بالمنصورة ومصر - نصائح طب الأسنان"
      : "Dr. Mohamed Khashaba Blog | Best Dental Clinic in Mansoura Egypt - Dental Tips";
    
    const description = isRTL
      ? "مدونة د. محمد خشبة - أفضل طبيب أسنان بالمنصورة ومصر. نصائح طب الأسنان، زراعة الأسنان، تبييض الأسنان، تقويم الأسنان. عيادة أسنان متطورة بأحدث التقنيات."
      : "Dr. Mohamed Khashaba Blog - Best Dentist in Mansoura Egypt. Dental tips, dental implants, teeth whitening, orthodontics. Advanced dental clinic with latest technologies.";

    document.title = title;
    
    // Meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const keywords = isRTL
      ? "طبيب أسنان المنصورة، أفضل عيادة أسنان مصر، د محمد خشبة، زراعة أسنان المنصورة، تبييض أسنان، تقويم أسنان، طب أسنان تجميلي، علاج أسنان، صحة الفم"
      : "dentist Mansoura, best dental clinic Egypt, Dr Mohamed Khashaba, dental implants Mansoura, teeth whitening, orthodontics, cosmetic dentistry, dental treatment, oral health";
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }
  }, [isRTL]);
  return (
    <div className="min-h-screen">
      <SimpleHeroSection
        backgroundImage="/🇱🇧.jpg"
        Badge={isRTL ? "مدونة د. محمد خشبة" : "Dr. Mohamed Khashaba Blog"}
        title={isRTL ? "مدونة د. محمد خشبة" : "Dr. Mohamed Khashaba Blog"}
        subtitle={isRTL ? "مقالات ونصائح لصحة أسنان أفضل" : "Articles and tips for better dental health"}
      
      />

      {/* Main Blog Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="h-56 overflow-hidden relative">
                        <LazyImage
                          src={post.image}
                          alt={post.title[language]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <Badge 
                          className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-dental-gold hover:bg-dental-darkGold text-white border-0`}
                        >
                          {post.category[language]}
                        </Badge>
                        {/* Meta Info */}
                      <div className="flex items-center absolute -bottom-1 left-4 right-4 justify-between text-sm text-black mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date[language]}</span>
                          </div>
                         
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      </div>
                    </Link>

                    <div className="p-6">
                      

                      

                      {/* Title */}
                      <Link to={`/blog/${post.slug}`}>
                        <h3 className="text-xl leading-relaxed font-bold mb-3 hover:text-dental-gold transition-colors duration-300 line-clamp-2 leading-tight">
                          {post.title[language]}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt[language]}
                      </p>

                      {/* Read More */}
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-dental-gold hover:text-dental-darkGold transition-colors duration-300 font-semibold group"
                      >
                        {isRTL ? "اقرأ المزيد" : "Read More"}
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
             </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
            
               

                 {/* Categories */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {isRTL ? "التصنيفات الطبية" : "Medical Categories"}
                  </h3>
                  <ul className="space-y-3">
                    {categories[language].map((category, index) => (
                      <li key={index}>
                        <Link 
                          to={`/blog/category/${encodeURIComponent(category)}`} 
                          className="flex items-center justify-between group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                        >
                          <span className="text-gray-700 group-hover:text-dental-gold transition-colors duration-300 font-medium">
                            {category}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-dental-gold/10 text-dental-gold flex items-center justify-center text-sm font-bold group-hover:bg-dental-gold group-hover:text-white transition-all duration-300">
                            {Math.floor(Math.random() * 15) + 3}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="bg-white shadow-lg rounded-2xl mt-6 p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {isRTL ? "أحدث المقالات" : "Recent Articles"}
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post) => (
                      <div key={post.id} className={`flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Link to={`/blog/${post.slug}`} className="flex-shrink-0">
                          <LazyImage
                            src={post.image}
                            alt={post.title[language]}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </Link>
                        <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                          <Link to={`/blog/${post.slug}`}>
                            <h4 className="font-semibold leading-relaxed line-clamp-2 hover:text-dental-gold transition-colors duration-300 text-sm leading-tight mb-2">
                              {post.title[language]}
                            </h4>
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date[language]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-b from-dental-gold to-dental-darkGold text-white rounded-2xl p-6  mt-6 text-center">
                  <h3 className="text-xl font-bold mb-3">
                    {isRTL ? "هل تحتاج استشارة طبية؟" : "Need Medical Consultation?"}
                  </h3>
                  <p className="text-white/90 mb-4 text-sm">
                    {isRTL 
                      ? "احجز موعدك الآن مع د. محمد خشبة في أفضل عيادة أسنان بالمنصورة"
                      : "Book your appointment now with Dr. Mohamed Khashaba at the best dental clinic in Mansoura"
                    }
                  </p>
                  <Button 
                    asChild
                    className="bg-white text-dental-gold hover:bg-gray-100 font-semibold w-full"
                  >
                    <Link to="/contact">
                      {isRTL ? "احجز موعدك الآن" : "Book Appointment"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-b from-dental-gold to-dental-darkGold text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 ">
              {isRTL ? "اشترك في النشرة الإخبارية" : "Subscribe to Our Newsletter"}
            </h2>
            <p className="text-lg mb-8">
              {isRTL ? "احصل على أحدث النصائح والمقالات حول صحة الفم والأسنان مباشرة إلى بريدك الإلكتروني" : "Get the latest tips and articles on oral and dental health delivered straight to your inbox."}
            </p>
            <div className="flex flex-col sm:flex-row max-w-xl mx-auto">
              <input
                type="email"
                placeholder={isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                className="flex-grow px-4 py-3 rounded-l-md sm:rounded-r-none sm:rounded-l-md focus:outline-none text-gray-800"
              />
              <Button className="py-6  bg-dental-black hover:bg-opacity-90 text-white sm:rounded-l-none sm:rounded-r-md">
                {isRTL ? "اشترك الآن" : "Subscribe Now"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
