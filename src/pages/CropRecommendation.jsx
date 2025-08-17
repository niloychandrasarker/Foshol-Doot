import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FARMING_LOCATIONS = [
  // Bangladesh - Divisions and Major Agricultural Areas
  {
    place_id: "bd1",
    description: "Dhaka Division, Bangladesh",
    region: "Central BD",
  },
  {
    place_id: "bd2",
    description: "Chittagong Division, Bangladesh",
    region: "South-East BD",
  },
  {
    place_id: "bd3",
    description: "Rajshahi Division, Bangladesh",
    region: "North-West BD",
  },
  {
    place_id: "bd4",
    description: "Khulna Division, Bangladesh",
    region: "South-West BD",
  },
  {
    place_id: "bd5",
    description: "Barisal Division, Bangladesh",
    region: "South BD",
  },
  {
    place_id: "bd6",
    description: "Sylhet Division, Bangladesh",
    region: "North-East BD",
  },
  {
    place_id: "bd7",
    description: "Rangpur Division, Bangladesh",
    region: "North BD",
  },
  {
    place_id: "bd8",
    description: "Mymensingh Division, Bangladesh",
    region: "North-Central BD",
  },

  // Bangladesh - Major Agricultural Districts
  {
    place_id: "bd9",
    description: "Comilla, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd10",
    description: "Bogura, Rajshahi Division",
    region: "North-West BD",
  },
  {
    place_id: "bd11",
    description: "Dinajpur, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd12",
    description: "Jessore, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd13",
    description: "Faridpur, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd14",
    description: "Pabna, Rajshahi Division",
    region: "North-West BD",
  },
  {
    place_id: "bd15",
    description: "Kushtia, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd16",
    description: "Tangail, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd17",
    description: "Mymensingh, Mymensingh Division",
    region: "North-Central BD",
  },
  {
    place_id: "bd18",
    description: "Rajbari, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd19",
    description: "Manikganj, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd20",
    description: "Munshiganj, Dhaka Division",
    region: "Central BD",
  },

  // Bangladesh - Rice Belt Areas
  {
    place_id: "bd21",
    description: "Barisal, Barisal Division",
    region: "South BD",
  },
  {
    place_id: "bd22",
    description: "Patuakhali, Barisal Division",
    region: "South BD",
  },
  {
    place_id: "bd23",
    description: "Bhola, Barisal Division",
    region: "South BD",
  },
  {
    place_id: "bd24",
    description: "Pirojpur, Barisal Division",
    region: "South BD",
  },
  {
    place_id: "bd25",
    description: "Jhalokati, Barisal Division",
    region: "South BD",
  },
  {
    place_id: "bd26",
    description: "Barguna, Barisal Division",
    region: "South BD",
  },

  // Bangladesh - Northern Agricultural Areas
  {
    place_id: "bd27",
    description: "Rangpur, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd28",
    description: "Kurigram, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd29",
    description: "Lalmonirhat, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd30",
    description: "Nilphamari, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd31",
    description: "Gaibandha, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd32",
    description: "Thakurgaon, Rangpur Division",
    region: "North BD",
  },
  {
    place_id: "bd33",
    description: "Panchagarh, Rangpur Division",
    region: "North BD",
  },

  // Bangladesh - Western Agricultural Areas
  {
    place_id: "bd34",
    description: "Rajshahi, Rajshahi Division",
    region: "North-West BD",
  },
  {
    place_id: "bd35",
    description: "Natore, Rajshahi Division",
    region: "North-West BD",
  },
  {
    place_id: "bd36",
    description: "Naogaon, Rajshahi Division",
    region: "North-West BD",
  },
  {
    place_id: "bd37",
    description: "Chapainawabganj, Rajshahi Division",
    region: "North-West BD",
  },
  {
    place_id: "bd38",
    description: "Sirajganj, Rajshahi Division",
    region: "North-West BD",
  },

  // Bangladesh - Eastern Tea and Agricultural Areas
  {
    place_id: "bd39",
    description: "Sylhet, Sylhet Division",
    region: "North-East BD",
  },
  {
    place_id: "bd40",
    description: "Moulvibazar, Sylhet Division",
    region: "North-East BD",
  },
  {
    place_id: "bd41",
    description: "Habiganj, Sylhet Division",
    region: "North-East BD",
  },
  {
    place_id: "bd42",
    description: "Sunamganj, Sylhet Division",
    region: "North-East BD",
  },

  // Bangladesh - Chittagong Hill Tracts and Agricultural Areas
  {
    place_id: "bd43",
    description: "Chittagong, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd44",
    description: "Cox's Bazar, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd45",
    description: "Feni, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd46",
    description: "Lakshmipur, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd47",
    description: "Noakhali, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd48",
    description: "Brahmanbaria, Chittagong Division",
    region: "South-East BD",
  },
  {
    place_id: "bd49",
    description: "Chandpur, Chittagong Division",
    region: "South-East BD",
  },

  // Bangladesh - Central Agricultural Hub
  {
    place_id: "bd50",
    description: "Dhaka, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd51",
    description: "Gazipur, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd52",
    description: "Narayanganj, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd53",
    description: "Narsingdi, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd54",
    description: "Kishoreganj, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd55",
    description: "Gopalganj, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd56",
    description: "Madaripur, Dhaka Division",
    region: "Central BD",
  },
  {
    place_id: "bd57",
    description: "Shariatpur, Dhaka Division",
    region: "Central BD",
  },

  // Bangladesh - Southwestern Coastal Areas
  {
    place_id: "bd58",
    description: "Khulna, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd59",
    description: "Satkhira, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd60",
    description: "Bagerhat, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd61",
    description: "Jhenaidah, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd62",
    description: "Magura, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd63",
    description: "Narail, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd64",
    description: "Chuadanga, Khulna Division",
    region: "South-West BD",
  },
  {
    place_id: "bd65",
    description: "Meherpur, Khulna Division",
    region: "South-West BD",
  },

  // India - Major States (keeping the important ones)
  { place_id: "1", description: "Punjab, India", region: "North India" },
  { place_id: "2", description: "Haryana, India", region: "North India" },
  { place_id: "3", description: "Uttar Pradesh, India", region: "North India" },
  { place_id: "4", description: "Maharashtra, India", region: "West India" },
  { place_id: "5", description: "West Bengal, India", region: "East India" },
  { place_id: "6", description: "Gujarat, India", region: "West India" },
  { place_id: "7", description: "Rajasthan, India", region: "North India" },
  { place_id: "8", description: "Karnataka, India", region: "South India" },
  {
    place_id: "9",
    description: "Andhra Pradesh, India",
    region: "South India",
  },
  { place_id: "10", description: "Tamil Nadu, India", region: "South India" },
  {
    place_id: "11",
    description: "Madhya Pradesh, India",
    region: "Central India",
  },
  { place_id: "12", description: "Bihar, India", region: "East India" },
  { place_id: "13", description: "Odisha, India", region: "East India" },
  { place_id: "14", description: "Telangana, India", region: "South India" },
  { place_id: "15", description: "Kerala, India", region: "South India" },

  // India - Major Farming Districts (key ones)
  { place_id: "16", description: "Ludhiana, Punjab", region: "North India" },
  { place_id: "17", description: "Amritsar, Punjab", region: "North India" },
  { place_id: "18", description: "Karnal, Haryana", region: "North India" },
  { place_id: "19", description: "Nashik, Maharashtra", region: "West India" },
  { place_id: "20", description: "Pune, Maharashtra", region: "West India" },
  { place_id: "21", description: "Bharuch, Gujarat", region: "West India" },
  { place_id: "22", description: "Anand, Gujarat", region: "West India" },
  { place_id: "23", description: "Mysore, Karnataka", region: "South India" },
  {
    place_id: "24",
    description: "Coimbatore, Tamil Nadu",
    region: "South India",
  },
  {
    place_id: "25",
    description: "Guntur, Andhra Pradesh",
    region: "South India",
  },
];

export default function CropRecommendation() {
  const [locations, setLocations] = useState(FARMING_LOCATIONS);
  const [filteredLocations, setFilteredLocations] = useState(
    FARMING_LOCATIONS.slice(0, 10)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const mapRef = useRef(null);

  //--> API input states
  const [N, setN] = useState(60);
  const [P, setP] = useState(30);
  const [K, setK] = useState(50);
  const [temperature, setTemperature] = useState(30);
  const [humidity, setHumidity] = useState(70);
  const [ph, setPh] = useState(7);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilteredLocations(FARMING_LOCATIONS.slice(0, 10));
  }, []);

  const navigate = useNavigate();

  //--> Utility: simple search over FARMING_LOCATIONS
  const searchLocations = (query) => {
    const q = (query || "").toString().trim().toLowerCase();
    if (!q) return FARMING_LOCATIONS.slice(0, 10);
    return FARMING_LOCATIONS.filter((loc) => {
      return (
        (loc.description || "").toLowerCase().includes(q) ||
        (loc.region || "").toLowerCase().includes(q)
      );
    }).slice(0, 50);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilteredLocations(searchLocations(val));
    setIsDropdownOpen(true);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.description);
    setSearchTerm(location.description);
    setIsDropdownOpen(false);
  };

  //--> click-outside to close dropdown
  useEffect(() => {
    function handleClickOutside(ev) {
      if (mapRef.current && !mapRef.current.contains(ev.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);

    //--> Navigate to the recommended list page and let that page perform the API call.
    navigate("/recommended-list", {
      state: {
        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        location: selectedLocation,
      },
    });
    setLoading(false);
  };

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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Crop Recommendation
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
              {/* Field Location */}
              <div ref={mapRef}>
                <label className="block text-white text-sm font-medium mb-2">
                  Enter your Field Location*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Search for your location..."
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

                  {/* Dropdown with locations */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                          <div
                            key={location.place_id}
                            onClick={() => handleLocationSelect(location)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 border-b border-gray-200 last:border-b-0 flex justify-between items-center"
                          >
                            <span>{location.description}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {location.region}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">
                          No locations found. Try searching for states or
                          cities.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Two column grid with number inputs */}
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
                      onChange={(e) => setPh(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nitrogen (N)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={N}
                      onChange={(e) => setN(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phosphorus (P)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={P}
                      onChange={(e) => setP(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Potassium (K)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={K}
                      onChange={(e) => setK(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Humidity (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      min="-20"
                      max="60"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/90 border-2 border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  {loading ? "Loading..." : "Get Recommendations"}
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
