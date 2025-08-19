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

import {
  HiOutlineDownload,
  HiBeaker,
  HiCheckCircle,
  HiLightBulb,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  // Use public URL paths instead of imports for better CORS handling
  return `/CropsImage/${cropName?.toLowerCase()}.jpg`;
};

// Professional Data Card Component
const DataCard = ({ title, icon, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:border-green-400 ${className}`}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-green-100 rounded-lg mr-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-3 text-gray-700">{children}</div>
    </div>
  );
};

// Parameter Item Component
const ParameterItem = ({ label, value, unit = "" }) => {
  return (
    <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="font-semibold text-gray-900">
        {value}
        {unit}
      </span>
    </div>
  );
};

// Recommendation Item Component
const RecommendationItem = ({ text, index }) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
      <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {index + 1}
      </div>
      <p className="text-gray-800 leading-relaxed">{text}</p>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ title, description, children, imageUrl, imageAlt }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:border-green-400">
      <div className="flex flex-col md:flex-row gap-6">
        {imageUrl && (
          <div className="md:w-1/3">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

// PDF Download Component with improved error handling and fallback
const PDFDownload = ({
  data,
  fileName,
  title,
  buttonText,
  type,
  targetRef,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSimplePDF = () => {
    try {
      const pdf = new jsPDF();

      // Add title
      pdf.setFontSize(20);
      pdf.text(`${data?.crop || "Crop"} Fertilizer Report`, 20, 30);

      // Add current parameters
      pdf.setFontSize(16);
      pdf.text("Current Soil Parameters:", 20, 50);
      pdf.setFontSize(12);
      if (data?.current_parameters) {
        pdf.text(`Nitrogen (N): ${data.current_parameters.N}`, 20, 65);
        pdf.text(`Phosphorus (P): ${data.current_parameters.P}`, 20, 75);
        pdf.text(`Potassium (K): ${data.current_parameters.K}`, 20, 85);
        pdf.text(
          `Temperature: ${data.current_parameters.temperature}°C`,
          20,
          95
        );
        pdf.text(`Humidity: ${data.current_parameters.humidity}%`, 20, 105);
        pdf.text(`pH Level: ${data.current_parameters.ph}`, 20, 115);
      }

      // Add ideal parameters
      pdf.setFontSize(16);
      pdf.text("Recommended Ideal Levels:", 20, 135);
      pdf.setFontSize(12);
      if (data?.predicted_ideal) {
        pdf.text(`Nitrogen (N): ${data.predicted_ideal.N}`, 20, 150);
        pdf.text(`Phosphorus (P): ${data.predicted_ideal.P}`, 20, 160);
        pdf.text(`Potassium (K): ${data.predicted_ideal.K}`, 20, 170);
        pdf.text(`Temperature: ${data.predicted_ideal.temperature}°C`, 20, 180);
        pdf.text(`Humidity: ${data.predicted_ideal.humidity}%`, 20, 190);
        pdf.text(`pH Level: ${data.predicted_ideal.ph}`, 20, 200);
      }

      // Add recommendations
      if (data?.recommendations && data.recommendations.length > 0) {
        pdf.setFontSize(16);
        pdf.text("Fertilizer Recommendations:", 20, 220);
        pdf.setFontSize(12);

        let yPosition = 235;
        data.recommendations.forEach((recommendation, index) => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = 20;
          }

          const lines = pdf.splitTextToSize(
            `${index + 1}. ${recommendation}`,
            170
          );
          pdf.text(lines, 20, yPosition);
          yPosition += lines.length * 7;
        });
      }

      pdf.save(`${fileName}.pdf`);
      return true;
    } catch (error) {
      console.error("Simple PDF generation failed:", error);
      return false;
    }
  };

  const handleDownload = async () => {
    if (!targetRef?.current) {
      alert(
        "Page content not found. Please wait for the page to load completely."
      );
      return;
    }

    setIsGenerating(true);
    try {
      // First try: Advanced PDF with page capture
      try {
        // Wait for any pending renders
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(targetRef.current, {
          scale: 1,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          removeContainer: true,
          imageTimeout: 0,
          onclone: (clonedDoc) => {
            // Ensure all images are loaded
            const images = clonedDoc.querySelectorAll("img");
            images.forEach((img) => {
              if (img.src.startsWith("blob:") || img.src.startsWith("data:")) {
                img.style.display = "none";
              }
            });
          },
        });

        const pdf = new jsPDF("portrait", "mm", "a4");
        const imgData = canvas.toDataURL("image/png", 0.8);
        const pdfWidth = 210;
        const pdfHeight = 297;
        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight <= pdfHeight - 20) {
          pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        } else {
          let position = 0;
          while (position < imgHeight) {
            if (position > 0) pdf.addPage();

            const remainingHeight = Math.min(
              pdfHeight - 20,
              imgHeight - position
            );
            pdf.addImage(
              imgData,
              "PNG",
              10,
              10,
              imgWidth,
              remainingHeight,
              "NONE"
            );
            position += remainingHeight;
          }
        }

        pdf.save(`${fileName}.pdf`);
        console.log("Advanced PDF generated successfully!");
      } catch (advancedError) {
        console.warn(
          "Advanced PDF generation failed, trying simple method:",
          advancedError
        );

        // Fallback: Simple text-based PDF
        const success = generateSimplePDF();
        if (!success) {
          throw new Error("Both PDF generation methods failed");
        }
        console.log("Simple PDF generated successfully!");
      }
    } catch (error) {
      console.error("All PDF generation methods failed:", error);
      alert(
        "Sorry, PDF generation failed. Please try again or check your browser settings."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
        isGenerating
          ? "bg-gray-400 cursor-not-allowed text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      <HiOutlineDownload className="w-5 h-5" />
      <span>{isGenerating ? "Generating PDF..." : buttonText}</span>
    </button>
  );
};

const GuidanceDetails = () => {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formData = location.state;
  const pageRef = useRef(null); // Add ref for PDF generation

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
    <div ref={pageRef} data-pdf-target className="bg-green-50 min-h-screen">
      {/* Header Section with Crop Image */}
      {recommendations && recommendations.crop && (
        <div className="text-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3">
                <img
                  src={getCropImage(recommendations.crop)}
                  alt={recommendations.crop}
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="lg:w-2/3 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  {recommendations.crop.charAt(0).toUpperCase() +
                    recommendations.crop.slice(1)}
                  <span className="block text-2xl lg:text-3xl font-medium mt-2 text-green-700">
                    Fertilizer Guidance
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-green-600 mb-6">
                  Professional soil analysis and personalized fertilizer
                  recommendations for optimal crop growth
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <PDFDownload
                    data={recommendations}
                    fileName={`${
                      recommendations?.crop || "fertilizer"
                    }_fertilizer_report`}
                    title="Fertilizer Report"
                    buttonText="Save Report"
                    type="fertilizer"
                    targetRef={pageRef}
                  />
                  {/* Debug button - remove in production */}
                  <button
                    onClick={() =>
                      console.log(
                        "Page ref:",
                        pageRef.current,
                        "Data:",
                        recommendations
                      )
                    }
                    className="px-4 py-2 bg-gray-500 text-white rounded text-sm"
                  >
                    Debug
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="mb-6">
              <span className="loading loading-dots loading-xl text-green-600"></span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Analyzing Your Soil Data
            </h2>
            <p className="text-gray-600">
              Getting personalized fertilizer recommendations...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Something went wrong
              </h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Data Grid Layout */}
        {recommendations && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Current Parameters */}
              {recommendations.current_parameters && (
                <DataCard
                  title="Current Soil Parameters"
                  icon={<HiBeaker className="w-6 h-6 text-blue-600" />}
                  className="lg:col-span-1"
                >
                  <ParameterItem
                    label="Nitrogen (N)"
                    value={recommendations.current_parameters.N}
                  />
                  <ParameterItem
                    label="Phosphorus (P)"
                    value={recommendations.current_parameters.P}
                  />
                  <ParameterItem
                    label="Potassium (K)"
                    value={recommendations.current_parameters.K}
                  />
                  <ParameterItem
                    label="Temperature"
                    value={recommendations.current_parameters.temperature}
                    unit="°C"
                  />
                  <ParameterItem
                    label="Humidity"
                    value={recommendations.current_parameters.humidity}
                    unit="%"
                  />
                  <ParameterItem
                    label="pH Level"
                    value={recommendations.current_parameters.ph}
                  />
                </DataCard>
              )}

              {/* Ideal Parameters */}
              {recommendations.predicted_ideal && (
                <DataCard
                  title="Recommended Ideal Levels"
                  icon={<HiCheckCircle className="w-6 h-6 text-green-600" />}
                  className="md:col-span-1"
                >
                  <ParameterItem
                    label="Nitrogen (N)"
                    value={recommendations.predicted_ideal.N}
                  />
                  <ParameterItem
                    label="Phosphorus (P)"
                    value={recommendations.predicted_ideal.P}
                  />
                  <ParameterItem
                    label="Potassium (K)"
                    value={recommendations.predicted_ideal.K}
                  />
                  <ParameterItem
                    label="Temperature"
                    value={recommendations.predicted_ideal.temperature}
                    unit="°C"
                  />
                  <ParameterItem
                    label="Humidity"
                    value={recommendations.predicted_ideal.humidity}
                    unit="%"
                  />
                  <ParameterItem
                    label="pH Level"
                    value={recommendations.predicted_ideal.ph}
                  />
                </DataCard>
              )}
            </div>

            {/* Recommendations Section */}
            {recommendations.recommendations && (
              <DataCard
                title="Fertilizer Action Plan"
                icon={<HiLightBulb className="w-6 h-6 text-orange-600" />}
                className="mb-8"
              >
                <div className="space-y-4">
                  {recommendations.recommendations.map(
                    (recommendation, index) => (
                      <RecommendationItem
                        key={index}
                        text={recommendation}
                        index={index}
                      />
                    )
                  )}
                </div>
              </DataCard>
            )}
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && !recommendations && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Data Available
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Please fill out the fertilizer guidance form to get personalized
              recommendations for your crop.
            </p>
            <a
              href="/fertilizer-guidance"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              <span>Get Started</span>
            </a>
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Safety & Guidelines
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Always follow local agricultural guidelines and consult with
            agricultural experts for best results. Test soil conditions
            regularly and adjust fertilizer application based on crop growth
            stages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidanceDetails;
