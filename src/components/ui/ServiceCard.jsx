import { Link } from "react-router-dom";

export function ServiceCard({ service }) {
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
    <Link to={getServiceRoute(service.id)} className="block">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
        <div className="p-0">
          <div
            className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: service.iconColor }}
          >
            <div className="w-8 h-8 bg-white rounded opacity-80"></div>
          </div>
          <h3 className="font-semibold text-black mb-2">{service.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
