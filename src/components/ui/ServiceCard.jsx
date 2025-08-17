import { Link } from "react-router-dom";
import { BarChart3, FileCheck, Zap, MessageSquare } from "lucide-react";

export function ServiceCard({ service }) {
  const getServiceIcon = (serviceId) => {
    switch (serviceId) {
      case "crop-recommendation":
        // Dashboard/Analytics icon
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h4v4H3V3zm6 0h4v4H9V3zm6 0h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9zM3 15h4v4H3v-4zm6 0h4v4H9v-4zm6 0h4v4h-4v-4z" />
            <circle cx="20" cy="4" r="2" fill="currentColor" />
          </svg>
        );
      case "fertilizer-guidance":
        // Document with shield icon
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            <polyline
              points="14,2 14,8 20,8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 12s-2-1-4 0-2 3-2 3 0 2 2 3 4 0 4 0 2-1 2-3 0-2-2-3z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );
      case "disease-detection":
        // AI/Chip icon with "AI" text
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
              fill="currentColor"
            />
            <text
              x="12"
              y="14"
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
            >
              AI
            </text>
            <circle cx="6" cy="6" r="0.5" fill="white" />
            <circle cx="18" cy="6" r="0.5" fill="white" />
            <circle cx="6" cy="18" r="0.5" fill="white" />
            <circle cx="18" cy="18" r="0.5" fill="white" />
          </svg>
        );
      case "agri-gpt":
        // Chat bubble with lines
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line
              x1="8"
              y1="12"
              x2="14"
              y2="12"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        );
      default:
        return <BarChart3 className="w-8 h-8 text-white" />;
    }
  };

  const getServiceRoute = (serviceId) => {
    switch (serviceId) {
      case "crop-recommendation":
        return "/crop-recommendation";
      case "fertilizer-guidance":
        return "/fertilizer-guidance";
      case "disease-detection":
        return "/disease-detection";
      case "agri-gpt":
        return "/agri-gpt";
      default:
        return "#";
    }
  };

  return (
    <Link to={getServiceRoute(service.id)} className="block group">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 sm:p-8 text-center transition-all duration-500 cursor-pointer min-h-[280px] sm:min-h-[320px] flex flex-col justify-center hover:scale-105 border border-white/50 overflow-hidden group-hover:bg-white/95">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-125"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-15 group-hover:opacity-30 transition-all duration-700 group-hover:scale-110"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Enhanced Icon Container */}
          <div className="relative mb-6 sm:mb-8">
            <div
              className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl mx-auto flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-3 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${service.iconColor}dd, ${service.iconColor}, ${service.iconColor}cc)`,
              }}
            >
              {/* Icon Glow Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-75"
                style={{
                  background: `linear-gradient(135deg, ${service.iconColor}88, ${service.iconColor}44)`,
                }}
              ></div>

              {/* Icon */}
              <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
                {getServiceIcon(service.id)}
              </div>

              {/* Sparkle Effect */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
            </div>

            {/* Floating Ring */}
            <div className="absolute inset-0 w-18 h-18 sm:w-24 sm:h-24 mx-auto border-2 border-green-200 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
          </div>

          {/* Enhanced Title */}
          <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 leading-tight group-hover:text-gray-900 transition-colors duration-300 relative">
            {service.title}

            {/* Title Underline Effect */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-500"></div>
          </h3>

          {/* Enhanced Description */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed px-2 group-hover:text-gray-600 transition-colors duration-300 line-clamp-3">
            {service.description}
          </p>

          {/* Action Indicator */}
          <div className="mt-4 sm:mt-6 inline-flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span>Explore Service</span>
            <svg
              className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
}
