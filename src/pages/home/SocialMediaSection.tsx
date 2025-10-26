
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export default function SocialMediaSection() {
  const socialMedias = [
    {
      icon: <Facebook className="h-8 w-8 text-blue-600" />,
      name: "Facebook",
      username: "@DrKhashbaDental",
      link: "https://facebook.com"
    },
    {
      icon: <Instagram className="h-8 w-8 text-pink-600" />,
      name: "Instagram",
      username: "@dr_khashba_dental",
      link: "https://instagram.com"
    },
    {
      icon: <Twitter className="h-8 w-8 text-blue-400" />,
      name: "Twitter",
      username: "@DrKhashbaDental",
      link: "https://twitter.com"
    },
    {
      icon: <Youtube className="h-8 w-8 text-red-600" />,
      name: "Youtube",
      username: "DrKhashbaDentalClinic",
      link: "https://youtube.com"
    },
    {
      icon: <Linkedin className="h-8 w-8 text-blue-700" />,
      name: "LinkedIn",
      username: "dr-mohamed-khashba",
      link: "https://linkedin.com"
    }
  ];

  const instagramPosts = [
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616491649373-28cbfcbfbe4f?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2132&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782573?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606265752409-ad6783e0f9a3?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2664&auto=format&fit=crop"
  ];

  return (
    <section className="py-24 bg-white dark:bg-dental-black/80">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="تواصل معنا"
          title="تابعنا على وسائل التواصل الاجتماعي"
          description="تابعنا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والنصائح ومشاهدة حالات قبل وبعد العلاج"
          center
        />
        
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {socialMedias.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-50 dark:bg-dental-darkGray p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mr-3">
                {social.icon}
              </div>
              <div>
                <p className="font-bold">{social.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{social.username}</p>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">أحدث المنشورات على Instagram</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow aspect-square"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <img 
                  src={post} 
                  alt={`Instagram post ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            className="bg-dental-gold/10 inline-block px-6 py-3 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-dental-gold font-bold">
              شاركونا تجاربكم عبر وسم #DrKhashbaDental
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
