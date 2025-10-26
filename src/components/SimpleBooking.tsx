
import React from "react";
import PageLayout from "@/layouts/PageLayout";
import SimpleBookingForm from "@/components/SimpleBookingForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SimpleBooking() {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  const heroSlides = [
    {
      id: "1",
      title: isRTL ? "احجز موعدك بسهولة" : "Book Your Appointment Easily",
      subtitle: isRTL ? "خطوتان بسيطتان فقط" : "Just Two Simple Steps",
      description: isRTL 
        ? "نظام حجز مبسط وسهل للحصول على أفضل خدمة طبية" 
        : "Simplified and easy booking system for the best medical service",
      image: "/lovable-uploads/847d6d3f-1d18-4a3d-8bb7-f9f09c08a20c.png",
      ctaText: isRTL ? "احجز الآن" : "Book Now",
      ctaLink: "#booking-form"
    }
  ];

  return (
    <PageLayout
      title={isRTL ? "حجز موعد | عيادة د. محمد خشبة" : "Book Appointment | Dr. Khashaba Dental"}
      description={isRTL ? "احجز موعدك بسهولة في خطوتين بسيطتين" : "Book your appointment easily in two simple steps"}
      heroSlides={heroSlides}
      language={language}
    >
      <section id="booking-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-playfair">
              {isRTL ? "احجز موعدك الآن" : "Book Your Appointment Now"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isRTL 
                ? "استخدم النموذج أدناه لحجز موعدك بسهولة وسرعة. سيتم التواصل معك لتأكيد الموعد."
                : "Use the form below to book your appointment easily and quickly. We will contact you to confirm your appointment."}
            </p>
          </div>
          
          <SimpleBookingForm />
        </div>
      </section>

      {/* Integration Guide Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center font-playfair">
              {isRTL ? "دليل الإعداد" : "Setup Guide"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 text-blue-800">
                  {isRTL ? "إعداد Google Sheets" : "Google Sheets Setup"}
                </h4>
                <ol className="space-y-2 text-sm text-blue-700">
                  <li>{isRTL ? "1. أنشئ جدول بيانات جديد في Google Sheets" : "1. Create a new Google Sheets spreadsheet"}</li>
                  <li>{isRTL ? "2. اذهب إلى Tools > Script editor" : "2. Go to Tools > Script editor"}</li>
                  <li>{isRTL ? "3. أنشئ web app بالبيانات المطلوبة" : "3. Create a web app with the required data"}</li>
                  <li>{isRTL ? "4. انسخ الرابط وضعه في النموذج أعلاه" : "4. Copy the URL and paste it in the form above"}</li>
                </ol>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 text-green-800">
                  {isRTL ? "إعداد الواتساب" : "WhatsApp Setup"}
                </h4>
                <ol className="space-y-2 text-sm text-green-700">
                  <li>{isRTL ? "1. احصل على رقم الواتساب التجاري" : "1. Get your business WhatsApp number"}</li>
                  <li>{isRTL ? "2. أضف كود الدولة (مثل: 201234567890)" : "2. Add country code (e.g., 201234567890)"}</li>
                  <li>{isRTL ? "3. ضع الرقم في النموذج أعلاه" : "3. Enter the number in the form above"}</li>
                  <li>{isRTL ? "4. ستصلك الحجوزات تلقائياً" : "4. You'll receive bookings automatically"}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
