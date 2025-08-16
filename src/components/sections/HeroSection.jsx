export function HeroSection() {
  return (
    <section className="relative px-6 py-20 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="z-10">
          <div className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full mb-6">
            🌱 Smart Agriculture Technology
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-green-800 mb-6 leading-tight">
            Your Smart
            <span className="block text-green-600">Farming</span>
            <span className="block">Assistant</span>
          </h1>

          <p className="text-gray-700 text-xl mb-12 leading-relaxed max-w-lg">
            Transform your farming with AI-powered insights. Get personalized
            crop recommendations, fertilizer guidance, and instant disease
            detection to maximize your harvest.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-green-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800">10K+</div>
              <div className="text-sm text-gray-600">Happy Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800">95%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-10">
          <div className="relative group">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500 opacity-20"></div>

            {/* Image container with transparency effect */}
            <div className="relative bg-white bg-opacity-70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img
                src="/hero.png"
                alt="Smart farming illustration showing farmer with phone and agricultural icons"
                className="w-full h-auto relative z-10 opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))",
                }}
              />

              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white text-xl">🌾</span>
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-sm">AI</span>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur-xl opacity-20 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional effects */}
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
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
