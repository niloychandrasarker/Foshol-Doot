export function TestimonialCard({ testimonial, index }) {
  // Different positioning for the curved effect
  const getCardStyle = (index) => {
    switch (index) {
      case 0:
        return "transform rotate-[-2deg] translate-y-4";
      case 1:
        return "transform scale-110 z-10";
      case 2:
        return "transform rotate-[2deg] translate-y-4";
      default:
        return "";
    }
  };

  return (
    <div className={`relative ${getCardStyle(index)}`}>
      {/* Green curved border effect */}
      <div className="absolute inset-0 bg-green-600 rounded-3xl transform rotate-1 scale-105 opacity-20"></div>

      <div className="bg-white rounded-3xl shadow-lg p-8 relative z-10 hover:shadow-xl transition-all duration-300">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden border-4 border-green-100">
            <img
              src={testimonial.avatar || "/professional-headshot.png"}
              alt={`${testimonial.name} profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-gray-800 mb-1 text-lg">
            {testimonial.name}
          </h4>
          <p className="text-gray-500 text-sm mb-4 font-medium">
            {testimonial.role}
          </p>

          {/* Quote marks */}
          <div className="text-4xl text-green-600 mb-3 font-serif leading-none">
            "
          </div>

          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            {testimonial.content}
          </p>

          {/* Closing quote */}
          <div className="text-4xl text-green-600 mt-3 font-serif leading-none text-right">
            "
          </div>
        </div>
      </div>
    </div>
  );
}
