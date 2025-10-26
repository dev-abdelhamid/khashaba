
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Clock, User, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import LazyImage from "@/components/LazyImage";
import AppointmentCTA from "@/components/CTA/AppointmentCTA";
import { Separator } from "@/components/ui/separator";

interface BlogPostDetails {
  id: string;
  title: string;
  content: string[];
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  relatedPosts: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
  }[];
}

export default function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPostDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, this would be an API call to fetch blog post details
    // Simulating an API call
    setTimeout(() => {
      const mockPostData: BlogPostDetails = {
        id: postId || "default-post",
        title: "تبييض الأسنان المنزلي باستخدام القوالب الشخصية",
        excerpt: "تعرف على طريقة تبييض الأسنان من المنزل باستخدام القوالب الشخصية والمواد المبيضة المناسبة تحت إشراف طبيبك",
        author: "د. محمد خشبة",
        date: "10 مايو 2023",
        readTime: "6 دقائق",
        category: "تجميل الأسنان",
        tags: ["تبييض الأسنان", "العناية المنزلية", "ابتسامة جميلة", "طب الأسنان التجميلي"],
        image: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=1000&auto=format&fit=crop",
        content: [
          "يعتبر تبييض الأسنان المنزلي باستخدام القوالب الشخصية من الطرق الفعالة والآمنة لتحصل على ابتسامة أكثر إشراقًا وبياضًا، تحت إشراف طبيب الأسنان.",
          "في هذا المقال، سنتناول بالتفصيل كيفية استخدام هذه التقنية، وأهم النصائح للحصول على أفضل النتائج، والمحاذير التي يجب الانتباه إليها.",
          "<h2>ما هو تبييض الأسنان المنزلي بالقوالب الشخصية؟</h2>",
          "تبييض الأسنان المنزلي بالقوالب الشخصية هو إجراء يتم فيه تصنيع قوالب خاصة بأسنانك في عيادة طبيب الأسنان، ثم تستخدم هذه القوالب في المنزل مع مادة تبييض خاصة وبتركيز مناسب يحدده الطبيب حسب حالتك.",
          "يمتاز هذا الأسلوب بأنه أقل تكلفة من التبييض في العيادة، ويتيح لك التحكم في وقت الاستخدام، ويمكن استخدامه لفترات متباعدة للحفاظ على النتائج.",
          "<h2>خطوات تبييض الأسنان المنزلي</h2>",
          "<strong>1. الفحص الأولي وتقييم الحالة:</strong>",
          "يبدأ الإجراء بزيارة طبيب الأسنان لإجراء فحص شامل للتأكد من صحة أسنانك ولثتك، وتحديد سبب تغير لون الأسنان وما إذا كان التبييض مناسبًا لحالتك.",
          "<strong>2. تنظيف الأسنان:</strong>",
          "قبل البدء بإجراءات التبييض، يتم تنظيف الأسنان لإزالة الجير والرواسب التي قد تؤثر على نتائج التبييض.",
          "<strong>3. أخذ طبعة للأسنان:</strong>",
          "يقوم طبيب الأسنان بأخذ طبعة دقيقة لأسنانك لتصنيع قالب شخصي يناسب شكل أسنانك تمامًا.",
          "<strong>4. تصنيع القالب الشخصي:</strong>",
          "يتم تصنيع القالب من مادة شفافة مرنة تناسب شكل أسنانك بدقة، ويستغرق تصنيعه عادة يومًا أو يومين.",
          "<strong>5. تعليمات الاستخدام:</strong>",
          "يشرح لك الطبيب طريقة استخدام القالب والمادة المبيضة، ومدة الاستخدام اليومي (عادة بين 30 دقيقة إلى ساعتين)، وفترة العلاج الكاملة (من أسبوع إلى أسبوعين).",
          "<strong>6. المتابعة:</strong>",
          "يتم تحديد مواعيد متابعة مع الطبيب لتقييم النتائج وتعديل الخطة إذا لزم الأمر.",
          "<h2>نصائح للحصول على أفضل النتائج</h2>",
          "<ul><li>التزم بتعليمات الطبيب بدقة فيما يتعلق بمدة الاستخدام وكمية المادة المبيضة.</li><li>تجنب تناول الأطعمة والمشروبات الملونة (القهوة، الشاي، النبيذ الأحمر) خلال فترة العلاج.</li><li>حافظ على نظافة القالب بغسله بالماء البارد بعد كل استخدام.</li><li>استمر في تنظيف أسنانك بالفرشاة والمعجون كالمعتاد.</li><li>إذا شعرت بحساسية مفرطة أو انزعاج شديد، توقف عن الاستخدام واستشر طبيبك.</li></ul>",
          "<h2>محاذير يجب الانتباه إليها</h2>",
          "لا ينصح باستخدام تبييض الأسنان المنزلي في الحالات التالية:",
          "<ul><li>الأشخاص الذين يعانون من حساسية شديدة في الأسنان.</li><li>وجود تسوس أو أمراض في اللثة غير معالجة.</li><li>الحوامل والمرضعات.</li><li>الأشخاص دون سن 16 عامًا.</li><li>وجود ترميمات كبيرة أو تيجان في الأسنان الأمامية (لأن المواد الاصطناعية لا تتفاعل مع مواد التبييض).</li></ul>",
          "<h2>كم تدوم نتائج التبييض المنزلي؟</h2>",
          "عادة ما تستمر نتائج التبييض المنزلي من 6 أشهر إلى سنتين، اعتمادًا على عاداتك الغذائية والتدخين وطبيعة أسنانك. يمكن إعادة استخدام القالب لإجراءات تبييض مستقبلية للحفاظ على النتائج.",
          "<h2>الخلاصة</h2>",
          "يعد تبييض الأسنان المنزلي باستخدام القوالب الشخصية خيارًا ممتازًا لمن يرغب في تحسين لون أسنانه بطريقة آمنة وفعالة وبتكلفة معقولة. الأهم من ذلك هو إجراء هذا العلاج تحت إشراف طبيب أسنان مؤهل للحصول على أفضل النتائج وتجنب أي مضاعفات محتملة.",
          "إذا كنت تفكر في تبييض أسنانك، نرحب بك في عيادة د. محمد خشبة لتقييم حالتك وتقديم الخطة العلاجية المناسبة لك."
        ],
        relatedPosts: [
          {
            id: "dental-implants",
            title: "زراعة الأسنان - الأسئلة الأكثر شيوعًا",
            excerpt: "إجابات على الأسئلة الأكثر شيوعًا حول زراعة الأسنان وكيفية العناية بها بعد العملية",
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop"
          },
          {
            id: "children-dental-care",
            title: "العناية بأسنان الأطفال - دليل للوالدين",
            excerpt: "دليل شامل للوالدين حول كيفية العناية بأسنان أطفالهم ومتى يجب زيارة طبيب الأسنان",
            image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=500&auto=format&fit=crop"
          },
          {
            id: "dental-veneers",
            title: "كل ما تحتاج معرفته عن قشور الأسنان (الفينير)",
            excerpt: "دليل شامل حول قشور الأسنان (الفينير)، أنواعها، مميزاتها، والحالات المناسبة لها",
            image: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=500&auto=format&fit=crop"
          }
        ]
      };

      setPost(mockPostData);
      document.title = mockPostData.title + " - عيادة د. محمد خشبة";
      setLoading(false);
    }, 1000);
  }, [postId]);

  const renderContent = (content: string) => {
    if (content.startsWith("<h2>")) {
      const title = content.replace("<h2>", "").replace("</h2>", "");
      return <h2 className="text-2xl font-bold my-6  text-dental-darkGold">{title}</h2>;
    } else if (content.startsWith("<strong>")) {
      const text = content.replace("<strong>", "").replace("</strong>", "");
      return <p className="font-bold text-lg mb-2 ">{text}</p>;
    } else if (content.startsWith("<ul>")) {
      const listContent = content.replace("<ul>", "").replace("</ul>", "");
      const items = listContent.split("<li>").filter(item => item.trim() !== "");
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {items.map((item, index) => (
            <li key={index} className="">
              {item.replace("</li>", "")}
            </li>
          ))}
        </ul>
      );
    } else {
      return <p className="mb-6  text-gray-700 dark:text-gray-300 text-justify">{content}</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-dental-gold animate-pulse text-xl ">جاري تحميل المقال...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dental-gold mb-4 ">لم يتم العثور على المقال</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 ">عذرًا، لم نتمكن من العثور على المقال المطلوب.</p>
          <Button asChild>
            <Link to="/blog">العودة إلى المدونة</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dental-black/90 to-dental-black/70 z-10" />
          <LazyImage
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
          
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block mt-32 text-dental-gold border border-dental-gold px-4 py-1 rounded-full text-sm font-medium mb-4 ">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-6 text-white mb-6">

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col font-alexandria md:flex-row gap-10">
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <article className="bg-white dark:bg-dental-black/60 font-alexandria  text-start rounded-lg shadow-md p-6 md:p-10">
                <div className="prose prose-lg max-w-none  dark:prose-invert ">
                  {post.content.map((paragraph, index) => (
                    <div key={index}>{renderContent(paragraph)}</div>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <Tag className="h-5 w-5 text-dental-gold" />
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      to={`/blog?tag=${tag}`}
                      className="text-sm bg-gray-100 dark:bg-dental-black/40 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-dental-gold hover:text-white transition-colors "
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                
                {/* Share */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("تم نسخ الرابط!");
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="">مشاركة المقال</span>
                  </Button>
                  
                  <Link 
                    to="/blog" 
                    className="text-dental-gold hover:text-dental-darkGold transition-colors flex items-center "
                  >
                    <span>العودة إلى المدونة</span>
                  </Link>
                </div>
              </article>
             
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              {/* Related Posts */}
              <div className="bg-white dark:bg-dental-black/60 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4  text-dental-gold">
                  مقالات ذات صلة
                </h3>
                <div className="space-y-6">
                  {post.relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id} 
                      to={`/blog/${relatedPost.id}`}
                      className="flex flex-col sm:flex-row items-start gap-4 group"
                    >
                      <div className="shrink-0 w-full sm:w-24 h-24 rounded-md overflow-hidden">
                        <LazyImage
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-dental-gold transition-colors  line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 ">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white"
                  >
                    <Link to="/blog">
                      عرض جميع المقالات
                      <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180 rtl:mr-0 rtl:ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="bg-white dark:bg-dental-black/60 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4  text-dental-gold">
                  التصنيفات
                </h3>
                <div className="space-y-3">
                  <Link 
                    to="/blog?category=cosmetic-dentistry"
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 group "
                  >
                    <span className="group-hover:text-dental-gold transition-colors">
                      طب الأسنان التجميلي
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (12)
                    </span>
                  </Link>
                  <Link 
                    to="/blog?category=implants"
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 group "
                  >
                    <span className="group-hover:text-dental-gold transition-colors">
                      زراعة الأسنان
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (8)
                    </span>
                  </Link>
                  <Link 
                    to="/blog?category=orthodontics"
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 group "
                  >
                    <span className="group-hover:text-dental-gold transition-colors">
                      تقويم الأسنان
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (7)
                    </span>
                  </Link>
                  <Link 
                    to="/blog?category=pediatric-dentistry"
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 group "
                  >
                    <span className="group-hover:text-dental-gold transition-colors">
                      طب أسنان الأطفال
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (5)
                    </span>
                  </Link>
                  <Link 
                    to="/blog?category=dental-care"
                    className="flex items-center justify-between py-2 group "
                  >
                    <span className="group-hover:text-dental-gold transition-colors">
                      العناية بالأسنان
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (10)
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* CTA */}
              <div className="bg-dental-gold text-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 ">
                  هل تحتاج إلى استشارة؟
                </h3>
                <p className="mb-6 ">
                  احصل على استشارة مجانية من فريقنا الطبي المتخصص لمناقشة خيارات العلاج المناسبة لحالتك
                </p>
                <Button
                  asChild
                  className="w-full bg-white text-dental-gold hover:bg-dental-black hover:text-white"
                >
                  <Link to="/consultation">
                    طلب استشارة
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <AppointmentCTA />
    </div>
  );
}
