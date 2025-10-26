
import SectionTitle from "@/components/SectionTitle";
import TestimonialCard from "@/components/TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "مهندس",
    content: "تجربة ممتازة في عيادة د. باسم خشبة. تلقيت علاج تقويم الأسنان بأحدث التقنيات والنتائج مذهلة. أنصح بشدة!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "سارة علي",
    role: "معلمة",
    content: "خضعت لعملية زراعة أسنان في هذه العيادة. كان الطاقم الطبي محترفًا والدكتور باسم شرح كل خطوة بوضوح. النتائج أكثر من رائعة!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "محمود عبدالله",
    role: "محاسب",
    content: "أجريت عملية تبييض أسنان، والنتائج كانت مبهرة. أشكر د. باسم والفريق الطبي على الاهتمام والرعاية الممتازة.",
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2676&auto=format&fit=crop",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionTitle
          subtitle="آراء العملاء"
          title="ماذا يقول مرضانا عنا"
          description="نفخر بآراء مرضانا ونسعى دائمًا لتقديم أفضل تجربة ممكنة."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${testimonial.id * 0.2}s`, animationFillMode: "forwards" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
