import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
  CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parse, addDays, addHours, startOfDay, isBefore, isAfter, isEqual, isFriday, isSaturday } from "date-fns";
import { ar } from "date-fns/locale";

const WHATSAPP_NUMBER = "+201040659965";

// ErrorBoundary Component للتعامل مع الأخطاء في النموذج
const ErrorBoundary = ({ children, context }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const handleError = (err) => {
      setHasError(true);
      setError(err.message);
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    const { isRTL } = context;
    return (
      <div className="w-full p-6" dir={isRTL ? "rtl" : "ltr"} role="alert">
        <div className="p-4 bg-red-50 text-red-800 rounded-xl shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-red-600" aria-hidden="true" />
            <span>{isRTL ? `خطأ: ${error || 'حدث خطأ غير متوقع'}` : `Error: ${error || 'An unexpected error occurred'}`}</span>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-dental-gold to-dental-darkGold text-white rounded-full hover:scale-105 transition-transform"
            aria-label={isRTL ? "إعادة تحميل" : "Reload"}
          >
            {isRTL ? "إعادة تحميل" : "Reload"}
          </Button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

// دالة لتنسيق الوقت إلى صيغة 12 ساعة
const formatTimeTo12Hour = (time, isRTL) => {
  const [hour, minute] = time.split(":");
  const hourNum = parseInt(hour, 10);
  const period = hourNum >= 12 ? (isRTL ? "م" : "PM") : (isRTL ? "ص" : "AM");
  const adjustedHour = hourNum % 12 || 12;
  return `${adjustedHour}:${minute} ${period}`;
};

const SimpleBookingForm = () => {
  const { language, isRTL, isDarkMode } = useApp();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: undefined,
    time: "",
    notes: "",
    language: isRTL ? "ar" : "en",
    isNewPatient: true,
  });

  // دالة لتوليد الأيام والمواعيد المتاحة في الواجهة الأمامية (بدون API)
  const generateAvailableDatesAndSlots = useCallback(() => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 14); // نطاق أسبوعين
    const availableDates = [];
    const availableSlots = {};

    let current = today;
    while (isBefore(current, maxDate) || isEqual(current, maxDate)) {
      if (!isFriday(current) && !isSaturday(current)) {
        const dateStr = format(current, "yyyy-MM-dd");
        availableDates.push(current);
        // توليد مواعيد من 9 صباحًا إلى 9 مساءً بزيادة ساعة
        const slots = [];
        for (let hour = 9; hour <= 21; hour++) {
          slots.push({ time: `${hour.toString().padStart(2, "0")}:00`, available: true });
        }
        availableSlots[dateStr] = slots;
      }
      current = addDays(current, 1);
    }
    return { availableDates, availableSlots };
  }, []);

  // التحقق من صلاحية الوقت (على الأقل 4 ساعات من الآن)
  const validateTimeSlot = useCallback((date, time) => {
    if (!date) return false;
    const dateStr = format(date, "yyyy-MM-dd");
    const selectedDateTime = parse(`${dateStr} ${time}`, "yyyy-MM-dd HH:mm", new Date());
    const minAllowedTime = addHours(new Date(), 4);
    return !isBefore(selectedDateTime, minAllowedTime);
  }, []);

  // دالة التحقق من صحة الحقول
  const validateField = useCallback(
    (field, value) => {
      const newErrors = { ...errors };
      if (field === "name") {
        if (!value.trim()) newErrors.name = isRTL ? "الاسم مطلوب" : "Name is required";
        else if (value.length < 3) newErrors.name = isRTL ? "الاسم قصير جدًا" : "Name too short";
        else delete newErrors.name;
      }
      if (field === "phone") {
        if (!value.trim()) newErrors.phone = isRTL ? "رقم الهاتف مطلوب" : "Phone is required";
        else if (!/^\+?\d{10,15}$/.test(value)) newErrors.phone = isRTL ? "رقم غير صالح" : "Invalid phone";
        else delete newErrors.phone;
      }
      if (field === "email") {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = isRTL ? "بريد غير صالح" : "Invalid email";
        else delete newErrors.email;
      }
      if (field === "date") {
        if (!value) newErrors.date = isRTL ? "التاريخ مطلوب" : "Date is required";
        else {
          const minDate = new Date();
          const maxDate = addDays(new Date(), 14);
          if (isBefore(value, startOfDay(minDate))) newErrors.date = isRTL ? "تاريخ غير صالح" : "Past date";
          else if (isAfter(value, maxDate)) newErrors.date = isRTL ? "خارج النطاق" : "Beyond range";
          else delete newErrors.date;
        }
      }
      if (field === "time") {
        if (!value) newErrors.time = isRTL ? "الوقت مطلوب" : "Time is required";
        else if (!validateTimeSlot(formData.date, value)) newErrors.time = isRTL ? "وقت غير صالح" : "Invalid time";
        else delete newErrors.time;
      }
      setErrors(newErrors);
    },
    [isRTL, formData.date, validateTimeSlot, errors]
  );

  // تحديث بيانات النموذج
  const updateFormData = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    },
    [validateField]
  );

  // التحقق من الخطوة الأولى
  const validateStep1 = useCallback(() => {
    validateField("name", formData.name);
    validateField("phone", formData.phone);
    validateField("email", formData.email);
    return Object.keys(errors).length === 0;
  }, [formData, validateField, errors]);

  // التحقق من الخطوة الثانية
  const validateStep2 = useCallback(() => {
    validateField("date", formData.date);
    validateField("time", formData.time);
    return Object.keys(errors).length === 0;
  }, [formData, validateField, errors]);

  // دالة إرسال البيانات إلى WhatsApp
  const sendToWhatsApp = useCallback(
    (data) => {
      const message = isRTL
        ? `🦷 *حجز موعد جديد*\n\n👤 *الاسم:* ${data.name}\n📞 *الهاتف:* ${data.phone}\n📧 *الإيميل:* ${data.email || 'غير متوفر'}\n📅 *التاريخ:* ${data.date ? format(data.date, "dd/MM/yyyy", { locale: ar }) : "غير محدد"}\n⏰ *الوقت:* ${formatTimeTo12Hour(data.time, isRTL)}\n📝 *ملاحظات:* ${data.notes || "لا توجد"}`
        : `🦷 *New Appointment*\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${data.phone}\n📧 *Email:* ${data.email || 'Not provided'}\n📅 *Date:* ${data.date ? format(data.date, "dd/MM/yyyy") : "Not specified"}\n⏰ *Time:* ${formatTimeTo12Hour(data.time, isRTL)}\n📝 *Notes:* ${data.notes || "None"}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    },
    [isRTL]
  );

  // دالة إعادة تعيين النموذج
  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: undefined,
      time: "",
      notes: "",
      language: isRTL ? "ar" : "en",
      isNewPatient: true,
    });
    setErrors({});
    setError(null);
    setStep(1);
    setBookingComplete(false);
  }, [isRTL]);

  // توليد المواعيد المتاحة عند تحميل الخطوة الثانية
  const { availableDates, availableSlots } = generateAvailableDatesAndSlots();

  // الحصول على المواعيد المتاحة للتاريخ المحدد
  const getTimeSlotsForSelectedDate = useCallback(() => {
    if (!formData.date) return [];
    const dateStr = format(formData.date, "yyyy-MM-dd");
    return availableSlots[dateStr] || [];
  }, [formData.date, availableSlots]);

  // متغيرات الرسوم المتحركة للحقول
  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#D4AF37", transition: { duration: 0.3, ease: "easeOut" } },
    blur: { scale: 1, borderColor: "#D1D5DB", transition: { duration: 0.3, ease: "easeOut" } },
  };

  // كود API الأصلي (محفوظ في تعليقات)
  /*
  const API_URL = import.meta.env.VITE_API_URL || "https://khashaba-backend-production.up.railway.app/api";
  const fetchAvailableSlotsForDate = useCallback(
    async (date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      try {
        const response = await fetch(`${API_URL}/appointments/available/${dateStr}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) throw new Error(isRTL ? "فشل جلب المواعيد" : "Failed to fetch slots");
        const slots = await response.json();
        return slots.filter(
          (slot) => (slot.available || slot.status === "pending") && validateTimeSlot(date, slot.time)
        );
      } catch (err) {
        setError(err.message);
        toast({ title: isRTL ? "خطأ" : "Error", description: err.message, variant: "destructive" });
        return [];
      }
    },
    [isRTL, validateTimeSlot, toast]
  );

  const fetchAvailableDates = useCallback(async () => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 14);
    const potentialDates = [];
    let current = today;
    while (isBefore(current, maxDate) || isEqual(current, maxDate)) {
      if (!isFriday(current) && !isSaturday(current)) {
        potentialDates.push(current);
      }
      current = addDays(current, 1);
    }
    const slotsPromises = potentialDates.map((date) => fetchAvailableSlotsForDate(date));
    const slotsResults = await Promise.all(slotsPromises);
    const slotsByDate = {};
    const availDates = [];
    potentialDates.forEach((date, index) => {
      const dateStr = format(date, "yyyy-MM-dd");
      const slots = slotsResults[index];
      slotsByDate[dateStr] = slots;
      if (slots.length > 0) availDates.push(date);
    });
    setAvailableDates(availDates);
    setAvailableSlots(slotsByDate);
  }, [fetchAvailableSlotsForDate]);

  const handleSubmitStep1 = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/patients/initial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          isNewPatient: formData.isNewPatient,
        }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(isRTL ? "فشل حفظ البيانات" : "Failed to save data");
      await fetchAvailableDates();
      setStep(2);
    } catch (err) {
      setError(err.message);
      toast({ title: isRTL ? "خطأ" : "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
          time: formData.time,
          notes: formData.notes.trim() || undefined,
          language: formData.language,
        }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(isRTL ? "فشل الحجز" : "Failed to book");
      const { appointment } = await response.json();
      sendToWhatsApp({ ...formData, time: appointment.time });
      toast({
        title: isRTL ? "تم الحجز" : "Success",
        description: isRTL ? "تم حجز الموعد بنجاح! في انتظار التأكيد" : "Appointment booked successfully! Awaiting confirmation",
      });
      setBookingComplete(true);
    } catch (err) {
      setError(err.message);
      toast({ title: isRTL ? "خطأ" : "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  */

  // معالجة الخطوة الأولى (معلومات المستخدم)
  const handleSubmitStep1 = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  // معالجة الخطوة الثانية (إرسال إلى WhatsApp)
  const handleSubmit = () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    try {
      sendToWhatsApp(formData);
      toast({
        title: isRTL ? "تم الحجز" : "Success",
        description: isRTL ? "تم إرسال طلب الحجز عبر واتساب! في انتظار التأكيد" : "Appointment request sent via WhatsApp! Awaiting confirmation",
      });
      setBookingComplete(true);
    } catch (err) {
      setError(err.message);
      toast({ title: isRTL ? "خطأ" : "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // واجهة النموذج
  if (bookingComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full p-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <Card className="bg-white dark:bg-dental-darkGray rounded-2xl shadow-xl border border-dental-gold/20">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="w-16 h-16 bg-dental-gold/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle size={32} className="text-dental-gold" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-siwa">
              {isRTL ? "تم إرسال طلب الحجز بنجاح!" : "Appointment Request Sent Successfully!"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              {isRTL ? "سنتواصل معك قريبًا عبر واتساب لتأكيد الموعد" : "We’ll contact you soon via WhatsApp to confirm"}
            </p>
            <Button
              onClick={resetForm}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-dental-gold to-dental-darkGold text-white rounded-full hover:scale-105 transition-transform duration-300 text-sm font-medium font-siwa"
              aria-label={isRTL ? "حجز موعد آخر" : "Book Another Appointment"}
            >
              {isRTL ? "حجز موعد آخر" : "Book Another"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <ErrorBoundary context={{ isRTL, isDarkMode }}>
      <section className="w-full "  role="form" id="booking-form" aria-labelledby="booking-form-title">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl shadow-md flex justify-between items-center"
            role="alert"
          >
            <span className="text-sm font-medium">{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
              aria-label={isRTL ? "إغلاق التنبيه" : "Close alert"}
            >
              <X size={16} />
            </Button>
          </motion.div>
        )}
        <Card className="rounded-2xl shadow-xl border border-dental-gold/20 overflow-hidden">
          <div className="bg-gradient-to-b from-dental-gold to-dental-darkGold p-6 text-white text-center">
            <h2 id="booking-form-title" className="text-2xl font-bold mb-2 font-siwa">
              {isRTL ? "احجز موعدك الآن" : "Book Your Appointment"}
            </h2>
            <p className="text-sm opacity-90">
              {isRTL ? "خطوات بسيطة لأفضل تجربة أسنان" : "Simple steps for the best dental care"}
            </p>
            <div className="flex justify-center mt-4 gap-6" role="tablist" aria-label={isRTL ? "خطوات الحجز" : "Booking Steps"}>
              {["معلوماتك", "الموعد"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      step > idx ? "bg-white text-dental-gold" : "bg-white/30 text-white"
                    }`}
                    role="tab"
                    aria-selected={step === idx + 1}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {idx + 1}
                  </motion.div>
                  <span className="text-xs mt-1">{isRTL ? label : idx === 0 ? "Your Info" : "Appointment"}</span>
                </div>
              ))}
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: isRTL ? -30 : 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isRTL ? 30 : -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-dental-gold" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-siwa">
                      {isRTL ? "معلوماتك الشخصية" : "Your Personal Information"}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { id: "name", label: isRTL ? "الاسم الكامل" : "Full Name", icon: User, placeholder: isRTL ? "أدخل اسمك" : "Enter your name", error: errors.name },
                      { id: "phone", label: isRTL ? "رقم الهاتف" : "Phone Number", icon: Phone, placeholder: isRTL ? "رقم الهاتف" : "Phone number", error: errors.phone },
                      { id: "email", label: isRTL ? "البريد الإلكتروني (اختياري)" : "Email (Optional)", icon: Mail, placeholder: isRTL ? "البريد الإلكتروني" : "Email address", error: errors.email },
                    ].map(({ id, label, icon: Icon, placeholder, error }) => (
                      <div key={id}>
                        <Label htmlFor={id} className={`block mb-2 text-sm font-medium ${isRTL ? "text-right" : "text-left"} text-gray-900 dark:text-gray-200`}>
                          {label}
                        </Label>
                        <motion.div variants={inputVariants} animate={error ? "blur" : "focus"} className="relative">
                          <Icon size={16} className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? "right-3" : "left-3"} text-gray-400`} aria-hidden="true" />
                          <Input
                            id={id}
                            value={formData[id]}
                            onChange={(e) => updateFormData(id, e.target.value)}
                            placeholder={placeholder}
                            className={`w-full p-3 ${isRTL ? "pr-10" : "pl-10"} rounded-lg border focus:ring-2 focus:ring-dental-gold bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm hover:border-dental-gold/50 transition-colors duration-300 ${
                              error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                            aria-invalid={error ? "true" : "false"}
                            aria-describedby={error ? `${id}-error` : undefined}
                          />
                        </motion.div>
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                      </div>
                    ))}
                    <div className="flex flex-row items-center align-center align-items-center gap-3">

                      
                    </div>
                    <div className="flex flex-row items-center align-center align-items-center gap-3">
                      <input
                        type="checkbox"
                        id="newPatient"
                        checked={formData.isNewPatient}
                        onChange={(e) => updateFormData("isNewPatient", e.target.checked)}
                        className="accent-dental-gold w-5 h-5 rounded"
                        aria-label={isRTL ? "مريض جديد؟" : "New patient?"}
                      />
                      <Label htmlFor="newPatient" className="font-medium flex-row items-center align-center align-items-center text-gray-900 dark:text-gray-200">
                        {isRTL ? "هل أنت مريض جديد؟" : "Are you a new patient?"}
                      </Label>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Button
                    
                      onClick={handleSubmitStep1}
                      disabled={isSubmitting || Object.values(errors).some((e) => e)}
                      className={`px-6 py-2 bg-gradient-to-r from-dental-gold to-dental-darkGold text-white rounded-full flex items-center justify-center gap-2  text-sm font-medium ${isRTL ? "mr-auto justify-end" : "ml-auto justify-start"} hover:scale-105 transition-transform duration-300 ${
                        isSubmitting || Object.values(errors).some((e) => e) ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      aria-disabled={isSubmitting || Object.values(errors).some((e) => e)}
                    >
                      {isRTL ? "التالي" : "Next"}
                      <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} aria-hidden="true" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: isRTL ? -30 : 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isRTL ? 30 : -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-dental-gold" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-siwa">
                      {isRTL ? "اختر موعدك" : "Choose Your Appointment"}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label className={`block mb-2 text-sm font-medium ${isRTL ? "text-right " : "text-left"} text-gray-900 dark:text-gray-200`}>
                        {isRTL ? "التاريخ" : "Date"}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.div variants={inputVariants} animate={errors.date ? "blur" : "focus"}>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full p-3 text-sm rounded-lg border focus:ring-2 focus:ring-dental-gold flex flex-row items-center align-center items-strat justify-start  bg-white dark:bg-gray-800 hover:border-dental-gold/50 transition-colors duration-300",
                                !formData.date && "text-gray-500",
                                errors.date ? "border-red-500" : `border-gray-300 ${isRTL ? "text-left" : "text-right"} dark:border-gray-600`
                              )}
                              aria-invalid={errors.date ? "true" : "false"}
                            >
                              <CalendarIcon size={16} className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-gray-400`} aria-hidden="true" />
                              {formData.date ? format(formData.date, "dd MMMM yyyy", { locale: isRTL ? ar : undefined }) : (isRTL ? "اختر التاريخ" : "Select date")}
                            </Button>
                          </motion.div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl" align={isRTL ? "end" : "start"}>
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => updateFormData("date", date)}
                            disabled={(date) =>
                              date < startOfDay(new Date()) ||
                              date > addDays(new Date(), 14) ||
                              isFriday(date) ||
                              isSaturday(date)
                            }
                            initialFocus
                            locale={isRTL ? ar : undefined}
                            dir={isRTL ? "rtl" : "ltr"}
                            className="rounded-lg bg-white dark:bg-gray-800"
                            classNames={{
                              months: "space-y-4",
                              month: "space-y-4",
                              caption: "flex justify-center pt-1 relative items-center",
                              caption_label: "text-sm font-medium text-gray-900 dark:text-gray-200",
                              nav: "flex items-center gap-2",
                              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-full flex items-center justify-center",
                              nav_button_previous: cn("absolute", isRTL ? "right-1" : "left-1"),
                              nav_button_next: cn("absolute", isRTL ? "left-1" : "right-1"),
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex items-center justify-center",
                              head_cell: "text-gray-600  dark:text-gray-300 rounded-md w-10 font-normal text-[0.7rem] text-center ",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative w-11 h-10 flex items-center justify-center rounded-md",
                              day: cn(
                                "h-9 w-10 p-0 font-normal text-gray-900 dark:text-gray-200 hover:bg-dental-gold/10 rounded-md transition-colors duration-200",
                                "focus:outline-none focus:ring-2 focus:ring-dental-gold"
                              ),
                              day_selected: "bg-dental-gold text-white hover:bg-dental-gold/90",
                              day_today: "border border-dental-gold/50",
                              day_disabled: "text-gray-400 opacity-50",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <Label className={`block mb-2 text-sm font-medium ${isRTL ? "text-right" : "text-left"} text-gray-900 dark:text-gray-200`}>
                        {isRTL ? "الوقت" : "Time"}
                      </Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => updateFormData("time", value)}
                        disabled={!formData.date || getTimeSlotsForSelectedDate().length === 0}
                      >
                        <motion.div variants={inputVariants} animate={errors.time ? "blur" : "focus"}>
                          <SelectTrigger
                            className={`w-full flex flex-row items-center justify-between ${isRTL ? " flex-row-reverse" : ""}  p-3 rounded-lg border focus:ring-2 focus:ring-dental-gold bg-white dark:bg-gray-800 text-sm hover:border-dental-gold/50 transition-colors duration-300 ${
                              errors.time ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                            aria-invalid={errors.time ? "true" : "false"}
                          >
                            <SelectValue
                              placeholder={
                                getTimeSlotsForSelectedDate().length === 0
                                  ? isRTL
                                    ? "لا توجد مواعيد متاحة"
                                    : "No available slots"
                                  : isRTL
                                  ? "اختر الوقت"
                                  : "Select time"
                              }
                            />
                          </SelectTrigger>
                        </motion.div>
                        <SelectContent className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                          {getTimeSlotsForSelectedDate().map((slot) => (
                            <SelectItem
                              key={slot.time}
                              value={slot.time}
                              disabled={!slot.available}
                              className={cn(
                                !slot.available ? "text-red-500" : "text-gray-900 dark:text-gray-200",
                                "hover:bg-dental-gold/10 rounded-md p-1 px-3 transition-colors duration-200",
                                isRTL ? "flex-row-reverse" : ""
                              )}
                            >
                              {formatTimeTo12Hour(slot.time, isRTL)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className={`block mb-2  flextext-sm font-medium ${isRTL ? "text-right" : "text-left"} text-gray-900 dark:text-gray-200`}>
                      {isRTL ? "ملاحظات إضافية (اختياري)" : "Additional Notes (Optional)"}
                    </Label>
                    <motion.div variants={inputVariants} animate="focus" className="relative flex flex-row items-center align-center align-items-center ">
                      <MessageSquare size={16} className={`absolute top-4 ${isRTL ? "right-3" : "left-3"} text-gray-400`} aria-hidden="true" />
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => updateFormData("notes", e.target.value)}
                        placeholder={isRTL ? "أي ملاحظات إضافية..." : "Any additional notes..."}
                        className={`w-full p-3 flex flex-row items-center align-center align-items-center ${isRTL ? "pr-10" : "pl-10"} rounded-lg border focus:ring-2 focus:ring-dental-gold bg-white dark:bg-gray-800 text-sm min-h-[100px] hover:border-dental-gold/50 transition-colors duration-300 border-gray-300 dark:border-gray-600`}
                        aria-label={isRTL ? "ملاحظات إضافية" : "Additional notes"}
                      />
                    </motion.div>
                  </div>
                  <div className="flex gap-4 mt-6 justify-center sm:justify-start">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="px-6 py-2 border border-dental-gold/50 rounded-full text-dental-gold hover:bg-dental-gold/10 transition-colors duration-300 text-sm font-medium font-siwa"
                        aria-label={isRTL ? "الرجوع" : "Go Back"}
                      >
                        <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} aria-hidden="true" />
                        {isRTL ? "رجوع" : "Back"}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || Object.values(errors).some((e) => e)}
                        className={`px-6 py-2 bg-gradient-to-r from-dental-gold to-dental-darkGold text-white rounded-full text-sm font-medium font-siwa hover:scale-105 transition-transform duration-300 ${
                          isSubmitting || Object.values(errors).some((e) => e) ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        aria-disabled={isSubmitting || Object.values(errors).some((e) => e)}
                      >
                        {isRTL ? "إرسال" : "Submit"}
                        <CheckCircle size={18} aria-hidden="true" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </section>
    </ErrorBoundary>
  );
};

export default SimpleBookingForm;
