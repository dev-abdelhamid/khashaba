import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/contexts/AppContext";

const blogPosts = [
  {
    id: 1,
    title: {
      ar: "تبييض الأسنان: كل ما تحتاج معرفته",
      en: "Teeth Whitening: Everything You Need to Know"
    },
    excerpt: {
      ar: "دليل شامل حول تبييض الأسنان، فوائده، أنواعه، والنصائح للحفاظ على ابتسامة مشرقة.",
      en: "A complete guide to teeth whitening: benefits, types, and tips for a brighter smile."
    },
    image: "/logogold.png",
    category: {
      ar: "العناية بالأسنان",
      en: "Dental Care"
    },
    slug: "teeth-whitening-guide",
    tags: {
      ar: ["تبييض", "جمال", "ابتسامة"],
      en: ["Whitening", "Smile", "Aesthetics"]
    }
  },
  {
    id: 2,
    title: {
      ar: "زراعة الأسنان: الحل الأمثل لفقدان الأسنان",
      en: "Dental Implants: The Ideal Solution for Missing Teeth"
    },
    excerpt: {
      ar: "كل ما تحتاج معرفته عن زراعة الأسنان ومميزاتها وخطواتها.",
      en: "Everything you need to know about implants: benefits, process, and care."
    },
    image: "/logogold.png",
    category: {
      ar: "زراعة الأسنان",
      en: "Implants"
    },
    slug: "dental-implants-solution",
    tags: {
      ar: ["زراعة", "أسنان", "تعويض"],
      en: ["Implants", "Dental", "Replacement"]
    }
  },
  {
    id: 3,
    title: {
      ar: "العادات الصحية للحفاظ على صحة الفم",
      en: "Healthy Habits for Oral Health"
    },
    excerpt: {
      ar: "نصائح وعادات يومية للحفاظ على صحة الأسنان واللثة وتجنب المشكلات.",
      en: "Daily tips and habits to keep your teeth and gums healthy and problem-free."
    },
    image: "/logogold.png",
    category: {
      ar: "صحة الفم",
      en: "Oral Health"
    },
    slug: "oral-health-habits",
    tags: {
      ar: ["صحة", "نظافة", "وقاية"],
      en: ["Health", "Cleanliness", "Prevention"]
    }
  }
];

const categories = [
  { ar: "العناية بالأسنان", en: "Dental Care" },
  { ar: "زراعة الأسنان", en: "Implants" },
  { ar: "صحة الفم", en: "Oral Health" },
  { ar: "تقويم الأسنان", en: "Orthodontics" }
];

export default function BlogPreviewSection() {
  const { isRTL } = useApp();

  const content = isRTL
    ? {
        subtitle: "مدونتنا",
        title: " أحدث المقالات والنصائح الطبية",
        description: "استكشف أحدث المقالات لصحة فم وأسنان أفضل",
        all: "جميع المقالات",
        more: "استكشف المزيد من المقالات",
        readMore: "اقرأ المزيد"
      }
    : {
        subtitle: "Our Blog",
        title: " The  Recent Dental Articles and Tips",
        description: "Discover the latest articles for better oral health",
        all: "All Articles",
        more: "Explore More Articles",
        readMore: "Read More"
      };

  return (
    <section className="py-10 bg-gray-50 dark:bg-dental-black/80" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-custom text-center">
        <SectionTitle
          subtitle={content.subtitle}
          title={content.title}
          description={content.description}
          center
        />

        <Tabs defaultValue="all" className="mt-12">
       

          <TabsContent value="all">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} isRTL={isRTL} readMore={content.readMore} />
              ))}
            </motion.div>
          </TabsContent>

          {categories.map((category, index) => {
            const catValue = isRTL ? category.ar : category.en;
            return (
              <TabsContent key={index} value={catValue}>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {blogPosts
                    .filter((post) => (isRTL ? post.category.ar : post.category.en) === catValue)
                    .map((post) => (
                      <BlogCard key={post.id} post={post} isRTL={isRTL} readMore={content.readMore} />
                    ))}
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button asChild className="bg-gradient-to-b from-dental-gold to-dental-darkGold text-white">
            <Link to="/blog" className="flex items-center gap-2 justify-center">
              <span>{content.more}</span>
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rtl:rotate-180" : ""}`} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function BlogCard({ post, isRTL, readMore }: any) {
  return (
    <motion.article className="bg-white dark:bg-dental-black rounded-lg overflow-hidden border border-dental-gold dark:border-dental-darkGold shadow-lg hover:shadow-xl transition-all duration-300">
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title[isRTL ? "ar" : "en"]}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
             <div className="flex flex-wrap gap-2 justify-center mb-4">
          {post.tags[isRTL ? "ar" : "en"].map((tag: string, idx: number) => (
            <span
              key={idx}
              className="inline-block bg-gray-100 dark:bg-white/10 border border-dental-gold text-gray-600 dark:text-white text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
      <div className="p-6 pt-6 border-t border-dental-gold  mx-4    text-center">
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2  hover:text-dental-gold transition-colors duration-300">
            {post.title[isRTL ? "ar" : "en"]}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt[isRTL ? "ar" : "en"]}
        </p>
   
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex underline items-center text-dental-gold hover:text-dental-darkGold transition-colors duration-300 font-medium"
        >
          <span>{readMore}</span>
        </Link>
      </div>
    </motion.article>
  );
}
