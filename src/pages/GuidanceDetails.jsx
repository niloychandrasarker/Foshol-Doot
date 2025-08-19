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
// html2canvas is no longer used for PDF export
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
  // Use imported images for better reliability in PDF generation
  const crop = cropName?.toLowerCase();
  return cropImg[crop] || `/CropsImage/${crop}.jpg`;
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
    <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <span className="font-medium text-gray-700">{label}:</span>
      <div className="flex items-center">
        <span className="font-bold text-gray-900 text-lg">{value}</span>
        {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
      </div>
    </div>
  );
};

// Recommendation Item Component
const RecommendationItem = ({ text, index }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
        {index + 1}
      </div>
      <div className="flex-1">
        <p className="text-gray-800 leading-relaxed">{text}</p>
      </div>
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

// PDF Download Component with structured jsPDF rendering (no screenshots)
const PDFDownload = ({
  data,
  fileName,
  title,
  buttonText,
  type,
  targetRef,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper: load an image URL and return a dataURL for jsPDF
  const loadImageAsDataURL = (src) =>
    new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const url = canvas.toDataURL("image/jpeg", 0.92);
          resolve(url);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });

  const formatValue = (v) => {
    if (v === null || v === undefined) return "-";
    if (typeof v === "number") {
      const isInt = Number.isInteger(v);
      return isInt ? String(v) : v.toFixed(2);
    }
    return String(v);
  };

  const generatePageCapturePDF = async () => {
    try {
      if (!data) throw new Error("No data to export");

      // Setup document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20; // 20mm margins as requested
      const contentWidth = pageWidth - margin * 2;
      const gutter = 8;
      const line = 6; // base line height

      doc.setFont("helvetica", "normal");
      doc.setTextColor(33, 37, 41);

      let y = margin;

      // Utility: ensure there is room, otherwise add page
      const ensureSpace = (needed) => {
        if (y + needed > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      };

      // Utility: section title
      const sectionTitle = (text) => {
        ensureSpace(14);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(text, margin, y);
        y += 5;
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
        doc.setFont("helvetica", "normal");
      };

      // Title/Header area with optional crop image
      const cropName = (data?.crop || "Crop").toString();
      const headerImgW = 50;
      const headerImgH = 35;
      const leftColWidth = contentWidth - headerImgW - gutter;
      const imageUrl = await loadImageAsDataURL(getCropImage(data?.crop));

      // Title badge
      doc.setFontSize(11);
      doc.setTextColor(22, 101, 52); // green-800
      doc.text("Professional Analysis Report", margin, y);
      y += 8;

      // Main title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(17, 24, 39); // gray-900
      doc.text(cropName.charAt(0).toUpperCase() + cropName.slice(1), margin, y);
      y += 9;

      // Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(55, 65, 81); // gray-700
      doc.text("Fertilizer Guidance", margin, y);

      // Right image
      if (imageUrl) {
        doc.addImage(
          imageUrl,
          "JPEG",
          pageWidth - margin - headerImgW,
          y - 20, // align visually mid of title
          headerImgW,
          headerImgH,
          undefined,
          "FAST"
        );
      }

      y += 10;
      doc.setFontSize(11);
      doc.setTextColor(75, 85, 99); // gray-600
      const intro =
        "Professional soil analysis and personalized fertilizer recommendations for optimal crop growth and maximum yield";
      const introLines = doc.splitTextToSize(intro, leftColWidth);
      introLines.forEach((lineText) => {
        ensureSpace(line);
        doc.text(lineText, margin, y);
        y += line;
      });

      // Divider
      ensureSpace(6);
      doc.setDrawColor(229, 231, 235);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // Current Parameters Cards Section
      sectionTitle("Current Soil Parameters Overview");

      const current = data?.current_parameters || {};
      const ideal = data?.predicted_ideal || {};
      const parameterCards = [
        {
          label: "Nitrogen (N)",
          value: formatValue(current.N),
          target: formatValue(ideal.N) || "50",
          color: [59, 130, 246],
        }, // blue
        {
          label: "Phosphorus (P)",
          value: formatValue(current.P),
          target: formatValue(ideal.P) || "50",
          color: [147, 51, 234],
        }, // purple
        {
          label: "Potassium (K)",
          value: formatValue(current.K),
          target: formatValue(ideal.K) || "50",
          color: [34, 197, 94],
        }, // green
        {
          label: "Temperature",
          value: `${formatValue(current.temperature)}°C`,
          target: `${formatValue(ideal.temperature) || "25"}°C`,
          color: [249, 115, 22],
        }, // orange
        {
          label: "Humidity",
          value: `${formatValue(current.humidity)}%`,
          target: `${formatValue(ideal.humidity) || "70"}%`,
          color: [6, 182, 212],
        }, // cyan
        {
          label: "pH Level",
          value: formatValue(current.ph),
          target: formatValue(ideal.ph) || "7.0",
          color: [99, 102, 241],
        }, // indigo
      ];

      // Draw parameter cards in a 3x2 grid
      const cardWidth = (contentWidth - gutter * 2) / 3;
      const cardHeight = 25;
      const cardSpacing = 4;

      parameterCards.forEach((param, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const cardX = margin + col * (cardWidth + gutter);
        const cardY = y + row * (cardHeight + cardSpacing);

        ensureSpace(cardHeight + cardSpacing);

        // Card background
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, "F");

        // Border and accent
        doc.setDrawColor(229, 231, 235);
        doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, "S");

        // Left accent bar
        doc.setFillColor(...param.color);
        doc.rect(cardX, cardY, 2, cardHeight, "F");

        // Parameter name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(55, 65, 81);
        doc.text(param.label, cardX + 4, cardY + 8);

        // Target value (top right)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...param.color);
        doc.text(`Target: ${param.target}`, cardX + cardWidth - 4, cardY + 6, {
          align: "right",
        });

        // Parameter value
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(17, 24, 39);
        doc.text(param.value, cardX + 4, cardY + 18);

        // Progress indicator (simple visual)
        const progressWidth = cardWidth - 8;
        const progressHeight = 2;
        const progressY = cardY + cardHeight - 4;

        // Background bar
        doc.setFillColor(229, 231, 235);
        doc.rect(cardX + 4, progressY, progressWidth, progressHeight, "F");

        // Progress bar (simplified - showing relative values)
        let progressPercent = 0.7; // Default 70%
        if (
          param.label.includes("Nitrogen") ||
          param.label.includes("Phosphorus") ||
          param.label.includes("Potassium")
        ) {
          progressPercent = Math.min(parseFloat(param.value) / 50, 1);
        } else if (param.label.includes("Humidity")) {
          progressPercent = Math.min(parseFloat(param.value) / 100, 1);
        } else if (param.label.includes("pH")) {
          progressPercent = Math.min(parseFloat(param.value) / 10, 1);
        } else if (param.label.includes("Temperature")) {
          progressPercent = Math.min(parseFloat(param.value) / 35, 1);
        }

        doc.setFillColor(...param.color);
        doc.rect(
          cardX + 4,
          progressY,
          progressWidth * progressPercent,
          progressHeight,
          "F"
        );
      });

      y +=
        Math.ceil(parameterCards.length / 3) * (cardHeight + cardSpacing) + 8;

      // Soil Analysis Overview (two-column cards)
      sectionTitle("Detailed Soil Analysis");

      const leftColX = margin;
      const rightColX = margin + (contentWidth - gutter) / 2 + gutter;
      const colW = (contentWidth - gutter) / 2;
      const headerH = 10;
      const rowH = 8;
      const currentRows = [
        ["Nitrogen (N)", formatValue(current.N)],
        ["Phosphorus (P)", formatValue(current.P)],
        ["Potassium (K)", formatValue(current.K)],
        ["Temperature", `${formatValue(current.temperature)}°C`],
        ["Humidity", `${formatValue(current.humidity)}%`],
        ["pH Level", formatValue(current.ph)],
      ];
      const idealRows = [
        ["Nitrogen (N)", formatValue(ideal.N)],
        ["Phosphorus (P)", formatValue(ideal.P)],
        ["Potassium (K)", formatValue(ideal.K)],
        ["Temperature", `${formatValue(ideal.temperature)}°C`],
        ["Humidity", `${formatValue(ideal.humidity)}%`],
        ["pH Level", formatValue(ideal.ph)],
      ];

      const tableHeight = headerH + currentRows.length * rowH + 6;
      ensureSpace(tableHeight);

      const drawTableCard = (x, heading, rows, accentRGB = [59, 130, 246]) => {
        // Outer card
        doc.setDrawColor(229, 231, 235);
        doc.roundedRect(x, y, colW, tableHeight, 3, 3, "S");
        // Header background
        doc.setFillColor(249, 250, 251); // gray-50
        doc.rect(x, y, colW, headerH, "F");
        // Accent bar
        doc.setDrawColor(...accentRGB);
        doc.setLineWidth(0.6);
        doc.line(x, y + headerH, x + colW, y + headerH);
        doc.setLineWidth(0.2);
        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(31, 41, 55);
        doc.text(heading, x + 4, y + headerH - 3);
        // Rows
        doc.setFont("helvetica", "normal");
        doc.setTextColor(55, 65, 81);
        let ry = y + headerH + 4;
        rows.forEach(([label, value], idx) => {
          // Alternating background
          if (idx % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(x + 3, ry - 6, colW - 6, rowH, "F");
          }
          // Labels & values
          doc.text(label, x + 6, ry);
          doc.setTextColor(17, 24, 39);
          doc.text(String(value), x + colW - 6, ry, { align: "right" });
          doc.setTextColor(55, 65, 81);
          ry += rowH;
        });
      };

      // Draw left and right tables
      drawTableCard(
        leftColX,
        "Current Soil Parameters",
        currentRows,
        [59, 130, 246]
      );
      drawTableCard(
        rightColX,
        "Recommended Ideal Levels",
        idealRows,
        [34, 197, 94]
      );
      y += tableHeight + 10;

      // Fertilizer Action Plan - Start on new page
      if (Array.isArray(data?.recommendations) && data.recommendations.length) {
        // Force new page for Fertilizer Action Plan
        doc.addPage();
        y = margin;

        sectionTitle("Fertilizer Action Plan");

        const list = data.recommendations;
        doc.setFontSize(11);
        doc.setTextColor(31, 41, 55);

        // Left-side subtitle using the first item
        const planColW = (contentWidth - gutter) / 2;
        if (list.length > 0) {
          const subPad = 3.5;
          const subLines = doc.splitTextToSize(
            String(list[0]),
            planColW - subPad * 2
          );
          const subH = subLines.length * line + subPad * 2;

          ensureSpace(subH + 2);
          // Card on left only
          doc.setDrawColor(219, 234, 254); // blue-100 border
          doc.setFillColor(239, 246, 255); // blue-50
          doc.roundedRect(margin, y, planColW, subH, 2, 2, "FD");

          // Subtitle heading
          doc.setFont("helvetica", "bold");
          doc.setTextColor(30, 64, 175); // blue-800
          doc.setFontSize(12);
          doc.text("Key Step", margin + subPad, y + subPad + 3.5);

          // Subtitle text
          doc.setFont("helvetica", "italic");
          doc.setFontSize(11);
          doc.setTextColor(31, 41, 55);
          let sY = y + subPad + 3.5 + 5;
          subLines.forEach((t) => {
            doc.text(t, margin + subPad, sY, {
              maxWidth: planColW - subPad * 2,
            });
            sY += line;
          });

          // move y below the subtitle block
          y += subH + 6;
        }

        // Remaining items as numbered boxes starting from 2
        list.slice(1).forEach((item, idx) => {
          const displayIdx = idx + 2;
          const boxPadding = 3.5;
          const maxTextWidth = contentWidth - boxPadding * 2 - 8; // space for bullet
          const lines = doc.splitTextToSize(String(item), maxTextWidth);
          const boxH = lines.length * line + boxPadding * 2;

          ensureSpace(boxH + 2);

          // Box
          doc.setDrawColor(209, 250, 229); // green-100 border tint
          doc.setFillColor(250, 250, 250);
          doc.roundedRect(margin, y, contentWidth, boxH, 2, 2, "S");

          // Number circle
          const cy = y + boxPadding + line - 2;
          doc.setFillColor(34, 197, 94); // green-500
          doc.circle(margin + 5, cy, 3, "F");
          doc.setTextColor(255, 255, 255);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.text(String(displayIdx), margin + 5, cy + 1.5, {
            align: "center",
          });

          // Text
          doc.setTextColor(31, 41, 55);
          doc.setFont("helvetica", "normal");
          let ty = y + boxPadding + line - 1;
          lines.forEach((t) => {
            doc.text(t, margin + 12, ty);
            ty += line;
          });

          y += boxH + 4;
        });
      }

      // Add extra spacing before Quick Summary
      y += 12;

      // Quick Summary
      sectionTitle("Quick Summary");
      const summary = `Follow these ${
        data?.recommendations?.length || 0
      } recommendations in sequence for best results. Monitor soil conditions regularly and adjust applications as needed.`;
      const summaryLines = doc.splitTextToSize(summary, contentWidth - 6);
      const sumH = summaryLines.length * line + 6;
      ensureSpace(sumH + 2);
      doc.setFillColor(239, 246, 255); // blue-50
      doc.roundedRect(margin, y, contentWidth, sumH, 2, 2, "F");
      doc.setTextColor(30, 64, 175); // blue-800
      let sy = y + 4.5;
      summaryLines.forEach((t) => {
        doc.text(t, margin + 3, sy);
        sy += line;
      });
      y += sumH + 8;

      // Footer: Safety & Guidelines
      sectionTitle("Safety & Guidelines");
      doc.setTextColor(55, 65, 81);
      const bulletsLeft = [
        "Follow local agricultural guidelines",
        "Test soil conditions regularly",
        "Apply fertilizers during appropriate seasons",
      ];
      const bulletsRight = [
        "Consult agricultural experts for complex issues",
        "Monitor crop growth stages",
        "Adjust based on weather conditions",
      ];

      const colW2 = (contentWidth - gutter) / 2;
      const drawBullets = (x, items) => {
        items.forEach((b) => {
          const lines = doc.splitTextToSize(b, colW2 - 6);
          const h = lines.length * line + 2;
          ensureSpace(h);
          // bullet dot
          doc.setFillColor(34, 197, 94);
          doc.circle(x, y - 1.5, 1.2, "F");
          // text
          let ly = y;
          lines.forEach((t) => {
            doc.text(t, x + 4, ly);
            ly += line;
          });
          y = Math.max(y, ly);
        });
      };

      const startY = y;
      drawBullets(margin + 1, bulletsLeft);
      y = startY; // reset to align top of right column
      drawBullets(margin + colW2 + gutter + 1, bulletsRight);

      // Final spacer
      y += 6;

      // Metadata & save
      doc.setProperties({
        title: `${data?.crop || "Fertilizer"} Report`,
        subject: "Fertilizer Guidance Report",
        author: "Farming Assistant",
        creator: "Farming Assistant - Professional Fertilizer Guidance",
      });

      doc.save(`${fileName || "fertilizer_report"}.pdf`);
      return true;
    } catch (error) {
      console.error("Structured PDF generation failed:", error);
      throw error;
    }
  };

  const handleDownload = async () => {
    if (!data) {
      alert(
        "No data available to generate PDF. Please wait for the data to load."
      );
      return;
    }

    setIsGenerating(true);
    try {
      const success = await generatePageCapturePDF();
      if (success) {
        // no-op
      }
    } catch (error) {
      alert(`Sorry, PDF generation failed: ${error.message}`);
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
    <div
      ref={pageRef}
      data-pdf-target
      className="bg-green-50 min-h-screen"
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#000",
      }}
    >
      {/* Header Section with Crop Image */}
      {recommendations && recommendations.crop && (
        <div className="">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Crop Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <img
                    src={getCropImage(recommendations.crop)}
                    alt={recommendations.crop}
                    className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                  Professional Analysis Report
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  {recommendations.crop.charAt(0).toUpperCase() +
                    recommendations.crop.slice(1)}
                  <span className="block text-xl lg:text-2xl font-medium mt-2 text-green-600">
                    Fertilizer Guidance
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Professional soil analysis and personalized fertilizer
                  recommendations for optimal crop growth and maximum yield
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <PDFDownload
                    data={recommendations}
                    fileName={`${
                      recommendations?.crop || "fertilizer"
                    }_fertilizer_report`}
                    title="Fertilizer Report"
                    buttonText="Download Report"
                    type="fertilizer"
                    targetRef={pageRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Parameters Cards Section */}
      {/* Current Parameters Cards Section */}
      {recommendations && recommendations.current_parameters && (
        <div className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Current Soil Parameters
              </h2>
              <p className="text-gray-600">
                Real-time analysis of your soil conditions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Nitrogen Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">N</span>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    Target: 50
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {recommendations.current_parameters.N}
                </div>
                <div className="text-xs text-gray-500 mb-2">Nitrogen</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (recommendations.current_parameters.N / 50) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Phosphorus Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-purple-500 p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">P</span>
                  </div>
                  <div className="text-xs text-purple-600 font-medium">
                    Target: 50
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {recommendations.current_parameters.P}
                </div>
                <div className="text-xs text-gray-500 mb-2">Phosphorus</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (recommendations.current_parameters.P / 50) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Potassium Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">K</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Target: 50
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {recommendations.current_parameters.K}
                </div>
                <div className="text-xs text-gray-500 mb-2">Potassium</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (recommendations.current_parameters.K / 50) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Temperature Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-orange-500 p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-xs">
                      🌡️
                    </span>
                  </div>
                  <div className="text-xs text-orange-600 font-medium">
                    Ideal
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {recommendations.current_parameters.temperature}°
                </div>
                <div className="text-xs text-gray-500 mb-2">Temperature</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (recommendations.current_parameters.temperature / 35) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Humidity Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-cyan-500 p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-cyan-600 font-bold text-xs">💧</span>
                  </div>
                  <div className="text-xs text-cyan-600 font-medium">
                    Target: 70%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {recommendations.current_parameters.humidity}%
                </div>
                <div className="text-xs text-gray-500 mb-2">Humidity</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (recommendations.current_parameters.humidity / 100) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* pH Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-indigo-500 p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-xs">
                      pH
                    </span>
                  </div>
                  <div className="text-xs text-indigo-600 font-medium">
                    Target: 7.0
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {recommendations.current_parameters.ph}
                </div>
                <div className="text-xs text-gray-500 mb-2">pH Level</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (recommendations.current_parameters.ph / 10) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-pulse">
                <HiBeaker className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex justify-center space-x-1 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analyzing Your Soil Data
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Our AI is processing your soil parameters and generating
              personalized fertilizer recommendations...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-red-700 mb-6 max-w-md mx-auto">{error}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  <span className="mr-2">🔄</span>
                  Try Again
                </button>
                <a
                  href="/fertilizer-guidance"
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  <span className="mr-2">←</span>
                  Go Back
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Data Grid Layout */}
        {recommendations && (
          <div className="space-y-8">
            {/* Parameters Comparison Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Soil Analysis Overview
                </h2>
                <p className="text-gray-600">
                  Compare your current soil parameters with recommended levels
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Parameters */}
                {recommendations.current_parameters && (
                  <DataCard
                    title="Current Soil Parameters"
                    icon={<HiBeaker className="w-6 h-6 text-blue-600" />}
                    className="border-blue-200 hover:border-blue-300"
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
                    className="border-green-200 hover:border-green-300"
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
            </div>

            {/* Recommendations Section */}
            {recommendations.recommendations && (
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg border border-orange-200 p-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <HiLightBulb className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Fertilizer Action Plan
                  </h2>
                  <p className="text-gray-600">
                    Step-by-step recommendations to optimize your soil health
                  </p>
                </div>

                {/* First item as left-side subtitle card */}
                {recommendations.recommendations[0] && (
                  <div className="max-w-4xl mx-auto mb-4">
                    <div className="w-full">
                      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50">
                        <div className="text-sm font-semibold text-blue-800 mb-1">
                          Key Step
                        </div>
                        <div className="text-gray-800 italic">
                          {recommendations.recommendations[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 max-w-4xl mx-auto">
                  {recommendations.recommendations
                    .slice(1)
                    .map((recommendation, index) => (
                      <RecommendationItem
                        key={index + 1}
                        text={recommendation}
                        index={index} // start numbering from 1
                      />
                    ))}
                </div>

                {/* Action Summary */}
                <div className="mt-8 p-4 bg-white/70 rounded-xl border border-orange-200">
                  <div className="flex items-center mb-2">
                    <HiCheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">
                      Quick Summary
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Follow these {recommendations.recommendations.length}{" "}
                    recommendations in sequence for best results. Monitor soil
                    conditions regularly and adjust applications as needed.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && !recommendations && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <span className="text-4xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Data Available
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Please fill out the fertilizer guidance form to get personalized
                recommendations for your crop and soil conditions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/fertilizer-guidance"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
              >
                <span>🌱</span>
                <span>Get Started</span>
              </a>
              <a
                href="/"
                className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                <span>🏠</span>
                <span>Go Home</span>
              </a>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center  mt-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Safety & Guidelines
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left ">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Best Practices
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Follow local agricultural guidelines</li>
                  <li>• Test soil conditions regularly</li>
                  <li>• Apply fertilizers during appropriate seasons</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Expert Consultation
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Consult agricultural experts for complex issues</li>
                  <li>• Monitor crop growth stages</li>
                  <li>• Adjust applications based on weather conditions</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                💡 Pro Tip: Keep a record of your fertilizer applications and
                soil test results for future reference
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceDetails;
