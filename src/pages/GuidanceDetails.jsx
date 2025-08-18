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

import { HiOutlineDownload } from "react-icons/hi";
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

const getCropImage = (cropName) => {
  return cropImg[cropName?.toLowerCase()];
};

const InfoCard = ({ title, description, imageAlt, imageUrl, children }) => {
  return (
    <div className="bg-green-200 rounded-2xl shadow-lg flex flex-col md:flex-row transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border hover:border-green-500">
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none md:border-r  border-green-500"
        />
      </div>
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="space-y-2 text-gray-800">{children}</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-800 font-semibold cursor-pointer hover:underline hover:text-red-600">
            Save for Later
          </span>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-xl flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110">
            <HiOutlineDownload className="w-6 h-6 text-white hover:text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GuidanceDetails = () => {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formData = location.state;

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!formData) return;

      console.log("Form data received:", formData);

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://crop-recommendation-ml-backend-2.onrender.com/ml-fertility-recommendations",
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
        setRecommendations(data);
      } catch (err) {
        setError(
          err.message || "Failed to get recommendations. Please try again."
        );
        console.error("GuidanceDetails API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [formData]);

  return (
    <div className="bg-green-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          {recommendations && recommendations.crop
            ? `${
                recommendations.crop.charAt(0).toUpperCase() +
                recommendations.crop.slice(1)
              } Fertilizer Guidance`
            : loading
            ? "Loading Guidance..."
            : "Fertilizer Guidance"}
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-lg text-green-700 py-12">
            <div className="mb-4">
              <span className="loading loading-dots loading-xl"></span>
            </div>
            <p className="text-sm text-gray-600">
              Getting fertilizer recommendations...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <div className="text-red-800 text-center">
              <p className="text-lg font-medium mb-2">⚠️ Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Current Parameters Section */}
        {recommendations && recommendations.current_parameters && (
          <div className="mb-6 md:mb-8">
            <div className="inline-block border-2 border-blue-500 rounded-xl px-4 py-2 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Current Soil Parameters
              </h2>
            </div>
            <InfoCard
              title="Your Soil Conditions"
              description="Current nutrient levels and environmental conditions"
              imageUrl={getCropImage(recommendations.crop)}
              imageAlt={`${recommendations.crop} soil conditions`}
            >
              <div className="grid grid-cols-2 gap-2">
                <p>
                  <strong>Nitrogen (N):</strong>{" "}
                  {recommendations.current_parameters.N}
                </p>
                <p>
                  <strong>Phosphorus (P):</strong>{" "}
                  {recommendations.current_parameters.P}
                </p>
                <p>
                  <strong>Potassium (K):</strong>{" "}
                  {recommendations.current_parameters.K}
                </p>
                <p>
                  <strong>Temperature:</strong>{" "}
                  {recommendations.current_parameters.temperature}°C
                </p>
                <p>
                  <strong>Humidity:</strong>{" "}
                  {recommendations.current_parameters.humidity}%
                </p>
                <p>
                  <strong>pH Level:</strong>{" "}
                  {recommendations.current_parameters.ph}
                </p>
              </div>
            </InfoCard>
          </div>
        )}

        {/* Predicted Ideal Parameters Section */}
        {recommendations && recommendations.predicted_ideal && (
          <div className="mb-6 md:mb-8">
            <div className="inline-block border-2 border-green-500 rounded-xl px-4 py-2 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Ideal Parameters
              </h2>
            </div>
            <InfoCard
              title="Recommended Ideal Levels"
              description="Optimal nutrient levels for your crop"
              imageUrl={getCropImage(recommendations.crop)}
              imageAlt="Ideal parameters"
            >
              <div className="grid grid-cols-2 gap-2">
                <p>
                  <strong>Nitrogen (N):</strong>{" "}
                  {recommendations.predicted_ideal.N}
                </p>
                <p>
                  <strong>Phosphorus (P):</strong>{" "}
                  {recommendations.predicted_ideal.P}
                </p>
                <p>
                  <strong>Potassium (K):</strong>{" "}
                  {recommendations.predicted_ideal.K}
                </p>
                <p>
                  <strong>Temperature:</strong>{" "}
                  {recommendations.predicted_ideal.temperature}°C
                </p>
                <p>
                  <strong>Humidity:</strong>{" "}
                  {recommendations.predicted_ideal.humidity}%
                </p>
                <p>
                  <strong>pH Level:</strong>{" "}
                  {recommendations.predicted_ideal.ph}
                </p>
              </div>
            </InfoCard>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations && recommendations.recommendations && (
          <div className="mb-6 md:mb-8">
            <div className="inline-block border-2 border-orange-500 rounded-xl px-4 py-2 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Action Plan</h2>
            </div>
            <InfoCard
              title="Fertilizer Recommendations"
              description="Step-by-step guidance for optimal crop growth"
              imageUrl={getCropImage(recommendations.crop)}
              imageAlt="Fertilizer recommendations"
            >
              {recommendations.recommendations.map((recommendation, index) => (
                <p key={index} className="mb-2 p-2 bg-green-100 rounded-lg">
                  {recommendation}
                </p>
              ))}
            </InfoCard>
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && !recommendations && (
          <div className="text-center text-lg text-gray-600 py-12">
            <p className="text-xl font-medium mb-4">No Data Available</p>
            <p className="mb-6 text-gray-500">
              Please fill out the fertilizer guidance form to get personalized
              recommendations.
            </p>
            <a
              href="/fertilizer-guidance"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Go to Fertilizer Guidance
            </a>
          </div>
        )}

        {/* Safety & Guidelines Section */}
        <div className="text-center p-3">
          <h2 className="text-2xl md:text-3xl font-bold cursor-pointer text-gray-800 hover:underline hover:text-red-500">
            Safety & Guidelines
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GuidanceDetails;
