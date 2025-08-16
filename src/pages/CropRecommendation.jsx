import { ChevronDown } from "lucide-react"

export default function CropRecommendation() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/golden-wheat-field.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Crop Recommendation</h1>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <form className="space-y-6">
              {/* Field Location */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Enter your Field Location*</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                    <option value="">Select</option>
                    <option value="north">North Region</option>
                    <option value="south">South Region</option>
                    <option value="east">East Region</option>
                    <option value="west">West Region</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Two column grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Enter pH Level</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                        <option value="">Select</option>
                        <option value="acidic">Acidic (0-6.9)</option>
                        <option value="neutral">Neutral (7.0)</option>
                        <option value="alkaline">Alkaline (7.1-14)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Enter Nitrogen Level</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Enter Phosphorus Level</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
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
                    <label className="block text-white text-sm font-medium mb-2">Enter Potassium Level</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Enter Soil Moisture Level</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                        <option value="">Select</option>
                        <option value="dry">Dry</option>
                        <option value="moist">Moist</option>
                        <option value="wet">Wet</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Enter Temperature</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
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
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Get Recommendations
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
