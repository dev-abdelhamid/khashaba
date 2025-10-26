
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import LazyImage from "@/components/LazyImage";
import { useApp } from "@/contexts/AppContext";


export default function CtaSection() {
    const { isRTL } = useApp();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0  z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-dental-darkGold/70 to-transparent z-10" />
        <LazyImage
          src=
          "/beauty.webp"
          alt="صورة قسم الدعوة للعمل"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="container-custom leading-relaxed text-center relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle
            subtitle= {isRTL ? "احجز موعدك" : "Book Your Appointment"}
          
            title={
              isRTL
                ? "ابتسامة جميلة و أكثر اشراقاً في انتظارك"
                : "A Healthy and Beautiful Smile Awaits You"
            }
            
            
            description={
              isRTL
                ? "لا تفوتك فرصة الحصول على ابتسامة صحية وجميلة. اتصل بنا الآن لحجز موعدك."
                : "Don't miss the chance to get a healthy and beautiful smile. Call us now to book your appointment."
            }

center
            className="text-white"
          />
          <div className="mt-8">
            <Button
              asChild
              className=" gold-gradient hover:bg-dental-gold/90 py-3 px-10 text-md"
            >
              <Link to="/appointment">
                {isRTL ? "حجز  الان" : "Book  Now"}              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
