
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import DoctorCard from "@/components/DoctorCard";

const doctors = [
  {
    id: 1,
    name: "د. باسم خشبة",
    title: "استشاري طب وجراحة الأسنان",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2664&auto=format&fit=crop",
    specialty: "زراعة وتجميل الأسنان",
    description: "خبرة أكثر من 15 عامًا في مجال طب الأسنان مع تخصص في زراعة وتجميل الأسنان بأحدث التقنيات العالمية.",
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "د. سمر أحمد",
    title: "أخصائية تقويم الأسنان",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2574&auto=format&fit=crop",
    specialty: "تقويم الأسنان",
    description: "متخصصة في علاج مشاكل تقويم الأسنان للأطفال والبالغين باستخدام أحدث التقنيات والأساليب العلاجية.",
    social: {
      facebook: "#",
      instagram: "#",
    },
  },
];

export default function DoctorsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dental-black/20">
      <div className="container-custom">
        <SectionTitle
          subtitle="فريقنا الطبي"
          title="خبراء في رعاية صحة أسنانك"
          description="فريق طبي متخصص ومؤهل لتقديم أفضل رعاية لصحة الفم والأسنان."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              title={doctor.title}
              image={doctor.image}
              specialty={doctor.specialty}
              description={doctor.description}
              social={doctor.social}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${doctor.id * 0.2}s`, animationFillMode: "forwards" }}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            asChild
            className="btn-primary"
          >
            <Link to="/doctors" className="flex items-center">
              <span>تعرف على فريقنا الطبي</span>
              <ArrowRight className="mr-2 rtl:ml-2 rtl:rotate-180 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
