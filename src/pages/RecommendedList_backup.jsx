import rice from "../../public/CropsImage/rice.jpg";
import maize from "../../public/CropsImage/maize.jpg";
import chickpea from "../../public/CropsImage/chickpea.jpg";
import kidneybeans from "../../public/CropsImage/kidneybeans.jpg";
import pigeonpeas from "../../public/CropsImage/pigeonpeas.jpg";
import mothbeans from "../../public/CropsImage/mothbeans.jpg";
import mungbean from "../../public/CropsImage/mungbean.jpg";
import blackgram from "../../public/CropsImage/blackgram.jpg";
import lentil from "../../public/CropsImage/lentil.jpg";
import pomegranate from "../../public/CropsImage/pomegranate.jpg";
import banana from "../../public/CropsImage/banana.jpg";
import mango from "../../public/CropsImage/mango.jpg";
import grapes from "../../public/CropsImage/grapes.jpg";
import watermelon from "../../public/CropsImage/watermelon.jpg";
import muskmelon from "../../public/CropsImage/muskmelon.jpg";
import apple from "../../public/CropsImage/apple.jpg";
import orange from "../../public/CropsImage/orange.jpg";
import papaya from "../../public/CropsImage/papaya.jpg";
import coconut from "../../public/CropsImage/coconut.jpg";
import cotton from "../../public/CropsImage/cotton.jpg";
import jute from "../../public/CropsImage/jute.jpg";
import coffee from "../../public/CropsImage/coffee.jpg";

import { LuBadgeAlert, LuBadgeCheck, LuBadgeX, LuMapPin } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const cropImg = {
  rice: rice,
  maize: maize,
  chickpea: chickpea,
  kidneybeans: kidneybeans,
  pigeonpeas: pigeonpeas,
  mothbeans: mothbeans,
  mungbean: mungbean,
  blackgram: blackgram,
  lentil: lentil,
  pomegranate: pomegranate,
  banana: banana,
  mango: mango,
  grapes: grapes,
  watermelon: watermelon,
  muskmelon: muskmelon,
  apple: apple,
  orange: orange,
  papaya: papaya,
  coconut: coconut,
  cotton: cotton,
  jute: jute,
  coffee: coffee,
};

// Reusable Crop Card Component
const CropCard = ({ name, score, imageAlt, imageUrl }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-green-100">
      <div className="p-4 pb-2">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-48 object-cover rounded-2xl"
        />
      </div>
      <div className="px-4 pb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">
          Recommended based on your soil conditions
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-semibold bg-green-50 px-3 py-1 rounded-full">
            {score}% probability
          </span>
          <div className="rounded-full flex items-center justify-center">
            {score < 40 ? (
              <LuBadgeX className="w-6 h-6 text-red-500" />
            ) : score >= 40 && score < 70 ? (
              <LuBadgeAlert className="w-6 h-6 text-yellow-500" />
            ) : (
              <LuBadgeCheck className="w-6 h-6 text-green-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendedCrops = () => {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formData = location.state;

  // Map crop names to images - using the imported crop images
  const cropImages = {
    rice: cropImg.rice,
    maize: cropImg.maize,
    chickpea: cropImg.chickpea,
    kidneybeans: cropImg.kidneybeans,
    pigeonpeas: cropImg.pigeonpeas,
    mothbeans: cropImg.mothbeans,
    mungbean: cropImg.mungbean,
    blackgram: cropImg.blackgram,
    lentil: cropImg.lentil,
    pomegranate: cropImg.pomegranate,
    banana: cropImg.banana,
    mango: cropImg.mango,
    grapes: cropImg.grapes,
    watermelon: cropImg.watermelon,
    muskmelon: cropImg.muskmelon,
    apple: cropImg.apple,
    orange: cropImg.orange,
    papaya: cropImg.papaya,
    coconut: cropImg.coconut,
    cotton: cropImg.cotton,
    jute: cropImg.jute,
    coffee: cropImg.coffee,
  };

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!formData) return;

      console.log("Form data received:", formData);

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://crop-recommendation-ml-backend-2.onrender.com/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        let data;
        try {
          data = await response.json();
        } catch (jsonErr) {
          const text = await response.text();
          throw new Error(
            `API error: ${response.status} ${response.statusText} - ${text}`
          );
        }
        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${
              response.statusText
            } - ${JSON.stringify(data)}`
          );
        }

        console.log("API response:", data);
        setRecommendations(data.recommendations || []);
      } catch (err) {
        setError(
          err.message || "Failed to get recommendation. Please try again."
        );
        console.error("RecommendedCrops API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendation();
  }, [formData]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
            {recommendations && recommendations.length > 0
              ? "🌾 AI Recommended Crops"
              : loading
              ? "🔄 Loading Recommendations..."
              : "🌱 Crop Recommendations"}
          </h1>
          <p className="text-gray-600 text-lg">
            Personalized crop suggestions based on your soil conditions
          </p>
        </div>

        {/* Main Content - Two Column Layout for Large Devices */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Soil Conditions Summary (1/3 width) */}
          {formData && recommendations && recommendations.length > 0 && (
            <div className="lg:col-span-1 mb-8 lg:mb-0">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-200 lg:sticky lg:top-6">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center">
                  <span className="bg-green-100 p-2 rounded-full mr-3">🧪</span>
                  Soil Analysis
                </h3>

                {/* Displaying the soil data */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Nitrogen (N)
                      </span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formData.N}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Phosphorus (P)
                      </span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formData.P}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Potassium (K)
                      </span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formData.K}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Temperature
                      </span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formData.temperature}°C
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Humidity
                      </span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formData.humidity}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        pH Level
                      </span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formData.ph}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Displaying the location if it exists */}
                {formData.location && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <LuMapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-800 font-semibold">
                        {formData.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Column - Crop Grid (2/3 width) */}
          <div
            className={`${
              formData && recommendations && recommendations.length > 0
                ? "lg:col-span-2"
                : "lg:col-span-3"
            }`}
          >
            {/* Crop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              {loading ? (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-green-200 max-w-md mx-auto">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🔄</span>
                      </div>
                      <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      Analyzing Your Soil Data
                    </p>
                    <p className="text-gray-600">
                      Our AI is processing your soil conditions to find the best
                      crop recommendations...
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-red-200 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">❌</span>
                    </div>
                    <p className="text-lg font-semibold text-red-600 mb-2">
                      Something went wrong
                    </p>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : recommendations && recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <CropCard
                    key={rec.crop + index}
                    name={rec.crop.charAt(0).toUpperCase() + rec.crop.slice(1)}
                    score={Math.round(rec.probability)}
                    imageAlt={rec.crop + " crop"}
                    imageUrl={
                      cropImages[rec.crop.toLowerCase()] || cropImg.rice
                    }
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌱</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800 mb-2">
                      No Recommendations Available
                    </p>
                    <p className="text-gray-600 mb-6">
                      Please fill out the crop recommendation form to get
                      personalized suggestions.
                    </p>
                    <a
                      href="/crop-recommendation"
                      className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
                    >
                      <span className="mr-2">🔍</span>
                      Get Crop Recommendations
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCrops;
