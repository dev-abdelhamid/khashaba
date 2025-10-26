
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MessageCircle, Phone, Send, Clock, Info, Star, Check, Shield, Award, FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import SectionTitle from "@/components/SectionTitle";
import { motion } from "framer-motion";

const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }),
  problem: z.string().min(10, { message: "الوصف قصير جدا" }),
});

// Common questions and answers
const faqItems = [
  {
    question: "كيف أعرف إذا كنت بحاجة إلى استشارة أسنان؟",
    answer: "يُنصح بزيارة طبيب الأسنان للاستشارة إذا كنت تعاني من ألم في الأسنان، نزيف اللثة، حساسية مفرطة، تغير في لون الأسنان، رائحة الفم الكريهة المستمرة، أو إذا كنت ترغب في تحسين مظهر أسنانك. الاستشارة المبكرة تساعد في تجنب المشاكل الكبيرة لاحقًا."
  },
  {
    question: "كم تستغرق جلسة الاستشارة؟",
    answer: "عادة ما تستغرق جلسة الاستشارة من 30 إلى 45 دقيقة. خلال هذا الوقت، سيقوم الطبيب بفحص أسنانك وتقييم حالتك وتقديم خطة علاجية مناسبة لحالتك."
  },
  {
    question: "هل الاستشارة مؤلمة؟",
    answer: "لا، جلسة الاستشارة غير مؤلمة بالمرة. هي مجرد فحص وتقييم للحالة وتصوير أشعة إذا لزم الأمر. الهدف منها هو تحديد المشكلة وتقديم الحلول المناسبة."
  },
  {
    question: "ما هي الأوراق المطلوبة للاستشارة؟",
    answer: "يُفضل إحضار أي تقارير طبية سابقة أو صور أشعة إذا كانت متوفرة. أيضًا، يجب تعبئة استمارة التاريخ المرضي التي ستُقدم لك في العيادة."
  },
  {
    question: "هل يمكنني الحصول على استشارة عبر الإنترنت؟",
    answer: "نعم، نقدم خدمة الاستشارة عبر الإنترنت للحالات التي لا تتطلب فحصًا مباشرًا. يمكنك حجز موعد للاستشارة عبر الإنترنت من خلال موقعنا."
  },
  {
    question: "ما هي فوائد الاستشارة المبكرة؟",
    answer: "الاستشارة المبكرة تساعد في اكتشاف المشاكل قبل تفاقمها، وتقليل تكاليف العلاج المستقبلية، وتجنب الألم والمضاعفات، والحفاظ على صحة الأسنان على المدى الطويل."
  },
  {
    question: "هل الاستشارة تشمل خطة علاجية؟",
    answer: "نعم، بعد الفحص والتشخيص، سيقدم الطبيب خطة علاجية مفصلة تتضمن الخيارات العلاجية المتاحة، والتكاليف التقديرية، والفترة الزمنية المتوقعة للعلاج."
  },
];

// Consultation types
const consultationTypes = [
  {
    title: "استشارة عامة",
    icon: <MessageCircle className="h-6 w-6 text-dental-gold" />,
    description: "للمشاكل العامة وتقييم صحة الفم والأسنان وتحديد خطة علاجية شاملة.",
    price: "مجانية",
    duration: "30 دقيقة",
    features: ["فحص شامل للفم والأسنان", "تقييم الحالة الصحية", "تقديم النصائح والإرشادات", "تحديد خطة العلاج المناسبة"],
  },
  {
    title: "استشارة تجميلية",
    icon: <Star className="h-6 w-6 text-dental-gold" />,
    description: "للراغبين في تحسين جمال ابتسامتهم من خلال تقنيات تجميل الأسنان المختلفة.",
    price: "٢٠٠ جنيه",
    duration: "45 دقيقة",
    features: ["تقييم شكل الابتسامة", "عرض الخيارات التجميلية المتاحة", "تصميم الابتسامة الرقمي", "خطة علاجية تجميلية"],
  },
  {
    title: "استشارة تقويم",
    icon: <FileText className="h-6 w-6 text-dental-gold" />,
    description: "لتقييم الحاجة لتقويم الأسنان وعرض الخيارات المتاحة والتكلفة.",
    price: "٣٠٠ جنيه",
    duration: "60 دقيقة",
    features: ["تقييم حالة الأسنان والفكين", "تحديد نوع التقويم المناسب", "تقدير المدة الزمنية للعلاج", "شرح خطوات ومراحل العلاج"],
  }
];

// Consultation benefits
const consultationBenefits = [
  {
    title: "تشخيص دقيق",
    description: "نستخدم أحدث التقنيات والأجهزة لتشخيص مشاكل الأسنان بدقة عالية.",
    icon: <Check className="h-8 w-8 text-dental-gold" />,
  },
  {
    title: "خطة علاجية شاملة",
    description: "نقدم خطة علاجية مفصلة تناسب احتياجاتك وميزانيتك.",
    icon: <FileText className="h-8 w-8 text-dental-gold" />,
  },
  {
    title: "فريق طبي متميز",
    description: "يقوم بالاستشارات فريق من الأطباء ذوي الخبرة والتخصصات المختلفة.",
    icon: <Award className="h-8 w-8 text-dental-gold" />,
  },
  {
    title: "بيئة مريحة وآمنة",
    description: "نوفر بيئة مريحة ومطمئنة للمرضى تساعدهم على الاسترخاء والشعور بالأمان.",
    icon: <Shield className="h-8 w-8 text-dental-gold" />,
  },
  {
    title: "متابعة مستمرة",
    description: "نتابع حالتك بعد الاستشارة لضمان الحصول على أفضل النتائج.",
    icon: <Clock className="h-8 w-8 text-dental-gold" />,
  },
  {
    title: "مرونة في المواعيد",
    description: "نوفر مواعيد مرنة تناسب جدولك اليومي، بما في ذلك المواعيد المسائية وعطلة نهاية الأسبوع.",
    icon: <Calendar className="h-8 w-8 text-dental-gold" />,
  },
];

// Doctor profiles
const doctors = [
  {
    name: "د. محمد خشبة",
    specialty: "طب الأسنان العام وزراعة الأسنان",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
    experience: "15 سنة",
    degrees: "دكتوراه في جراحة الفم والأسنان - عضو الجمعية الأمريكية لزراعة الأسنان",
  },
  {
    name: "د. سارة أحمد",
    specialty: "تجميل وتبييض الأسنان",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
    experience: "10 سنوات",
    degrees: "ماجستير في تجميل الأسنان - عضو الأكاديمية الأوروبية لتجميل الأسنان",
  },
  {
    name: "د. أحمد مصطفى",
    specialty: "تقويم الأسنان",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    experience: "12 سنة",
    degrees: "دكتوراه في تقويم الأسنان - زميل الكلية الملكية للجراحين",
  },
];

// Testimonials
const testimonials = [
  {
    name: "محمد سعيد",
    text: "حصلت على استشارة ممتازة من الدكتور محمد. شرح لي حالتي بالتفصيل وقدم لي خطة علاجية واضحة ومناسبة لميزانيتي.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "سارة محمود",
    text: "كنت قلقة جداً بشأن مشكلة في أسناني، لكن بعد الاستشارة مع الدكتورة سارة شعرت بالاطمئنان. الخدمة كانت ممتازة والنتيجة رائعة.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "أحمد عبد الرحمن",
    text: "استشارة احترافية ودقيقة، والطاقم كان ودوداً ومتعاوناً. أنصح بشدة بزيارة العيادة للحصول على استشارة متميزة.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const Consultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("online-consultation");
  
  const form = useForm<z.infer<typeof consultationFormSchema>>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      problem: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof consultationFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("تم إرسال طلب الاستشارة بنجاح، سنتواصل معك قريبًا");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  useEffect(() => {
    document.title = "استشارة طبية - عيادة د. محمد خشبة";
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-dental-gold text-white py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609840114035-3c981b782fbf?q=80&w=2787&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 ">استشارة طبية</h1>
            <p className="text-white/80 max-w-2xl mx-auto ">
              خبراؤنا جاهزون لتقديم المشورة الطبية المتخصصة وتحديد خطة العلاج المثالية لحالتك
            </p>
            <div className="flex justify-center mt-6">
              <ul className="flex flex-wrap items-center justify-center">
                <li className="flex items-center mx-3">
                  <Link to="/" className="text-white hover:text-white/70 transition font-playfair">
                    الرئيسية
                  </Link>
                  <span className="mx-2 text-white/50">/</span>
                </li>
                <li>
                  <span className="text-white/70 ">استشارة طبية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-dental-black/20 mb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle
              subtitle="مميزات الاستشارة"
              title="لماذا تحتاج إلى استشارة متخصصة؟"
              description="الاستشارة المتخصصة هي الخطوة الأولى نحو الحصول على ابتسامة صحية وجذابة. استفد من خبرة أطبائنا المتخصصين."
              center
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {consultationBenefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-dental-darkGray border border-primary rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                variants={fadeIn}
              >
                <div className="w-16 h-16 rounded-full bg-dental-gold/10 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 ">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 ">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consultation Types Section */}
      <section className="py-16 mb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle
              subtitle="أنواع الاستشارات"
              title="اختر نوع الاستشارة المناسب لك"
              description="نقدم مجموعة متنوعة من الاستشارات المتخصصة لتلبية احتياجاتك المختلفة"
              center
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {consultationTypes.map((type, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-dental-darkGray rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
                variants={fadeIn}
              >
                <div className="bg-dental-gold/5 p-6 text-center border-b border-gray-100 dark:border-gray-800">
                  <div className="w-14 h-14 rounded-full bg-white dark:bg-dental-black flex items-center justify-center mx-auto mb-4 shadow-md">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-playfair">{type.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 font-ibm">{type.description}</p>
                  <div className="flex justify-center items-center gap-4 mb-2">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-playfair">السعر</p>
                      <p className="text-lg font-bold text-dental-gold font-playfair">{type.price}</p>
                    </div>
                    <div className="h-8 border-r border-gray-200 dark:border-gray-700"></div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-playfair">المدة</p>
                      <p className="text-lg font-bold text-dental-gold font-playfair">{type.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-md font-semibold mb-3 font-playfair">ما تتضمنه الاستشارة:</h4>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-dental-gold ml-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm font-ibm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <Button asChild className="bg-dental-gold hover:bg-dental-darkGold text-white">
                      <Link to="/appointment" className="font-playfair">
                        حجز استشارة
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Our Doctors Section */}
      <section className="py-16 bg-gray-50 dark:bg-dental-black/20 mb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle
              subtitle="فريقنا الطبي"
              title="تعرف على أطبائنا الاستشاريين"
              description="فريق من الأطباء ذوي الخبرة والكفاءة العالية مستعد لتقديم أفضل استشارة طبية لك"
              center
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {doctors.map((doctor, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-dental-darkGray rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 font-playfair">{doctor.name}</h3>
                  <p className="text-dental-gold mb-2 font-playfair">{doctor.specialty}</p>
                  <div className="flex justify-center items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="h-4 w-4 ml-1" />
                    <span className="font-ibm">خبرة {doctor.experience}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 font-ibm">{doctor.degrees}</p>
                  <Button asChild variant="outline" className="border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white">
                    <Link to="/appointment" className="font-playfair">
                      حجز استشارة
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consultation Form & Info Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Consultation Form */}
          <motion.div 
            className="bg-white dark:bg-dental-darkGray rounded-lg shadow-lg p-8 animate-fade-in-up"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle
              subtitle="استشارة متخصصة"
              title="احصل على استشارة طبية"
              description="اكتب مشكلتك وسنقوم بالرد عليك في أقرب وقت ممكن بتشخيص مبدئي وخطة العلاج المقترحة."
            />

            <Tabs defaultValue="online-consultation" className="mt-8">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="online-consultation" className="font-playfair">استشارة أونلاين</TabsTrigger>
                <TabsTrigger value="visit-consultation" className="font-playfair">زيارة العيادة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="online-consultation">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-playfair">الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} className="font-ibm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-playfair">البريد الإلكتروني</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل بريدك الإلكتروني" {...field} className="font-ibm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-playfair">رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل رقم هاتفك" {...field} className="font-ibm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="problem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-playfair">وصف المشكلة</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="اشرح مشكلتك بالتفصيل ليتمكن الطبيب من تقديم استشارة دقيقة..." 
                              className="min-h-[120px] font-ibm" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-dental-gold/10 p-4 rounded-md">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-dental-gold shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-ibm">
                          سيقوم الطبيب بمراجعة طلبك وتقديم استشارة أولية. قد نحتاج للتواصل معك هاتفياً أو تحديد موعد للكشف في العيادة إذا تطلب الأمر.
                        </p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-dental-gold hover:bg-dental-darkGold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 font-playfair">
                          <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span>
                          جارٍ الإرسال...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 font-playfair">
                          <Send className="w-4 h-4" />
                          إرسال طلب الاستشارة
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="visit-consultation">
                <div className="space-y-6">
                  <div className="bg-dental-gold/10 p-5 rounded-lg">
                    <h3 className="text-lg font-bold mb-3 font-playfair">موعد للزيارة الشخصية</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-ibm">
                      يمكنك حجز موعد لزيارة العيادة والحصول على استشارة شخصية من الطبيب مباشرة. الاستشارة الشخصية تتيح للطبيب فحصًا دقيقًا لحالتك وتقديم تشخيص أكثر دقة.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-dental-gold" />
                        <div>
                          <p className="font-semibold text-sm font-playfair">عنوان العيادة:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-ibm">المنصورة، شارع الجمهورية، برج الأطباء، الدور الثالث</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-dental-gold" />
                        <div>
                          <p className="font-semibold text-sm font-playfair">مواعيد العمل:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-ibm">السبت - الخميس: 10 صباحًا - 8 مساءً</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      className="w-full mt-6 bg-dental-gold hover:bg-dental-darkGold"
                    >
                      <Link to="/appointment" className="flex items-center gap-2 font-playfair">
                        <Calendar className="w-4 h-4" />
                        حجز موعد في العيادة
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="text-lg font-bold mb-3 font-playfair">التواصل المباشر</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-ibm">
                      يمكنك التواصل معنا مباشرة للاستفسار عن المواعيد المتاحة أو للحصول على مزيد من المعلومات حول خدماتنا.
                    </p>
                    <div className="space-y-3">
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full border-dental-gold text-dental-gold hover:bg-dental-gold/10"
                      >
                        <a href="tel:+201040659965" className="flex items-center gap-2 font-playfair">
                          <Phone className="w-4 h-4" />
                          اتصل بنا: +201040659965
                        </a>
                      </Button>
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full border-dental-gold text-dental-gold hover:bg-dental-gold/10"
                      >
                        <a href="https://wa.me/201040659965" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-playfair">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          تواصل عبر واتساب
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Consultation Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle
              subtitle="معلومات الاستشارة"
              title="خدمة الاستشارة لدينا"
              description="نقدم استشارات متخصصة في كافة مجالات طب الأسنان. فريقنا الطبي جاهز لتقديم المشورة والمساعدة."
            />

            <div className="space-y-8 mt-8">
              <div className="bg-white dark:bg-dental-darkGray rounded-lg p-6 shadow-md flex gap-4 animate-fade-in-up">
                <div className="h-12 w-12 rounded-full bg-dental-gold/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-6 w-6 text-dental-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-playfair">استشارة شخصية</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-ibm">
                    يمكنك حجز موعد لزيارة العيادة والحصول على استشارة شخصية من الطبيب مباشرة. الاستشارة الشخصية تتيح للطبيب فحصًا دقيقًا لحالتك وتقديم تشخيص أكثر دقة.
                  </p>
                  <Button asChild variant="ghost" className="text-dental-gold hover:text-dental-darkGold mt-2 px-0">
                    <Link to="/appointment" className="font-playfair">حجز موعد استشارة <Clock className="mr-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-dental-darkGray rounded-lg p-6 shadow-md flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="h-12 w-12 rounded-full bg-dental-gold/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-6 w-6 text-dental-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-playfair">استشارة أونلاين</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-ibm">
                    نقدم خدمة الاستشارة عبر الإنترنت للحالات التي لا تتطلب فحصًا مباشرًا. يمكنك إرسال تفاصيل حالتك وصور إن أمكن، وسيقوم الطبيب بالرد خلال 24 ساعة.
                  </p>
                  <Button asChild variant="ghost" className="text-dental-gold hover:text-dental-darkGold mt-2 px-0">
                    <a href="https://wa.me/201040659965" target="_blank" rel="noopener noreferrer" className="font-playfair">
                      التواصل عبر واتساب <Phone className="mr-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-6 font-playfair">آراء المرضى</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-dental-darkGray rounded-lg p-4 shadow-md border-r-4 border-dental-gold"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold font-playfair">{testimonial.name}</h4>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} fill={i < testimonial.rating ? "currentColor" : "none"} className="h-4 w-4 text-dental-gold" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm font-ibm">{testimonial.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-6 font-playfair">الأسئلة الشائعة</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-right font-medium font-playfair">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300 font-ibm">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-dental-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">ابدأ رحلتك نحو ابتسامة صحية</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 font-ibm">
              فريقنا الطبي جاهز لتقديم أفضل استشارة طبية تناسب حالتك. لا تتردد في التواصل معنا اليوم!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-dental-gold hover:bg-gray-100">
                <Link to="/appointment" className="font-playfair px-6 py-6">
                  حجز موعد الآن
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <a href="tel:+201040659965" className="font-playfair px-6 py-6">
                  اتصل بنا: +201040659965
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
