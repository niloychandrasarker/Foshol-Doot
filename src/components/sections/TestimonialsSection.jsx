import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "../ui/TestimonialCard";

export function TestimonialsSection() {
  // Extended testimonials data with more cards
  const testimonials = [
    {
      id: 1,
      name: "Hannah Schmitt",
      role: "Organic Farmer",
      content:
        "This AI-powered platform transformed my farming practices completely. The precision recommendations helped me increase my organic crop yield by 45% while reducing costs significantly.",
      image: "/api/placeholder/120/120",
      rating: 5,
    },
    {
      id: 2,
      name: "John Anderson",
      role: "Agricultural Engineer",
      content:
        "As an agricultural consultant, I recommend this tool to all my clients. The disease detection accuracy is remarkable - it's prevented thousands in crop losses for my farmers.",
      image: "/api/placeholder/120/120",
      rating: 5,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Vegetable Grower",
      content:
        "The fertilizer guidance system is incredible! My soil health improved dramatically, and I achieved the best harvest quality I've seen in 15 years of farming.",
      image: "/api/placeholder/120/120",
      rating: 5,
    },
    {
      id: 4,
      name: "David Chen",
      role: "Rice Farmer",
      content:
        "AgriGPT is like having an agricultural expert available 24/7. The instant answers to my farming questions have saved me countless hours and improved my decision-making.",
      image: "/api/placeholder/120/120",
      rating: 5,
    },
    {
      id: 5,
      name: "Sarah Johnson",
      role: "Crop Specialist",
      content:
        "The crop recommendation feature guided me to perfect crop selection for my soil and climate. My farm productivity and profitability have reached new heights!",
      image: "/api/placeholder/120/120",
      rating: 5,
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      role: "Wheat Farmer",
      content:
        "This platform revolutionized my approach to sustainable farming. The AI insights help me make data-driven decisions that benefit both my crops and the environment.",
      image: "/api/placeholder/120/120",
      rating: 5,
    },
  ];

  // State management
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      handleNavigation((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, totalPages]);

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const startIndex = currentPage * cardsPerPage;
    return testimonials.slice(startIndex, startIndex + cardsPerPage);
  };

  // Enhanced navigation with animation
  const handleNavigation = (pageCallback) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newPage =
      typeof pageCallback === "function"
        ? pageCallback(currentPage)
        : pageCallback;

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    handleNavigation((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    handleNavigation((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    if (pageIndex !== currentPage) {
      handleNavigation(pageIndex);
    }
  };

  return (
    <section className="relative px-6 py-20 bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-full mb-6 animate-fadeInUp">
            ⭐ Customer Success Stories
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-fadeInUp">
            What Our{" "}
            <span className="text-green-600">Farmers</span> Say
          </h2>

        </div>

        {/* Navigation and Content Container with proper spacing */}
        <div className="relative px-16">
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center z-20 pointer-events-none">
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="pointer-events-auto p-4 rounded-full bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group disabled:opacity-50 transform -translate-x-4"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors" />
            </button>

            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="pointer-events-auto p-4 rounded-full bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group disabled:opacity-50 transform translate-x-4"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors" />
            </button>
          </div>

          {/* Testimonials Container with extra padding to prevent cutting */}
          <div className="relative py-8">
            <div
              className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out ${
                isAnimating
                  ? "opacity-0 transform translate-y-8"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              {getCurrentTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentPage}`}
                  className={`transform transition-all duration-700 ease-out ${
                    index === 1
                      ? "md:scale-105 hover:scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex flex-col items-center mt-12 space-y-6">
          {/* Pagination Dots */}
          <div className="flex justify-center space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                disabled={isAnimating}
                className={`relative transition-all duration-300 ${
                  index === currentPage
                    ? "w-8 h-3 bg-green-600 rounded-full"
                    : "w-3 h-3 bg-gray-300 hover:bg-green-400 rounded-full hover:scale-125"
                }`}
                aria-label={`Go to page ${index + 1}`}
              >
                {index === currentPage && (
                  <div className="absolute inset-0 bg-green-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Page Information */}
          <div className="text-center">
            <span className="text-gray-600 text-sm font-medium">
              Showing {getCurrentTestimonials().length} of {testimonials.length}{" "}
              testimonials • Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          {/* Auto-play Control */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                autoPlay
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {autoPlay
                ? "⏸️ Pause Auto-play"
                : "▶️ Start Auto-play"}
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}
