import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "../ui/TestimonialCard";

// Testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "John Smith",
    role: "Rice Farmer",
    content:
      "This app helped me increase my crop yield by 30%. The recommendations are spot-on!",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Organic Farmer",
    content:
      "The fertilizer guidance saved me money and improved my soil health significantly.",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "David Johnson",
    role: "Wheat Farmer",
    content:
      "Excellent crop recommendations based on my soil and weather conditions.",
    avatar: "/placeholder.svg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <ChevronLeft className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
          <h2 className="text-3xl font-bold text-black">
            What Our Clients Say About Us
          </h2>
          <ChevronRight className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 mb-12">
          <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-gray-300" />
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
