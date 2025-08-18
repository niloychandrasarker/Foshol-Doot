import { ChevronDown } from "lucide-react";
import bg_img from "/public/background-img.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const CropList = [
  { name: "Rice", value: "rice" },
  { name: "Maize", value: "maize" },
  { name: "Chickpea", value: "chickpea" },
  { name: "Kidney Beans", value: "kidneybeans" },
  { name: "Pigeon Peas", value: "pigeonpeas" },
  { name: "Moth Beans", value: "mothbeans" },
  { name: "Mung Bean", value: "mungbean" },
  { name: "Black Gram", value: "blackgram" },
  { name: "Lentil", value: "lentil" },
  { name: "Pomegranate", value: "pomegranate" },
  { name: "Grapes", value: "grapes" },
  { name: "Banana", value: "banana" },
  { name: "Mango", value: "mango" },
  { name: "Watermelon", value: "watermelon" },
  { name: "Muskmelon", value: "muskmelon" },
  { name: "Apple", value: "apple" },
  { name: "Orange", value: "orange" },
  { name: "Papaya", value: "papaya" },
  { name: "Coconut", value: "coconut" },
  { name: "Cotton", value: "cotton" },
  { name: "Jute", value: "jute" },
  { name: "Coffee", value: "coffee" },
];

export default function FertilizerGuidance() {
  const navigate = useNavigate();
  const [cropSearchTerm, setCropSearchTerm] = useState("");
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");
  const cropRef = useRef(null);

  //--> API input states
  const [ph, setPh] = useState("");
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  // const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter crops based on search term
  const filteredCrops = CropList.filter((crop) =>
    crop.name.toLowerCase().includes(cropSearchTerm.toLowerCase())
  );

  const handleCropSearchChange = (e) => {
    setCropSearchTerm(e.target.value);
  };

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop.value);
    setCropSearchTerm(crop.name);
    setIsCropDropdownOpen(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setGuidance(null);

    // Prepare form data
    const formData = {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      crop: selectedCrop,
    };

    console.log("Form data:", formData);

    navigate("/guidance-details", {
      state: formData,
    });
    setLoading(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cropRef.current && !cropRef.current.contains(event.target)) {
        setIsCropDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Select Your Crop */}
              <div ref={cropRef}>
                <label className="block text-white text-sm font-medium mb-2">
                  Select Your Crop*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cropSearchTerm}
                    onChange={handleCropSearchChange}
                    onFocus={() => setIsCropDropdownOpen(true)}
                    placeholder="Search for your crop..."
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    required
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

                  {/* Dropdown with crops */}
                  {isCropDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredCrops.length > 0 ? (
                        filteredCrops.map((crop) => (
                          <div
                            key={crop.value}
                            onClick={() => handleCropSelect(crop)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 border-b border-gray-200 last:border-b-0"
                          >
                            <span>{crop.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">
                          No crops found. Try searching for different crops.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Two column grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      pH Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={ph}
                      onChange={(e) => setPh(e.target.value)}
                      placeholder="Enter pH Level"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nitrogen Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={N}
                      onChange={(e) => setN(e.target.value)}
                      placeholder="Enter Nitrogen Level"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phosphorus Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={P}
                      onChange={(e) => setP(e.target.value)}
                      placeholder="Enter Phosphorus Level"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Potassium Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={K}
                      onChange={(e) => setK(e.target.value)}
                      placeholder="Enter Potassium Level"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Soil Moisture Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                      placeholder="Enter Soil Moisture Level (%)"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Temperature
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="-10"
                      max="50"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter Temperature (°C)"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center pt-4 gap-2">
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full shadow-sm shadow-green-200/40 border border-white/30 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-green-300/40 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Guidance"}
                </button>
                {error && (
                  <div className="text-red-600 text-sm mt-2">{error}</div>
                )}
                {/* Recommendation is now shown on the next page */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
