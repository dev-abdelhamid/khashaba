
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, UserRound, Phone, Mail, GraduationCap, FileText } from "lucide-react";

const registrationFormSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون أكثر من 3 أحرف" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صحيح" }),
  specialty: z.string().min(2, { message: "يرجى اختيار التخصص" }),
  courseId: z.string().min(1, { message: "يرجى اختيار الدورة" }),
  experience: z.string().min(1, { message: "يرجى اختيار سنوات الخبرة" }),
  message: z.string().optional(),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

interface CoursesRegistrationFormProps {
  courseId?: string;
  courseName?: string;
}

export default function CoursesRegistrationForm({ courseId, courseName }: CoursesRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialty: "",
      courseId: courseId || "",
      experience: "",
      message: "",
    },
  });

  function onSubmit(data: RegistrationFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast.success("تم إرسال طلب التسجيل بنجاح", {
        description: "سنتواصل معك قريبًا لتأكيد التسجيل وإتمام إجراءات الدفع",
        duration: 5000,
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  const courses = [
    { id: "implant-basic", name: "أساسيات زراعة الأسنان" },
    { id: "implant-advanced", name: "زراعة الأسنان المتقدمة" },
    { id: "cosmetic-basic", name: "أساسيات طب الأسنان التجميلي" },
    { id: "veneer-course", name: "دورة الفينير والابتسامة الهوليودية" },
    { id: "digital-dentistry", name: "طب الأسنان الرقمي" },
  ];

  return (
    <div className="bg-white dark:bg-dental-black/60 rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-8 text-center">
        <GraduationCap className="h-12 w-12 mx-auto text-dental-gold mb-4" />
        <h3 className="text-2xl font-bold mb-2 font-playfair">نموذج التسجيل في الدورات التدريبية</h3>
        <p className="text-gray-600 dark:text-gray-300 font-playfair">
          {courseName 
            ? `تسجيل في دورة: ${courseName}` 
            : "يرجى ملء النموذج التالي للتسجيل في إحدى دوراتنا التدريبية"}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-playfair">
                    <UserRound className="h-4 w-4 inline-block ml-2" />
                    الاسم الكامل
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسمك الكامل" {...field} className="font-playfair" />
                  </FormControl>
                  <FormMessage className="font-playfair" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-playfair">
                    <Mail className="h-4 w-4 inline-block ml-2" />
                    البريد الإلكتروني
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@email.com" {...field} className="font-playfair" />
                  </FormControl>
                  <FormMessage className="font-playfair" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-playfair">
                    <Phone className="h-4 w-4 inline-block ml-2" />
                    رقم الهاتف
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="رقم الهاتف" {...field} className="font-playfair" />
                  </FormControl>
                  <FormMessage className="font-playfair" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-playfair">
                    <GraduationCap className="h-4 w-4 inline-block ml-2" />
                    التخصص
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="font-playfair">
                        <SelectValue placeholder="اختر تخصصك" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="generaldentist" className="font-playfair">طبيب أسنان عام</SelectItem>
                      <SelectItem value="orthodontist" className="font-playfair">أخصائي تقويم</SelectItem>
                      <SelectItem value="implantologist" className="font-playfair">أخصائي زراعة</SelectItem>
                      <SelectItem value="endodontist" className="font-playfair">أخصائي علاج الجذور</SelectItem>
                      <SelectItem value="cosmetic" className="font-playfair">أخصائي تجميل</SelectItem>
                      <SelectItem value="oralsurgeon" className="font-playfair">جراح فم وأسنان</SelectItem>
                      <SelectItem value="pediatric" className="font-playfair">طب أسنان أطفال</SelectItem>
                      <SelectItem value="student" className="font-playfair">طالب طب أسنان</SelectItem>
                      <SelectItem value="other" className="font-playfair">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-playfair" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-playfair">
                    <Calendar className="h-4 w-4 inline-block ml-2" />
                    الدورة التدريبية
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!courseId}
                  >
                    <FormControl>
                      <SelectTrigger className="font-playfair">
                        <SelectValue placeholder="اختر الدورة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem 
                          key={course.id} 
                          value={course.id}
                          className="font-playfair"
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-playfair" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-playfair">
                    <Calendar className="h-4 w-4 inline-block ml-2" />
                    سنوات الخبرة
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="font-playfair">
                        <SelectValue placeholder="اختر سنوات الخبرة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student" className="font-playfair">طالب</SelectItem>
                      <SelectItem value="0-2" className="font-playfair">0-2 سنوات</SelectItem>
                      <SelectItem value="2-5" className="font-playfair">2-5 سنوات</SelectItem>
                      <SelectItem value="5-10" className="font-playfair">5-10 سنوات</SelectItem>
                      <SelectItem value="10+" className="font-playfair">أكثر من 10 سنوات</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-playfair" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-playfair">
                  <FileText className="h-4 w-4 inline-block ml-2" />
                  ملاحظات إضافية (اختياري)
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="أي ملاحظات أو استفسارات إضافية..." 
                    className="resize-none font-playfair"
                    rows={4} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="font-playfair" />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-dental-gold hover:bg-dental-darkGold text-white transition-colors font-playfair"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري إرسال الطلب..." : "تسجيل في الدورة"}
          </Button>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 font-playfair">
            بتسجيلك في الدورة، أنت توافق على 
            <a href="/privacy" className="text-dental-gold hover:underline"> سياسة الخصوصية </a>
            و
            <a href="/terms" className="text-dental-gold hover:underline"> شروط الاستخدام</a>
          </div>
        </form>
      </Form>
    </div>
  );
}
