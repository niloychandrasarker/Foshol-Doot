import { useState } from "react";
import jsPDF from "jspdf";
import { HiOutlineDownload } from "react-icons/hi";

const PDFDownload = ({
  data,
  fileName = "report",
  title = "Report",
  buttonText = "Download PDF",
  className = "",
  type = "fertilizer",
}) => {
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!data) {
      alert("No data available for PDF generation");
      return;
    }

    setDownloading(true);

    try {
      const pdf = new jsPDF();

      // Add header
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.text("AgriGPT Fertilizer Report", 20, 30);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text("Professional Soil Analysis & Recommendations", 20, 45);
      pdf.line(20, 50, 190, 50);

      let yPosition = 65;

      // Generate content based on type
      if (type === "fertilizer" && data) {
        // Crop name
        if (data.crop) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(16);
          pdf.text(`Crop: ${data.crop.toUpperCase()}`, 20, yPosition);
          yPosition += 15;
        }

        // Current Parameters
        if (data.current_parameters) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.text("Current Soil Parameters", 20, yPosition);
          yPosition += 10;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);

          Object.keys(data.current_parameters).forEach((key) => {
            pdf.text(
              `${key.toUpperCase()}: ${data.current_parameters[key]}`,
              25,
              yPosition
            );
            yPosition += 8;
          });
          yPosition += 10;
        }

        // Predicted Ideal Parameters
        if (data.predicted_ideal) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.text("Recommended Ideal Levels", 20, yPosition);
          yPosition += 10;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);

          Object.keys(data.predicted_ideal).forEach((key) => {
            pdf.text(
              `${key.toUpperCase()}: ${data.predicted_ideal[key]}`,
              25,
              yPosition
            );
            yPosition += 8;
          });
          yPosition += 10;
        }

        // Recommendations
        if (data.recommendations && Array.isArray(data.recommendations)) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.text("Fertilizer Action Plan", 20, yPosition);
          yPosition += 10;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);

          data.recommendations.forEach((rec, index) => {
            if (yPosition > 250) {
              pdf.addPage();
              yPosition = 30;
            }

            const wrappedText = pdf.splitTextToSize(
              `${index + 1}. ${rec}`,
              170
            );
            pdf.text(wrappedText, 25, yPosition);
            yPosition += wrappedText.length * 6 + 5;
          });
        }
      } else if (type === "crop" && data) {
        // Handle crop recommendation data structure
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("Crop Recommendations", 20, yPosition);
        yPosition += 15;

        if (data.crops && Array.isArray(data.crops)) {
          data.crops.forEach((crop, index) => {
            if (yPosition > 250) {
              pdf.addPage();
              yPosition = 30;
            }
            pdf.text(
              `${index + 1}. ${crop.name} - Probability: ${crop.probability}%`,
              25,
              yPosition
            );
            yPosition += 8;
          });
        }
      } else {
        // Generic fallback
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text("Report data:", 20, yPosition);
        yPosition += 10;

        const dataStr = JSON.stringify(data, null, 2);
        const lines = dataStr.split("\n").slice(0, 20);
        lines.forEach((line) => {
          if (yPosition > 280) {
            pdf.addPage();
            yPosition = 30;
          }
          pdf.setFontSize(8);
          pdf.text(line.substring(0, 100), 20, yPosition);
          yPosition += 6;
        });
      }

      // Footer
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = 30;
      }

      yPosition += 20;
      pdf.line(20, yPosition, 190, yPosition);
      yPosition += 10;

      pdf.setFontSize(8);
      pdf.text(
        `Report generated on ${new Date().toLocaleDateString()}`,
        20,
        yPosition
      );
      pdf.text("AgriGPT - Agricultural Intelligence System", 20, yPosition + 8);

      // Download
      const finalFileName = `${fileName}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(finalFileName);

      alert("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(`Error generating PDF: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={downloading || !data}
      className={`flex items-center space-x-2 bg-green-200 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <HiOutlineDownload
        className={`w-5 h-5 ${downloading ? "animate-bounce" : ""}`}
      />
      <span>{downloading ? "Generating PDF..." : buttonText}</span>
    </button>
  );
};

export default PDFDownload;
