
import React, { useState } from "react";
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
import { CalendarIcon, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Loader } from "@/components/ui/loader";

interface BookingData {
  name: string;
  phone: string;
  email: string;
  date: Date | undefined;
  time: string;
  notes: string;
}

const timeSlots = [
  "09:00",
  "09:30", 
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00"
];

export default function AppointmentForm() {
  const { language } = useApp();
  const { toast } = useToast();
  const isRTL = language === "ar";
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    date: undefined,
    time: "",
    notes: ""
  });

  const texts = {
    title: isRTL ? "احجز موعدك الآن" : "Book Your Appointment",
    subtitle: isRTL ? "خطوتان بسيطتان للحصول على أفضل خدمة" : "Two simple steps to get the best service",
    step1Title: isRTL ? "معلوماتك الشخصية" : "Your Personal Information",
    step2Title: isRTL ? "اختر الموعد المناسب" : "Choose Your Preferred Time",
    name: isRTL ? "الاسم الكامل" : "Full Name",
    phone: isRTL ? "رقم الهاتف" : "Phone Number",
    email: isRTL ? "البريد الإلكتروني" : "Email Address",
    date: isRTL ? "التاريخ" : "Date",
    time: isRTL ? "الوقت" : "Time",
    notes: isRTL ? "ملاحظات إضافية" : "Additional Notes",
    next: isRTL ? "التالي" : "Next",
    back: isRTL ? "السابق" : "Back",
    submit: isRTL ? "احجز الموعد" : "Book Appointment",
    success: isRTL ? "تم حجز موعدك بنجاح!" : "Your appointment has been booked successfully!",
    googleSheets: isRTL ? "رابط Google Sheets" : "Google Sheets URL",
    whatsapp: isRTL ? "رقم الواتساب" : "WhatsApp Number",
    configure: isRTL ? "إعداد الربط" : "Configure Integration"
  };

  const updateFormData = (field: keyof BookingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى إدخال الاسم" : "Please enter your name",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: isRTL ? "خطأ" : "Error", 
        description: isRTL ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.date) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى اختيار التاريخ" : "Please select a date",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.time) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى اختيار الوقت" : "Please select a time",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const submitToGoogleSheets = async (data: BookingData) => {
    if (!googleSheetsUrl) return;
    
    try {
      const response = await fetch(googleSheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date ? format(data.date, "yyyy-MM-dd") : "",
          time: data.time,
          notes: data.notes,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
    }
  };

  const sendToWhatsApp = (data: BookingData) => {
    if (!whatsappNumber) return;
    
    const message = `
🦷 *حجز موعد جديد*

👤 *الاسم:* ${data.name}
📞 *الهاتف:* ${data.phone}
📧 *الإيميل:* ${data.email}
📅 *التاريخ:* ${data.date ? format(data.date, "dd/MM/yyyy") : ""}
⏰ *الوقت:* ${data.time}
📝 *ملاحظات:* ${data.notes || "لا توجد"}

_تم الإرسال من موقع العيادة_
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit to Google Sheets
      await submitToGoogleSheets(formData);
      
      // Send to WhatsApp
      sendToWhatsApp(formData);
      
      toast({
        title: texts.success,
        description: isRTL ? "سيتم التواصل معك قريباً لتأكيد الموعد" : "We will contact you soon to confirm your appointment"
      });
      
      setBookingComplete(true);
    } catch (error) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: undefined,
      time: "",
      notes: ""
    });
    setStep(1);
    setBookingComplete(false);
  };

  if (bookingComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="text-center p-8">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-dental-black">{texts.success}</h3>
            <p className="text-gray-600">
              {isRTL ? "سيتم التواصل معك قريباً لتأكيد الموعد" : "We will contact you soon to confirm your appointment"}
            </p>
            <Button onClick={resetForm} className="bg-dental-gold hover:bg-dental-darkGold">
              {isRTL ? "حجز موعد آخر" : "Book Another Appointment"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Configuration Section */}
      <Card className="mb-6 border-dental-gold/20">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 text-dental-gold">{texts.configure}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{texts.googleSheets}</Label>
              <Input
                placeholder="https://script.google.com/..."
                value={googleSheetsUrl}
                onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                className="text-xs"
              />
            </div>
            <div>
              <Label>{texts.whatsapp}</Label>
              <Input
                placeholder="201234567890"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Booking Form */}
      <Card className="overflow-hidden shadow-lg border-0">
        <div className="bg-gradient-to-r from-dental-gold to-dental-darkGold p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">{texts.title}</h2>
          <p className="opacity-90">{texts.subtitle}</p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className={`w-8 h-2 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-8 h-2 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-dental-gold" />
                  <h3 className="text-lg font-semibold">{texts.step1Title}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">{texts.name}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="border-gray-300 focus:border-dental-gold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{texts.phone}</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder={isRTL ? "رقم الهاتف" : "Phone number"}
                        className="border-gray-300 focus:border-dental-gold pr-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">{texts.email}</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder={isRTL ? "البريد الإلكتروني" : "Email address"}
                        className="border-gray-300 focus:border-dental-gold pr-10"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full bg-dental-gold hover:bg-dental-darkGold mx-auto  px-4mt-6"
                >
                  {texts.next}
                  <ArrowRight className={`h-4 w-4 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-dental-gold" />
                  <h3 className="text-lg font-semibold">{texts.step2Title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{texts.date}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-right",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="ml-2 h-4 w-4" />
                          {formData.date ? (
                            format(formData.date, "dd MMMM yyyy", { 
                              locale: isRTL ? ar : undefined 
                            })
                          ) : (
                            <span>{isRTL ? "اختر التاريخ" : "Select date"}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => updateFormData('date', date)}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today || date.getDay() === 5; // Disable past dates and Fridays
                          }}
                          initialFocus
                          locale={isRTL ? ar : undefined}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>{texts.time}</Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => updateFormData('time', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? "اختر الوقت" : "Select time"} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">{texts.notes}</Label>
                  <div className="relative">
                    <MessageSquare className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      placeholder={isRTL ? "أي ملاحظات إضافية..." : "Any additional notes..."}
                      className="border-gray-300 focus:border-dental-gold pr-10"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className={`h-4 w-4 mr-2 ${isRTL ? 'rotate-180' : ''}`} />
                    {texts.back}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-dental-gold hover:bg-dental-darkGold"
                  >
                    {isSubmitting ? (
                      <Loader size="sm" className="mr-2" />
                    ) : null}
                    {texts.submit}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
