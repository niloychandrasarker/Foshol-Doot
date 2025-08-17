import { ChevronDown } from "lucide-react";
import bg_img from "../../public/background-img.jpg";
import { Link } from "react-router-dom";

export default function FertilizerGuidance() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bg_img})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Fertilizer Guidance
          </h1>

          <div
            className="bg-white/30 dark:bg-white/10 backdrop-blur-2xl rounded-3xl px-4 py-6 md:p-10 border border-white/30 shadow-2xl shadow-black/10 ring-1 ring-white/40"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.10) 100%)",
              backdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            <form className="space-y-6">
              {/* Select Your Crop */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Select Your Crop*
                </label>
                <div className="relative">
                  <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                    <option value="">Select</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="corn">Corn</option>
                    <option value="soybean">Soybean</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Two column grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Enter pH Level
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                        <option value="">Select</option>
                        <option value="acidic">Acidic (0-6.9)</option>
                        <option value="neutral">Neutral (7.0)</option>
                        <option value="alkaline">Alkaline (7.1-14)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Enter Nitrogen Level
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Enter Phosphorus Level
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Enter Potassium Level
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Enter Soil Moisture Level
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                        <option value="">Select</option>
                        <option value="dry">Dry</option>
                        <option value="moist">Moist</option>
                        <option value="wet">Wet</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Enter Temperature
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                        <option value="">Select</option>
                        <option value="cold">Cold (0-15°C)</option>
                        <option value="moderate">Moderate (16-25°C)</option>
                        <option value="warm">Warm (26-35°C)</option>
                        <option value="hot">Hot (36°C+)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                {/* <button
                  type="submit"
                  className="px-4 md:px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full shadow-sm shadow-green-200/40 border border-white/30 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-green-300/40"
                >
                  Get Guidance
                </button> */}
                <Link
                  to="/guidance-details"
                  className="px-4 md:px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full shadow-sm shadow-green-200/40 border border-white/30 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-green-300/40"
                >
                  Get Guidance
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
