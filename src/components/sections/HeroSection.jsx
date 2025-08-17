export function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-4 sm:right-20 w-12 sm:w-16 h-12 sm:h-16 bg-green-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-20 left-4 sm:left-20 w-20 sm:w-24 h-20 sm:h-24 bg-green-200 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-emerald-300 rounded-full opacity-10 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-green-500 rounded-full opacity-15 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Enhanced Left Content */}
        <div className="z-10 text-center lg:text-left">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-full mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="mr-2">🌱</span>
            Smart Agriculture Technology
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Smart
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Farming
            </span>
            <span className="block">Assistant</span>
          </h1>

          <p className="text-gray-600 text-lg sm:text-xl mb-8 lg:mb-12 leading-relaxed max-w-2xl lg:max-w-lg mx-auto lg:mx-0">
            Transform your farming with AI-powered insights. Get personalized
            crop recommendations, fertilizer guidance, and instant disease
            detection to maximize your harvest.
          </p>

          {/* Enhanced CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <span>Get Started</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a6 6 0 006 6v-4"
                />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div> */}

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-green-200/50">
            <div className="text-center group cursor-pointer">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                10K+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Happy Farmers
              </div>
              <div className="w-full h-1 bg-green-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transform translate-x-0 group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                95%
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Accuracy Rate
              </div>
              <div className="w-full h-1 bg-green-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transform translate-x-0 group-hover:translate-x-full transition-transform duration-1000 delay-200"></div>
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                24/7
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                AI Support
              </div>
              <div className="w-full h-1 bg-green-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transform translate-x-0 group-hover:translate-x-full transition-transform duration-1000 delay-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right Image */}
        <div className="relative z-10 mt-12 lg:mt-0">
          <div className="relative group">
            {/* Multiple decorative backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-700 opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-400 to-green-600 rounded-3xl transform -rotate-3 group-hover:-rotate-1 transition-transform duration-500 opacity-15"></div>

            {/* Enhanced Image container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50">
              <img
                src="/hero.png"
                alt="Smart farming illustration showing farmer with phone and agricultural icons"
                className="w-full h-auto relative z-10 opacity-90 hover:opacity-100 transition-all duration-500 mix-blend-multiply transform group-hover:scale-105"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))",
                }}
              />

              {/* Enhanced floating elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce hover:animate-pulse">
                <span className="text-white text-xl">🌾</span>
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-bounce">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="absolute top-1/2 left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-ping">
                <span className="text-white text-xs">📊</span>
              </div>

              {/* Particle effect */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse opacity-50"></div>
            </div>

            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-400 to-green-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 -z-20"></div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for additional effects */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
