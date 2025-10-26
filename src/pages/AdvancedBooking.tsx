import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Send, 
  CheckCircle, 
  RotateCcw,
  ChevronRight,
  ChevronLeft,Info,
  Phone,
  MessageCircle,
  User,
  Mail,
  FileText,
  MapPin,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionTitle from "@/components/SectionTitle";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "@/contexts/AppContext";

import { motion, AnimatePresence } from "framer-motion";

// Services data with translations
const servicesData = {
  ar: [
    { id: 1, name: "فحص وتشخيص", duration: 30, price: 300, icon: "🔍" },
    { id: 2, name: "تنظيف الأسنان", duration: 60, price: 500, icon: "🦷" },
    { id: 3, name: "تبييض الأسنان", duration: 90, price: 1200, icon: "✨" },
    { id: 4, name: "علاج قنوات الجذور", duration: 120, price: 1500, icon: "🔧" },
    { id: 5, name: "زراعة الأسنان", duration: 120, price: 3000, icon: "🌱" },
    { id: 6, name: "تقويم الأسنان", duration: 60, price: 1000, icon: "📐" },
    { id: 7, name: "طب أسنان الأطفال", duration: 45, price: 400, icon: "👶" },
    { id: 8, name: "طب الأسنان التجميلي", duration: 90, price: 1800, icon: "💎" },
    { id: 9, name: "جراحة الفم والفكين", duration: 120, price: 2000, icon: "🏥" },
    { id: 10, name: "استشارة عامة", duration: 30, price: 200, icon: "💬" }
  ],
  en: [
    { id: 1, name: "Examination & Diagnosis", duration: 30, price: 300, icon: "🔍" },
    { id: 2, name: "Teeth Cleaning", duration: 60, price: 500, icon: "🦷" },
    { id: 3, name: "Teeth Whitening", duration: 90, price: 1200, icon: "✨" },
    { id: 4, name: "Root Canal Treatment", duration: 120, price: 1500, icon: "🔧" },
    { id: 5, name: "Dental Implants", duration: 120, price: 3000, icon: "🌱" },
    { id: 6, name: "Orthodontics", duration: 60, price: 1000, icon: "📐" },
    { id: 7, name: "Pediatric Dentistry", duration: 45, price: 400, icon: "👶" },
    { id: 8, name: "Cosmetic Dentistry", duration: 90, price: 1800, icon: "💎" },
    { id: 9, name: "Oral Surgery", duration: 120, price: 2000, icon: "🏥" },
    { id: 10, name: "General Consultation",  }
  ]
};

// Generate available time slots
const generateTimeSlots = (date: Date, isRTL: boolean) => {
  const isWeekend = date && date.getDay() === 5; // Friday
  if (isWeekend) return [];

  const slots = isRTL ? [
    "10:00 صباحًا",
    "11:00 صباحًا", 
    "12:00 مساءً",
    "1:00 مساءً",
    "2:00 مساءً",
    "3:00 مساءً",
    "4:00 مساءً",
    "5:00 مساءً",
    "6:00 مساءً",
    "7:00 مساءً"
  ] : [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM", 
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM"
  ];

  // Randomly make some slots unavailable for demo
  return slots.filter(() => Math.random() > 0.3);
};

// Translations
const translations = {
  ar: {
    pageTitle: "حجز موعد متقدم",
    pageSubtitle: "احجز موعدك بطريقة سهلة وسريعة مع اختيار الخدمة والوقت المناسب لك",
    home: "الرئيسية",
    sectionTitle: "حجز موعد متقدم",
    sectionSubtitle: "اختر موعدك المناسب",
    sectionDescription: "نظام حجز متطور يتيح لك اختيار الخدمة والتاريخ والوقت المناسب لك بسهولة.",
    
    // Steps
    step1: "اختيار الموعد",
    step2: "معلوماتك",
    step3: "التأكيد",
    
    // Step 1
    step1Title: "اختر الخدمة والموعد المناسب",
    selectService: "اختر الخدمة",
    selectServicePlaceholder: "اختر الخدمة المطلوبة",
    sessionDuration: "مدة الجلسة",
    minutes: "دقيقة",
    selectDate: "التاريخ",
    selectDatePlaceholder: "اختر التاريخ",
    selectTime: "الوقت",
    selectTimePlaceholder: "اختر الوقت",
    noAvailableSlots: "لا توجد مواعيد متاحة في هذا اليوم",
    selectDateFirst: "اختر التاريخ أولاً",
    
    // Step 2
    step2Title: "أدخل بياناتك الشخصية",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الكامل",
    phoneNumber: "رقم الهاتف",
    phoneNumberPlaceholder: "أدخل رقم هاتفك",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    notes: "ملاحظات إضافية (اختياري)",
    notesPlaceholder: "أي معلومات إضافية ترغب في إضافتها...",
    needHelp: "تحتاج لمساعدة؟",
    
    // Step 3
    step3Title: "تأكيد الحجز",
    appointmentDetails: "تفاصيل الموعد",
    personalInfo: "بياناتك الشخصية",
    service: "الخدمة",
    date: "التاريخ",
    time: "الوقت",
    duration: "المدة",
    price: "السعر",
    name: "الاسم",
    phone: "رقم الهاتف",
    emailLabel: "البريد الإلكتروني",
    notesLabel: "ملاحظات",
    bookingSuccessMessage : "تم حجز موعدك بنجاح! ستصلك رسالة تأكيد على رقم هاتفك وبريدك الإلكتروني.",
    patientName: "اسم المريض",
    
    
    // Important notes
    importantNotes: "ملاحظات هامة:",
    note1: "• يرجى الوصول قبل موعدك بـ 15 دقيقة.",
    note2: "• يمكنك إلغاء الموعد قبل 24 ساعة من الموعد المحدد.",
    note3: "• ستصلك رسالة تأكيد على رقم هاتفك وبريدك الإلكتروني.",
    
    // Buttons
    previous: "السابق",
    next: "التالي",
    confirmBooking: "تأكيد الحجز",
    submitting: "جارٍ تأكيد الحجز...",
    
    // Success page
    bookingSuccess: "تم حجز موعدك بنجاح!",
    successMessage: "شكرًا لك على حجز موعد في عيادة د. محمد خشبة. تم تأكيد موعدك وسنرسل لك رسالة تأكيد على بريدك الإلكتروني ورقم هاتفك.",
    backToHome: "العودة للرئيسية",
    bookAnother: "حجز موعد آخر",
    contactWhatsApp: "تواصل عبر واتساب",
    callNow: "اتصل الآن",
    
    // Validation messages
    serviceRequired: "يرجى اختيار الخدمة",
    dateRequired: "يرجى اختيار التاريخ",
    timeRequired: "يرجى اختيار الوقت",
    nameRequired: "الاسم مطلوب",
    nameMinLength: "الاسم يجب أن يكون أكثر من حرفين",
    phoneRequired: "رقم الهاتف مطلوب",
    phoneInvalid: "رقم الهاتف غير صالح",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "البريد الإلكتروني غير صالح",
    completeAllFields: "يرجى إكمال جميع الحقول المطلوبة",
    bookingSuccessToast: "تم حجز موعدك بنجاح!",
    appointmentSummary: "تفاصيل الموعد",
    appointmentDate: "تاريخ الموعد",
    appointmentTime: "وقت الموعد",
    appointmentDuration: "مدة الموعد",
    appointmentPrice: "سعر الموعد",
    importantNote: "ملاحظات هامة",
    confirmationNote: "يرجى الوصول قبل موعدك بـ 15 دقيقة.",
    sendToWhatsApp  : "ارسل عبر واتساب",
    nextStep1 : "التالي",
    nextStep2 : "التالي",
    nextStep3 : "التالي",
    nextSteps : "التالي",
    contactUs : "تواصل معنا",
    location : "الموقع",
    whatsapp : "ارسل عبر واتساب",
    
    
    // Currency
    currency: "ج.م"
  },
  en: {
    pageTitle: "Advanced Booking",
    pageSubtitle: "Book your appointment easily and quickly by choosing the service and time that suits you",
    home: "Home",
    sectionTitle: "Advanced Booking",
    sectionSubtitle: "Choose Your Convenient Appointment",
    sectionDescription: "An advanced booking system that allows you to easily choose the service, date and time that suits you.",
    
    // Steps
    step1: "Select Appointment",
    step2: "Your Information",
    step3: "Confirmation",
    nextSteps: "Next Steps",
    whatsapp: "Send to WhatsApp",
    needHelp: "Need Help?",
    contactUs: "Contact Us",
    location: "Location",
    bookingSuccessMessage: "Your appointment has been successfully booked!",
    
    // Step 1
    step1Title: "Choose Service and Convenient Appointment",
    selectService: "Select Service",
    selectServicePlaceholder: "Choose required service",
    sessionDuration: "Session Duration",
    minutes: "minutes",
    selectDate: "Date",
    selectDatePlaceholder: "Select date",
    selectTime: "Time",
    selectTimePlaceholder: "Select time",
    noAvailableSlots: "No available appointments on this day",
    selectDateFirst: "Select date first",
    
    // Step 2
    step2Title: "Enter Your Personal Information",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "Enter your phone number",
    email: "Email",
    emailPlaceholder: "Enter your email",
    notes: "Additional Notes (Optional)",
    notesPlaceholder: "Any additional information you'd like to add...",
    
    // Step 3
    step3Title: "Booking Confirmation",
    appointmentDetails: "Appointment Details",
    personalInfo: "Your Personal Information",
    service: "Service",
    date: "Date",
    time: "Time",
    duration: "Duration",
    price: "Price",
    name: "Name",
    phone: "Phone Number",
    emailLabel: "Email",
    notesLabel: "Notes",
    
    // Important notes
    importantNotes: "Important Notes:",
    note1: "• Please arrive 15 minutes before your appointment.",
    note2: "• You can cancel the appointment 24 hours before the scheduled time.",
    note3: "• You will receive a confirmation message on your phone and email.",
    
    // Buttons
    previous: "Previous",
    next: "Next",
    confirmBooking: "Confirm Booking",
    submitting: "Confirming Booking...",
    
    // Success page
    bookingSuccess: "Your Appointment Booked Successfully!",
    successMessage: "Thank you for booking an appointment at Dr. Mohamed Khashaba Clinic. Your appointment has been confirmed and we will send you a confirmation message to your email and phone number.",
    backToHome: "Back to Home",
    bookAnother: "Book Another Appointment",
    contactWhatsApp: "Contact via WhatsApp",
    callNow: "Call Now",
    
    // Validation messages
    serviceRequired: "Please select a service",
    dateRequired: "Please select a date",
    timeRequired: "Please select a time",
    nameRequired: "Name is required",
    nameMinLength: "Name must be more than 2 characters",
    phoneRequired: "Phone number is required",
    phoneInvalid: "Invalid phone number",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email",
    completeAllFields: "Please complete all required fields",
    bookingSuccessToast: "Your appointment booked successfully!",
    sendToWhatsApp  : "Send to WhatsApp",
    nextStep1 : "Next Step",
    nextStep2 : "Next Step",
    nextStep3 : "Next Step",
    appointmentTime : "Appointment Time",
    patientName : "Patient Name",
    appointmentDate : "Appointment Date",
    appointmentDuration : "Appointment Duration",
    appointmentPrice : "Appointment Price",
    appointmentSummary : "Appointment Summary",
    importantNote : "Important Notes",
    confirmationNote : "Please arrive 15 minutes before your appointment.",
    
    // Currency
    currency: "EGP"
  
  }
};

// Form schema for validation
const createBookingFormSchema = (isRTL: boolean) => z.object({
  service: z.string({
    required_error: isRTL ? "يرجى اختيار الخدمة" : "Please select a service",
  }),
  date: z.date({
    required_error: isRTL ? "يرجى اختيار التاريخ" : "Please select a date",
  }),
  time: z.string({
    required_error: isRTL ? "يرجى اختيار الوقت" : "Please select a time",
  }),
  name: z.string().min(2, {
    message: isRTL ? "الاسم يجب أن يكون أكثر من حرفين" : "Name must be more than 2 characters",
  }),
  phone: z.string().min(10, {
    message: isRTL ? "رقم الهاتف غير صالح" : "Invalid phone number",
  }),
  email: z.string().email({
    message: isRTL ? "البريد الإلكتروني غير صالح" : "Invalid email",
  }),
  notes: z.string().optional(),
});

const AdvancedBooking = () => {
  const { isRTL } = useApp();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const t = isRTL ? translations.ar : translations.en;
  const services = isRTL ? servicesData.ar : servicesData.en;
  const locale = isRTL ? ar : enUS;

  type BookingFormValues = z.infer<ReturnType<typeof createBookingFormSchema>>;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(createBookingFormSchema(isRTL)),
    defaultValues: {
      notes: "",
    },
  });

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate, isRTL);
      setAvailableTimeSlots(slots);
      
      // Clear selected time if the previously selected one is not available
      const currentTime = form.getValues("time");
      if (currentTime && !slots.includes(currentTime)) {
        form.setValue("time", "");
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate, form, isRTL]);

  useEffect(() => {
    document.title = isRTL 
      ? "حجز موعد متقدم - عيادة د. محمد خشبة"
      : "Advanced Booking - Dr. Mohamed Khashaba Clinic";
  }, [isRTL]);

  const nextStep = () => {
    let canProceed = false;
    
    if (currentStep === 1) {
      const service = form.getValues("service");
      const date = form.getValues("date");
      const time = form.getValues("time");
      
      canProceed = Boolean(service && date && time);
      
      if (!canProceed) {
        toast.error(t.completeAllFields);
        form.trigger(["service", "date", "time"]);
      }
    }
    
    if (currentStep === 2) {
      const name = form.getValues("name");
      const phone = form.getValues("phone");
      const email = form.getValues("email");
      
      canProceed = Boolean(name && phone && email);
      
      if (!canProceed) {
        toast.error(t.completeAllFields);
        form.trigger(["name", "phone", "email"]);
      }
    }
    
    if (canProceed) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = (data: BookingFormValues) => {
    setIsSubmitting(true);
    setBookingData(data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingComplete(true);
      toast.success(t.bookingSuccessToast);
    }, 1500);
  };

  const handleServiceChange = (value: string) => {
    const serviceId = parseInt(value);
    setSelectedService(serviceId);
    form.setValue("service", value);
  };

  const resetBooking = () => {
    form.reset();
    setSelectedService(null);
    setSelectedDate(undefined);
    setAvailableTimeSlots([]);
    setCurrentStep(1);
    setBookingComplete(false);
    setBookingData(null);
  };

  // Get selected service details
  const selectedServiceDetails = selectedService 
    ? services.find(s => s.id === selectedService)
    : null;

  // WhatsApp integration
  const sendToWhatsApp = () => {
    if (!bookingData || !selectedServiceDetails) return;
    
    const message = isRTL 
      ? `مرحباً، أريد حجز موعد:
الخدمة: ${selectedServiceDetails.name}
التاريخ: ${selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale }) : ""}
الوقت: ${bookingData.time}
الاسم: ${bookingData.name}
رقم الهاتف: ${bookingData.phone}
البريد الإلكتروني: ${bookingData.email}
${bookingData.notes ? `ملاحظات: ${bookingData.notes}` : ""}`
      : `Hello, I want to book an appointment:
Service: ${selectedServiceDetails.name}
Date: ${selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale }) : ""}
Time: ${bookingData.time}
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email}
${bookingData.notes ? `Notes: ${bookingData.notes}` : ""}`;

    const whatsappUrl = `https://wa.me/201040659965?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const callNow = () => {
    window.open('tel:+201040659965', '_self');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 md:pt-30 pb-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-r from-dental-gold to-dental-darkGold text-white py-16 mb-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609840114035-3c981b782fbf?q=80&w=2787&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 "
              variants={itemVariants}
            >
              {t.pageTitle}
            </motion.h1>
            <motion.p 
              className="text-white/90 max-w-2xl mx-auto text-lg"
              variants={itemVariants}
            >
              {t.pageSubtitle}
            </motion.p>
            <motion.div 
              className="flex justify-center mt-6"
              variants={itemVariants}
            >
              <nav className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link 
                  to="/" 
                  className="text-white hover:text-white/70 transition-colors duration-300"
                >
                  {t.home}
                </Link>
                <span className="text-white/50">/</span>
                <span className="text-white/70">{t.pageTitle}</span>
              </nav>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title={t.sectionTitle}
            subtitle={t.sectionSubtitle}
            description={t.sectionDescription}
            center
          />
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!bookingComplete ? (
              <motion.div 
                key="booking-form"
                className="bg-white dark:bg-dental-darkGray rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress Bar */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dental-black dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 relative">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full absolute top-1/2 -translate-y-1/2"></div>
                        <motion.div
                          className="h-2 bg-gradient-to-r from-dental-gold to-dental-darkGold rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-500"
                          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                        />
                        <div className="flex justify-between relative z-10">
                          {[1, 2, 3].map((step) => (
                            <motion.div 
                              key={step}
                              className="flex flex-col items-center"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                currentStep >= step 
                                  ? "bg-gradient-to-r from-dental-gold to-dental-darkGold text-white shadow-lg" 
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                              }`}>
                                {currentStep > step ? <Check className="h-5 w-5" /> : step}
                              </div>
                              <span className={`text-sm mt-2 font-medium transition-colors duration-300 ${
                                currentStep >= step 
                                  ? "text-dental-gold dark:text-dental-gold" 
                                  : "text-gray-500 dark:text-gray-400"
                              }`}>
                                {step === 1 && t.step1}
                                {step === 2 && t.step2}
                                {step === 3 && t.step3}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Service and Date */}
                      {currentStep === 1 && (
                        <motion.div 
                          key="step1"
                          className="space-y-8"
                          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {t.step1Title}
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-dental-gold to-dental-darkGold mx-auto rounded-full"></div>
                          </div>

                          {/* Service Selection */}
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-semibold flex justify-start  items-start gap-2">
                                  <FileText className="h-5 w-5  text-dental-gold" />
                                  {t.selectService}
                                </FormLabel>
                                <Select
                                  onValueChange={(value) => handleServiceChange(value)}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 text-lg flex  justify-end  gap-2  border-2 hover:border-dental-gold transition-colors duration-300">
                                      <SelectValue
                                        className="text-gray-500 flex justify-end items-end dark:text-gray-400"
                                        placeholder={t.selectServicePlaceholder}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {services.map((service) => (
                                      <SelectItem key={service.id} value={service.id.toString()}>
                                        <div className="flex  justify-end items-end gap-3 py-2">
                                          <div>
                                            <div className="font-medium">{service.name}</div>
                                          
                                          </div>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                                
                                {selectedServiceDetails && (
                                  <motion.div 
                                    className="mt-3 p-4 bg-gradient-to-r from-dental-gold/10 to-dental-darkGold/10 rounded-lg border border-dental-gold/20"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-dental-gold" />
                                      <span className="text-sm font-medium">
                                        {t.sessionDuration}: {selectedServiceDetails.duration} {t.minutes}
                                      </span>
                                    </div>
                                  </motion.div>
                                )}
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date Selection */}
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5 text-dental-gold" />
                                    {t.selectDate}
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "h-12 text-lg border-2 hover:border-dental-gold transition-colors duration-300",
                                            isRTL ? "text-right justify-start" : "text-left justify-start",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className={cn("h-4 w-4 opacity-50", isRTL ? "ml-2" : "mr-2")} />
                                          {field.value ? (
                                            format(field.value, "dd MMMM yyyy", { locale })
                                          ) : (
                                            <span>{t.selectDatePlaceholder}</span>
                                          )}
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                          field.onChange(date);
                                          setSelectedDate(date);
                                        }}
                                        initialFocus
                                        disabled={(date) => {
                                          const today = new Date();
                                          today.setHours(0, 0, 0, 0);
                                          return date < today || date.getDay() === 5;
                                        }}
                                        locale={locale}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Time Selection */}
                            <FormField
                              control={form.control}
                              name="time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-dental-gold" />
                                    {t.selectTime}
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!selectedDate}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-12 text-lg border-2 hover:border-dental-gold transition-colors duration-300">
                                        <SelectValue placeholder={t.selectTimePlaceholder} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {availableTimeSlots.length > 0 ? (
                                        availableTimeSlots.map((slot) => (
                                          <SelectItem key={slot} value={slot}>
                                            <div className="flex items-end gap-2">
                                              <Clock className="h-4 w-4 text-dental-gold" />
                                              {slot}
                                            </div>
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <div className="p-4 text-center text-sm text-gray-500">
                                          {selectedDate ? t.noAvailableSlots : t.selectDateFirst}
                                        </div>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Personal Information */}
                      {currentStep === 2 && (
                        <motion.div 
                          key="step2"
                          className="space-y-6"
                          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {t.step2Title}
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-dental-gold to-dental-darkGold mx-auto rounded-full"></div>
                          </div>

                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <User className="h-5 w-5 text-dental-gold" />
                                  {t.fullName}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={t.fullNamePlaceholder} 
                                    className="h-12 text-lg border-2 hover:border-dental-gold focus:border-dental-gold transition-colors duration-300"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-dental-gold" />
                                    {t.phoneNumber}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={t.phoneNumberPlaceholder} 
                                      className="h-12 text-lg border-2 hover:border-dental-gold focus:border-dental-gold transition-colors duration-300"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-dental-gold" />
                                    {t.email}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={t.emailPlaceholder} 
                                      type="email" 
                                      className="h-12 text-lg border-2 hover:border-dental-gold focus:border-dental-gold transition-colors duration-300"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-dental-gold" />
                                  {t.notes}
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder={t.notesPlaceholder}
                                    className="min-h-[120px] text-lg border-2 hover:border-dental-gold focus:border-dental-gold transition-colors duration-300 resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {/* Step 3: Confirmation */}
                      {currentStep === 3 && (
                        <motion.div 
                          key="step3"
                          className="space-y-6"
                          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {t.step3Title}
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-dental-gold to-dental-darkGold mx-auto rounded-full"></div>
                          </div>

                          <div className="bg-gradient-to-br from-dental-gold/5 to-dental-darkGold/5 rounded-xl p-6 border border-dental-gold/20">
                            <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                              <CalendarIcon className="h-6 w-6 text-dental-gold" />
                              {t.appointmentDetails}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                              <div className="space-y-2">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                  {t.service}:
                                </span>
                                <p className="font-semibold text-lg flex items-center gap-2">
                                  <span className="text-xl">{selectedServiceDetails?.icon}</span>
                                  {selectedServiceDetails?.name}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                  {t.date}:
                                </span>
                                <p className="font-semibold text-lg">
                                  {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale }) : ""}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                  {t.time}:
                                </span>
                                <p className="font-semibold text-lg flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-dental-gold" />
                                  {form.getValues("time")}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                  {t.duration}:
                                </span>
                                <p className="font-semibold text-lg">
                                  {selectedServiceDetails?.duration} {t.minutes}
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-dental-gold/20 my-6 pt-6">
                              <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                                <User className="h-6 w-6 text-dental-gold" />
                                {t.personalInfo}
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    {t.name}:
                                  </span>
                                  <p className="font-semibold text-lg">{form.getValues("name")}</p>
                                </div>
                                <div className="space-y-2">
                                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    {t.phone}:
                                  </span>
                                  <p className="font-semibold text-lg flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-dental-gold" />
                                    {form.getValues("phone")}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <span className="text-gray-500 dark:text-gray
                                    -400 text-sm font-medium">
                                    {t.email}:
                                  </span>
                                  <p className="font-semibold text-lg flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-dental-gold" />
                                    {form.getValues("email")}
                                  </p>
                                </div>
                                {form.getValues("notes") && (
                                  <div className="space-y-2 md:col-span-2">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                      {t.notes}:
                                    </span>
                                    <p className="font-semibold text-lg bg-white dark:bg-dental-black p-3 rounded-lg border">
                                      {form.getValues("notes")}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                  <p className="font-medium mb-1">{t.importantNote}</p>
                                  <p>{t.confirmationNote}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="px-6 py-3 text-lg font-medium border-2 hover:border-dental-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className={cn("h-5 w-5", isRTL ? "ml-2 rotate-180" : "mr-2")} />
                        {t.previous}
                      </Button>

                      {currentStep < 3 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-dental-gold to-dental-darkGold hover:from-dental-darkGold hover:to-dental-gold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {t.next}
                          <ChevronRight className={cn("h-5 w-5", isRTL ? "mr-2 rotate-180" : "ml-2")} />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-dental-gold to-dental-darkGold hover:from-dental-darkGold hover:to-dental-gold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className={cn("h-5 w-5 animate-spin", isRTL ? "ml-2" : "mr-2")} />
                              {t.submitting}
                            </>
                          ) : (
                            <>
                              <Send className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                              {t.confirmBooking}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </motion.div>
            ) : (
              /* Success Screen */
              <motion.div 
                key="success"
                className="bg-white dark:bg-dental-darkGray rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="h-20 w-20 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">{t.bookingSuccess}</h2>
                  <p className="text-green-100 text-lg">{t.bookingSuccessMessage}</p>
                </div>

                <div className="p-8">
                  <div className="bg-gradient-to-br from-dental-gold/5 to-dental-darkGold/5 rounded-xl p-6 border border-dental-gold/20 mb-8">
                    <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                      <CalendarIcon className="h-6 w-6 text-dental-gold" />
                      {t.appointmentSummary}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-dental-black rounded-lg border">
                          <span className="text-2xl">{selectedServiceDetails?.icon}</span>
                          <div>
                            <p className="font-semibold">{selectedServiceDetails?.name}</p>
                            <p className="text-sm text-gray-500">{selectedServiceDetails?.duration} {t.minutes}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-dental-black rounded-lg border">
                          <CalendarIcon className="h-5 w-5 text-dental-gold" />
                          <div>
                            <p className="font-semibold">
                              {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale }) : ""}
                            </p>
                            <p className="text-sm text-gray-500">{t.appointmentDate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-dental-black rounded-lg border">
                          <Clock className="h-5 w-5 text-dental-gold" />
                          <div>
                            <p className="font-semibold">{bookingData?.time}</p>
                            <p className="text-sm text-gray-500">{t.appointmentTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-dental-black rounded-lg border">
                          <User className="h-5 w-5 text-dental-gold" />
                          <div>
                            <p className="font-semibold">{bookingData?.name}</p>
                            <p className="text-sm text-gray-500">{t.patientName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700 mb-8">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        <p className="font-medium mb-1">{t.nextSteps}</p>
                        <ul className="list-disc list-inside space-y-1 mt-2">
                          <li>{t.nextStep1}</li>
                          <li>{t.nextStep2}</li>
                          <li>{t.nextStep3}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={sendToWhatsApp}
                      className="px-6 py-3 text-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                      {t.sendToWhatsApp}
                    </Button>
                    
                    <Button
                      onClick={callNow}
                      variant="outline"
                      className="px-6 py-3 text-lg font-medium border-2 border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white transition-all duration-300"
                    >
                      <Phone className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                      {t.callNow}
                    </Button>
                    
                    <Button
                      onClick={resetBooking}
                      variant="outline"
                      className="px-6 py-3 text-lg font-medium border-2 hover:border-dental-gold transition-all duration-300"
                    >
                      <RotateCcw className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                      {t.bookAnother}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-dental-gold/10 to-dental-darkGold/10 rounded-2xl p-8 border border-dental-gold/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t.needHelp}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.contactUs}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center p-6 bg-white dark:bg-dental-black rounded-xl border hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="h-8 w-8 text-dental-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{t.phone}</h4>
                <p className="text-gray-600 dark:text-gray-300" dir="ltr">+20 104 065 9965</p>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-white dark:bg-dental-black rounded-xl border hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{t.whatsapp}</h4>
                <p className="text-gray-600 dark:text-gray-300" dir="ltr">+20 104 065 9965</p>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-white dark:bg-dental-black rounded-xl border hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{t.location}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {isRTL ? "شارع الجمهورية، المنصورة" : "Gomhoria Street, Mansoura"}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedBooking;
