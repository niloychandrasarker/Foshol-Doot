import { useState, useRef } from "react";
import { Upload, RotateCcw } from "lucide-react";

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setProgress(0);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 76) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setResult({
            disease: "Detected disease",
            confidence: 76,
          });
          return 76;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleRetake = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setProgress(0);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#e3f6e4] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Disease Detection
          </h1>
          <p className="text-gray-600">
            Upload a leaf image to detect plant diseases
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
            Capture or upload leaf image
          </h2>

          {/* Image Upload Area */}
          <div className="relative mb-8">
            <div
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleUploadClick}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected leaf"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Click to upload an image</p>
                  <p className="text-sm text-gray-400 mt-2">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleUploadClick}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload
            </button>

            {selectedImage && (
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Retake
              </button>
            )}
          </div>

          {/* Analyze Button */}
          {selectedImage && !result && !isAnalyzing && (
            <div className="text-center mb-8">
              <button
                onClick={handleAnalyze}
                className="px-8 py-3 bg-[#4caf50] text-white font-semibold rounded-lg hover:bg-[#45a049] transition-colors"
              >
                Analyze Image
              </button>
            </div>
          )}

          {/* Result Button */}
          {result && (
            <div className="text-center mb-8">
              <button className="px-8 py-3 bg-[#4caf50] text-white font-semibold rounded-lg flex items-center gap-2 mx-auto">
                <span className="w-5 h-5 text-white">🔍</span>
                Detected disease
              </button>
            </div>
          )}

          {/* Progress Bar */}
          {(isAnalyzing || result) && (
            <div className="text-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-[#4caf50] h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-[#4caf50] font-medium">
                {progress}% completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
