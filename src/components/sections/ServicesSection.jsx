import { ServiceCard } from "../ui/ServiceCard";

// Services data matching the image
const SERVICES = [
  {
    id: "crop-recommendation",
    title: "Crop Recommendation",
    description: "help you to know Diseases in your crop",
    iconColor: "#B8860B", // Golden brown color as shown in image
  },
  {
    id: "fertilizer-guidance",
    title: "Fertilizer Guidance",
    description: "help you to know Diseases in your crop",
    iconColor: "#4caf50", // Green color as shown in image
  },
  {
    id: "disease-detection",
    title: "Disease Detection",
    description: "help you to know Diseases in your crop",
    iconColor: "#4caf50", // Green color as shown in image
  },
  {
    id: "agri-gpt",
    title: "AgriGPT",
    description: "AI-powered chatbot for instant farming advice and solutions",
    iconColor: "#B8860B", // Golden brown color as shown in image
  },
];

export function ServicesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-6 py-2 bg-green-600/10 text-green-700 text-sm font-semibold rounded-full mb-4 border border-green-200">
            🚀 Our Premium Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Advanced Farming Solutions
          </h2>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover cutting-edge agricultural technology designed to boost your
            productivity and crop yields
          </p> */}
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-12 lg:gap-16">
          {/* Services Grid - Responsive Layout */}
          <div className="flex-1 w-full max-w-4xl mx-auto xl:mx-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  className={`transform transition-all duration-500 hover:scale-105 ${
                    index === 0
                      ? "lg:translate-y-0"
                      : index === 1
                      ? "lg:translate-y-8"
                      : index === 2
                      ? "lg:translate-y-4"
                      : "lg:translate-y-12"
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Features Text - Enhanced Right Side */}
          <div className="flex-1 max-w-lg mx-auto xl:mx-0 mt-8 xl:mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-white/20">
              <div className="mb-6">
                <div className="inline-block p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Empower Your
                <span className="block text-green-600">Farming Journey</span>
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our comprehensive suite of AI-powered tools provides farmers
                with real-time insights, expert recommendations, and
                cutting-edge technology to maximize agricultural success.
              </p>

              {/* Feature Points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span className="text-gray-700 font-medium">
                    AI-Powered Disease Detection
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span className="text-gray-700 font-medium">
                    Smart Crop Recommendations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span className="text-gray-700 font-medium">
                    24/7 Expert Guidance
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
