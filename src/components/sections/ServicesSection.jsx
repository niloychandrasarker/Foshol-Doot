import { ServiceCard } from "../ui/ServiceCard";

// Services data matching the image
const SERVICES = [
  {
    id: "crop-recommendation",
    title: "Crop Recommendation",
    description: "help you to know Diseases in your crop",
    iconColor: "#B8860B", // Golden brown color as shown in image
  },
  {
    id: "fertilizer-guidance",
    title: "Fertilizer Guidance",
    description: "help you to know Diseases in your crop",
    iconColor: "#4caf50", // Green color as shown in image
  },
  {
    id: "disease-detection",
    title: "Disease Detection",
    description: "help you to know Diseases in your crop",
    iconColor: "#4caf50", // Green color as shown in image
  },
  {
    id: "agri-gpt",
    title: "AgriGPT",
    description: "AI-powered chatbot for instant farming advice and solutions",
    iconColor: "#B8860B", // Golden brown color as shown in image
  },
];

export function ServicesSection() {
  return (
    <section className="px-6 py-16 bg-gradient-to-br from-green-100 to-green-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-black text-center mb-16">
          Our Service/Heading2
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Services Grid - Left Side */}
          <div className="flex-1 max-w-2xl">
            <div className="grid grid-cols-2 gap-8">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  className={`${
                    index === 0
                      ? "translate-y-0"
                      : index === 1
                      ? "translate-y-8"
                      : index === 2
                      ? "translate-y-4"
                      : "translate-y-12"
                  }`}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Features Text - Right Side */}
          <div className="flex-1 max-w-md mt-12 lg:mt-24">
            <h3 className="text-4xl font-bold text-black mb-6 leading-tight">
              These features will help the farmer
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              lore lloraa llorepsum loream in ndkj
              <br />
              lorekoelo loremsum
            </p>

            {/* Decorative element */}
            <div className="mt-8">
              <div className="w-24 h-24 rounded-full bg-yellow-200 opacity-60 ml-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
