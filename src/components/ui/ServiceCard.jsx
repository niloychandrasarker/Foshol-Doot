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
      <div className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300 cursor-pointer min-h-[240px] flex flex-col justify-center hover:scale-105 border border-gray-100">
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
            style={{
              backgroundColor: service.iconColor,
              background: `linear-gradient(135deg, ${service.iconColor}, ${service.iconColor}dd)`,
            }}
          >
            {getServiceIcon(service.id)}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-4 leading-tight group-hover:text-gray-900 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed px-2 group-hover:text-gray-600 transition-colors">
            {service.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
