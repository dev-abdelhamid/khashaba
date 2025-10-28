// components/QuickBookingForm.tsx
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { Send, Check, User, Phone, FileText } from "lucide-react";

const WHATSAPP_NUMBER = "+201040659965";

// السكيما المحدثة: ملاحظات بدل التاريخ
const quickBookingSchema = z.object({
  name: z.string().min(2, { message: "الاسم قصير جدًا" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }),
  service: z.string().min(1, { message: "اختر الخدمة" }),
  notes: z.string().optional(),
});

type QuickBookingValues = z.infer<typeof quickBookingSchema>;

// الخدمات المطلوبة فقط
const services = [
  { value: "veneers", labelAr: "فينيرز الأسنان", labelEn: "Dental Veneers" },
  { value: "implant", labelAr: "زراعة الأسنان", labelEn: "Dental Implant" },
  { value: "composite", labelAr: "كومبوزيت فينيرز", labelEn: "Composite Veneers" },
  { value: "orthodontics", labelAr: "تقويم الأسنان", labelEn: "Orthodontics" },
  { value: "whitening", labelAr: "تبييض الأسنان", labelEn: "Teeth Whitening" },
  { value: "clear-aligners", labelAr: "تقويم شفاف", labelEn: "Clear Aligners" },
];

const QuickBookingForm = memo(() => {
  const { isRTL } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<QuickBookingValues>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      notes: "",
    },
  });

  const sendToWhatsApp = (data: QuickBookingValues) => {
    const serviceLabel = services.find(s => s.value === data.service)?.[isRTL ? 'labelAr' : 'labelEn'] || data.service;
    const notes = data.notes ? `\nملاحظات: ${data.notes}` : "";

    const message = isRTL
      ? `حجز سريع\n\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${serviceLabel}${notes}`
      : `Quick Booking\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${serviceLabel}${notes ? `\nNotes: ${data.notes}` : ""}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const onSubmit = (data: QuickBookingValues) => {
    sendToWhatsApp(data);
    toast.success(isRTL ? "تم إرسال حجزك السريع!" : "Quick booking sent!", {
      position: "top-center",
      duration: 5000,
    });
    setSubmitted(true);
    form.reset();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-gradient-to-br from-dental-gold/5 to-dental-darkGold/5 p-6 rounded-xl border border-dental-gold/20">
      <h3 className="text-xl font-bold text-center mb-2 text-dental-dark">
        {isRTL ? "حجز سريع في دقيقة" : "Quick Booking in 1 Minute"}
      </h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-5">
        {isRTL ? "املأ النموذج وسنتواصل معك فورًا" : "Fill the form and we'll contact you immediately"}
      </p>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
                {/* الاسم */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center">
                        <User className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                        {isRTL ? "الاسم" : "Name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={isRTL ? "الاسم الكامل" : "Your Full Name"}
                          {...field}
                          className="h-11 focus-visible:ring-dental-gold text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* الهاتف */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center">
                        <Phone className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                        {isRTL ? "الهاتف" : "Phone"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={isRTL ? "مثال: 01040659965" : "e.g. 01040659965"}
                          {...field}
                          className="h-11 focus-visible:ring-dental-gold text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* الخدمة */}
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        {isRTL ? "الخدمة المطلوبة" : "Desired Service"}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}  >
                        <FormControl>
                          <SelectTrigger className="h-11 focus:ring-dental-gold w-full flex flex-row items-center justify-between"  dir={isRTL ? "rtl" : ""} >
                            <SelectValue dir={isRTL ? "rtl" : ""} placeholder={isRTL ? "اختر الخدمة" : "Select a service"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir={isRTL ? "rtl" : ""} >
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {isRTL ? service.labelAr : service.labelEn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ملاحظات (بدل التاريخ) */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center">
                        <FileText className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                        {isRTL ? "ملاحظات (اختياري)" : "Notes (Optional)"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={isRTL ? "أي تفاصيل إضافية (مثل: أريد موعد مسائي)" : "Any extra details (e.g. evening appointment)"}
                          className="min-h-[90px] resize-none focus-visible:ring-dental-gold text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* زر الإرسال */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-dental-gold hover:bg-dental-darkGold text-white font-medium transition-all"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                  {isRTL ? "إرسال الحجز السريع" : "Send Quick Booking"}
                </Button>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="text-center py-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-lg font-bold text-dental-dark mb-2">
              {isRTL ? "تم الإرسال!" : "Sent!"}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {isRTL ? "سنتواصل معك خلال دقائق" : "We’ll contact you within minutes"}
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white"
            >
              {isRTL ? "حجز آخر" : "Book Another"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

QuickBookingForm.displayName = "QuickBookingForm";

export default QuickBookingForm;