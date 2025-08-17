export function TestimonialCard({ testimonial, index }) {
  // Enhanced positioning for better responsive design
  const getCardStyle = (index) => {
    switch (index) {
      case 0:
        return "transform lg:rotate-[-1deg] lg:translate-y-2 hover:rotate-0 hover:translate-y-0";
      case 1:
        return "transform lg:scale-105 z-10 hover:scale-110";
      case 2:
        return "transform lg:rotate-[1deg] lg:translate-y-2 hover:rotate-0 hover:translate-y-0";
      default:
        return "hover:scale-105";
    }
  };

  return (
    <div
      className={`relative transition-all duration-500 ${getCardStyle(index)}`}
    >
      {/* Enhanced curved border effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl transform rotate-1 scale-105 opacity-15 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-emerald-400 to-green-500 rounded-3xl transform -rotate-0.5 scale-102 opacity-10 blur-xs"></div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-6 sm:p-8 relative z-10 transition-all duration-500 border border-white/50 hover:border-green-200/50 group">
        {/* Background gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          {/* Enhanced Profile Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-gradient-to-r from-green-400 to-emerald-500 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={testimonial.avatar || "/professional-headshot.png"}
                  alt={`${testimonial.name} profile`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Professional status indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-1 text-lg sm:text-xl group-hover:text-gray-800 transition-colors duration-300">
              {testimonial.name}
            </h4>

            <div className="flex items-center gap-2 mb-2">
              <p className="text-green-600 text-sm sm:text-base font-semibold">
                {testimonial.role}
              </p>
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="text-yellow-400 text-sm">
                {"★".repeat(testimonial.rating || 5)}
              </div>
            </div>
          </div>

          {/* Enhanced Quote Section */}
          <div className="relative">
            {/* Opening quote with better styling */}
            <div className="absolute -top-4 -left-2 text-6xl sm:text-7xl text-green-500/30 font-serif leading-none select-none">
              "
            </div>

            <div className="relative px-4 pt-6 pb-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium italic group-hover:text-gray-800 transition-colors duration-300 line-clamp-4">
                {testimonial.content}
              </p>
            </div>

            {/* Closing quote */}
            <div className="absolute -bottom-6 -right-2 text-6xl sm:text-7xl text-green-500/30 font-serif leading-none rotate-180 select-none">
              "
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-green-100/50">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Verified Review</span>
            </div>

            <div className="flex items-center gap-1 text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read more</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Subtle animation particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700"></div>
      </div>
    </div>
  );
}
