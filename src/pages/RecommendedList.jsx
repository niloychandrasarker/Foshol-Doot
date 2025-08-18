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

//--> Reusable Crop Card Component
const CropCard = ({ name, score, imageAlt, imageUrl }) => {
  return (
    <div className="bg-green-200 rounded-2xl shadow-lg transition duration-300 transform scale-100 hover:scale-105">
      <div className="pb-3">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 px-3">{name}</h3>
      <p className="text-gray-700 text-sm px-3 py-2">
        Recommended based on your soil conditions
      </p>
      <div className="flex items-center justify-between p-3 pb-3">
        <span className="text-gray-900 font-semibold">
          {score}% probability
        </span>
        <div className="rounded-full flex items-center justify-center">
          {score < 40 ? (
            <LuBadgeX className="w-6 h-6 text-red-600" />
          ) : score >= 40 && score < 70 ? (
            <LuBadgeAlert className="w-6 h-6 text-yellow-600" />
          ) : (
            <LuBadgeCheck className="w-6 h-6 text-green-600" />
          )}
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

  //--> Map crop names to images - using the imported crop images
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

      console.log("Form data received:", formData); //--> Debug log

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

        console.log("API response:", data); //--> Debug log
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
    <div className="bg-green-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 p-3 md:p-6">
          {recommendations && recommendations.length > 0
            ? "AI Recommended Crops List"
            : loading
            ? "Loading Recommendations..."
            : "Crop Recommendations"}
        </h1>

        {/* Main Content - Two Column Layout for Large Devices */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Soil Conditions Summary (1/3 width) */}
          {formData && recommendations && recommendations.length > 0 && (
            <div className="lg:col-span-1 mb-12 lg:mb-0">
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl p-4 shadow-xl lg:sticky lg:top-6">
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 text-center mb-4 leading-tight">
                  Soil Conditions Overview
                </h3>

                {/* Displaying the soil data */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 text-center lg:text-left text-sm sm:text-base text-gray-700 font-medium">
                  <div className="bg-green-100 rounded-xl p-2 shadow-inner border border-gray-200 transition-transform hover:scale-105 hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-500">Nitrogen (N):</span>
                    <p className="font-bold text-lg md:text-xl text-emerald-600">
                      {formData.N}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-xl px-1 py-2 md:p-2 shadow-inner border border-gray-200 transition-transform hover:scale-105 hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-500">Phosphorus (P):</span>
                    <p className="font-bold text-lg md:text-xl text-emerald-600">
                      {formData.P}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-xl p-2 shadow-inner border border-gray-200 transition-transform hover:scale-105 hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-500">Potassium (K):</span>
                    <p className="font-bold text-lg md:text-xl text-emerald-600">
                      {formData.K}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-xl p-2 shadow-inner border border-gray-200 transition-transform hover:scale-105 hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-500">Temperature:</span>
                    <p className="font-bold text-lg md:text-xl text-emerald-600">
                      {formData.temperature}°C
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-xl p-2 shadow-inner border border-gray-200 transition-transform hover:scale-105 hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-500">Humidity:</span>
                    <p className="font-bold text-lg md:text-xl text-emerald-600">
                      {formData.humidity}%
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-xl p-2 shadow-inner border border-gray-200 transition-transform hover:scale-105 hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-500">pH:</span>
                    <p className="font-bold text-lg md:text-xl text-emerald-600">
                      {formData.ph}
                    </p>
                  </div>
                </div>

                {/* Displaying the location if it exists */}
                {formData.location && (
                  <div className="mt-4 text-center lg:text-left text-gray-600 font-semibold text-md border-t pt-4 border-gray-200">
                    <p className="flex items-center justify-center lg:justify-start gap-2">
                      <LuMapPin className="h-5 w-5 text-red-500" />
                      <span className="text-emerald-700 font-semibold">
                        {formData.location}
                      </span>
                    </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 pb-6">
              {loading ? (
                <div className="col-span-full text-center text-lg text-green-700 py-12">
                  <div className="mb-4">
                    <span className="loading loading-dots loading-xl"></span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Loading recommendations...
                  </p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-600 py-12">
                  <p className="text-lg font-medium">{error}</p>
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
                <div className="col-span-full text-center text-lg text-gray-600 py-12">
                  <p className="text-xl font-medium mb-4">
                    No Recommendations Available
                  </p>
                  <p className="mb-6 text-gray-500">
                    Please fill out the crop recommendation form to get
                    personalized suggestions.
                  </p>
                  <a
                    href="/crop-recommendation"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Go to Crop Recommendation
                  </a>
                </div>
              )}

            )}
          </div>
        )}

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-6">
          {loading ? (
            <div className="col-span-full text-center text-lg text-green-700 py-12">
              <div className="mb-4">
                <span className="loading loading-dots loading-xl"></span>
              </div>
              <p className="text-sm text-gray-600">
                Loading recommendations...
              </p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-600 py-12">
              <p className="text-lg font-medium">{error}</p>
            </div>
          ) : recommendations && recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <CropCard
                key={rec.crop + index}
                name={rec.crop.charAt(0).toUpperCase() + rec.crop.slice(1)}
                score={Math.round(rec.probability)}
                imageAlt={rec.crop + " crop"}
                imageUrl={cropImages[rec.crop.toLowerCase()] || cropImg.rice}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-600 py-12">
              <p className="text-xl font-medium mb-4">
                No Recommendations Available
              </p>
              <p className="mb-6 text-gray-500">
                Please fill out the crop recommendation form to get personalized
                suggestions.
              </p>
              <a
                href="/crop-recommendation"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Go to Crop Recommendation
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCrops;

//--> Error ki solve hoice...