import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, RotateCcw, Camera, X, FlipHorizontal } from "lucide-react";

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // "user" for front, "environment" for back
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  // Camera Functions
  const startCamera = useCallback(async () => {
    try {
      setIsVideoReady(false);

      // First try with specific constraints
      let constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        // Fallback to basic constraints if specific ones fail
        console.log("Trying fallback camera constraints...");
        constraints = {
          video: {
            facingMode: facingMode,
          },
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setCameraStream(stream);
      setIsCameraOpen(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for video to load and be ready
        const handleVideoReady = () => {
          console.log(
            "Video ready:",
            videoRef.current.videoWidth,
            "x",
            videoRef.current.videoHeight
          );
          setIsVideoReady(true);
        };

        const handleCanPlay = () => {
          if (videoRef.current && videoRef.current.videoWidth > 0) {
            handleVideoReady();
          }
        };

        videoRef.current.onloadedmetadata = handleCanPlay;
        videoRef.current.oncanplay = handleCanPlay;

        // Start playing
        try {
          await videoRef.current.play();
          // Double check if ready after play
          if (videoRef.current.videoWidth > 0) {
            handleVideoReady();
          }
        } catch (playError) {
          console.error("Error playing video:", playError);
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      let errorMessage = "Camera access denied or not available.";
      if (error.name === "NotAllowedError") {
        errorMessage =
          "Camera permission denied. Please allow camera access and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No camera found. Please use file upload instead.";
      } else if (error.name === "NotSupportedError") {
        errorMessage =
          "Camera not supported on this device. Please use file upload.";
      }

      alert(errorMessage);
      setIsCameraOpen(false);
      setIsVideoReady(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
    setIsVideoReady(false);
  }, [cameraStream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      alert("Camera not ready. Please try again.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Multiple checks to ensure video is ready
    if (
      !isVideoReady ||
      video.videoWidth === 0 ||
      video.videoHeight === 0 ||
      video.readyState < 2
    ) {
      alert("Camera is still loading. Please wait a moment and try again.");
      return;
    }

    try {
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Clear canvas first
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Save context for transformations
      context.save();

      // Mirror the image if using front camera
      if (facingMode === "user") {
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      } else {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      // Restore context
      context.restore();

      // Convert to blob with higher quality
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 0) {
            const file = new File([blob], `plant-photo-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            setSelectedImage(file);
            setImagePreview(canvas.toDataURL("image/jpeg", 0.9));
            setResult(null);
            setProgress(0);
            stopCamera();

            // Success feedback
            console.log("Photo captured successfully:", file.size, "bytes");
          } else {
            alert("Failed to capture photo. Please try again.");
          }
        },
        "image/jpeg",
        0.9
      );
    } catch (error) {
      console.error("Error capturing photo:", error);
      alert("Error capturing photo. Please try again.");
    }
  }, [stopCamera, facingMode, isVideoReady]);

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    if (isCameraOpen) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  }, [isCameraOpen, stopCamera, startCamera]);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

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
    stopCamera();
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
            🔬 Disease Detection
          </h1>
          <p className="text-gray-600 mb-4">
            Upload a leaf image or take a photo to detect plant diseases
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Camera Tips</span>
              </div>
              <p className="text-sm text-blue-700">
                Good lighting, close-up shots, and steady hands give best
                results
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Upload Tips</span>
              </div>
              <p className="text-sm text-green-700">
                Clear, high-resolution images work best for accurate detection
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
            Capture or upload leaf image
          </h2>

          {/* Camera Section */}
          {isCameraOpen && (
            <div className="relative mb-8 bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
                style={{
                  transform: facingMode === "user" ? "scaleX(-1)" : "none",
                }}
                onLoadedMetadata={() => {
                  console.log("Video metadata loaded");
                  if (videoRef.current && videoRef.current.videoWidth > 0) {
                    setIsVideoReady(true);
                  }
                }}
                onCanPlay={() => {
                  console.log("Video can play");
                  if (videoRef.current && videoRef.current.videoWidth > 0) {
                    setIsVideoReady(true);
                  }
                }}
              />

              {/* Loading indicator */}
              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Starting camera...</p>
                    <p className="text-sm opacity-75">
                      Please allow camera access
                    </p>
                  </div>
                </div>
              )}

              {/* Video Ready Indicator */}
              {isVideoReady && (
                <div className="absolute top-2 left-2">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Camera Ready
                  </div>
                </div>
              )}

              {/* Camera Controls */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                {/* Capture Button */}
                <button
                  onClick={capturePhoto}
                  className={`w-20 h-20 rounded-full border-4 transition-all duration-200 flex items-center justify-center shadow-lg ${
                    isVideoReady
                      ? "bg-white border-gray-300 hover:border-green-500 active:scale-95 cursor-pointer"
                      : "bg-gray-300 border-gray-400 cursor-not-allowed opacity-50"
                  }`}
                  disabled={!isVideoReady}
                  title={
                    isVideoReady
                      ? "Capture Photo"
                      : "Please wait, camera is loading..."
                  }
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isVideoReady ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </button>

                {/* Switch Camera */}
                <button
                  onClick={switchCamera}
                  className={`p-4 text-white rounded-full transition-colors shadow-lg ${
                    isVideoReady
                      ? "bg-black/60 hover:bg-black/80 cursor-pointer"
                      : "bg-gray-600/60 cursor-not-allowed opacity-50"
                  }`}
                  title={isVideoReady ? "Switch Camera" : "Camera loading..."}
                  disabled={!isVideoReady}
                >
                  <FlipHorizontal className="w-6 h-6" />
                </button>

                {/* Close Camera */}
                <button
                  onClick={stopCamera}
                  className="p-4 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Close Camera"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Camera Instructions */}
              <div className="absolute top-4 left-4 right-4">
                {isVideoReady ? (
                  <div className="bg-black/70 text-white px-4 py-3 rounded-lg text-sm text-center backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg">📸</span>
                      <span className="font-medium">Ready to Capture!</span>
                    </div>
                    <p className="text-xs opacity-90">
                      Position the leaf clearly in frame and tap the green
                      capture button
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-600/80 text-white px-4 py-3 rounded-lg text-sm text-center backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="font-medium">Loading Camera...</span>
                    </div>
                    <p className="text-xs opacity-90">
                      Please wait while we initialize your camera
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image Upload/Preview Area */}
          {!isCameraOpen && (
            <div className="relative mb-8">
              <div
                className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 transition-colors ${
                  imagePreview
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 cursor-pointer hover:bg-gray-100"
                }`}
                onClick={!imagePreview ? handleUploadClick : undefined}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Selected leaf"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Ready for analysis
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      Click to upload an image
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPG up to 10MB
                    </p>
                    <div className="mt-4 text-gray-500">
                      <span className="text-lg">📱</span> or use camera below
                    </div>
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
          )}

          {/* Action Buttons */}
          {!isCameraOpen && (
            <div className="space-y-4">
              {/* Camera Status Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-700 mb-2">
                  📱 <strong>Camera Tips:</strong> Allow camera permission when
                  prompted
                </p>
                <p className="text-xs text-blue-600">
                  Works best with good lighting and steady hands
                </p>
              </div>

              <div className="flex justify-center gap-4">
                {/* Upload Button */}
                <button
                  onClick={handleUploadClick}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  <Upload className="w-5 h-5" />
                  Upload Photo
                </button>

                {/* Camera Button */}
                <button
                  onClick={startCamera}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                  <Camera className="w-5 h-5" />
                  Open Camera
                </button>

                {/* Retake Button (if image exists) */}
                {selectedImage && (
                  <button
                    onClick={handleRetake}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Retake
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Hidden Canvas for Photo Capture */}
          <canvas ref={canvasRef} className="hidden" />

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
