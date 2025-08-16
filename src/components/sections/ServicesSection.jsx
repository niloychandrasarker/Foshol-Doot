import { ServiceCard } from "../ui/ServiceCard";

// Services data
const SERVICES = [
  {
    id: "crop-recommendation",
    title: "Crop Recommendation",
    description:
      "Get personalized crop suggestions based on your soil and climate conditions.",
    iconColor: "#4caf50",
  },
  {
    id: "fertilizer-guidance",
    title: "Fertilizer Guidance",
    description:
      "Receive expert advice on the right fertilizers for your crops.",
    iconColor: "#2196f3",
  },
  {
    id: "disease-detection",
    title: "Disease Detection",
    description:
      "Early detection and treatment recommendations for crop diseases.",
    iconColor: "#ff9800",
  },
  {
    id: "agri-gpt",
    title: "AgriGPT Assistant",
    description:
      "Get instant answers to your farming questions with AI assistance.",
    iconColor: "#9c27b0",
  },
];

export function ServicesSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          Our Service/Heading2
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Services Grid - Left Side */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Features Text - Right Side */}
          <div className="flex-1 max-w-md">
            <h3 className="text-2xl font-bold text-black mb-4">
              These features will help the farmer
            </h3>
            <p className="text-gray-600">
              lore lloraa llorepsum loream in ndkj
              <br />
              lorekoelo loremsum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
