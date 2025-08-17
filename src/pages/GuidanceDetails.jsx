import img4 from "../../public/img4.jpg";
import { HiOutlineDownload } from "react-icons/hi";

//--> Data for the Fertilizer and Timeline sections
const fertilizerData = {
  title: "Urea Fertilizer",
  description: "Nitrogen-rich for leafy growth",
  quantity: "20 kg/ha",
  n_content: "10%",
  p_content: "10%",
  k_content: "10%",
  imageAlt: "Fertilizer application",
  imageUrl: img4,
};

const timelineData = {
  title: "Application Schedule",
  description: "Each step shows: Date/Days + Quantity + Action",
  steps: [
    "Apply 20 kg/ha at planting",
    "Apply 15 kg/ha after 30 days",
    "Apply 10 kg/ha before flowering",
  ],
  imageAlt: "Application timeline",
  imageUrl: img4,
};

const InfoCard = ({ title, description, imageAlt, imageUrl, children }) => {
  return (
    <div className="bg-green-200 rounded-2xl shadow-lg flex flex-col md:flex-row transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border hover:border-green-500">
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none md:border-r  border-green-500"
        />
      </div>
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="space-y-2 text-gray-800">{children}</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-800 font-semibold cursor-pointer hover:underline hover:text-red-600">
            Save for Later
          </span>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-xl flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110">
            <HiOutlineDownload className="w-6 h-6 text-white hover:text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GuidanceDetails = () => {
  return (
    <div className="bg-green-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Selected crop name
        </h1>

        {/* Fertilizer Type Section */}
        <div className="mb-6 md:mb-8">
          <div className="inline-block border-2 border-green-500 rounded-xl px-4 py-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Fertilizer Type</h2>
          </div>
          <InfoCard
            title={fertilizerData.title}
            description={fertilizerData.description}
            imageUrl={fertilizerData.imageUrl}
            imageAlt={fertilizerData.imageAlt}
          >
            <p>
              <strong>Quantity:</strong> {fertilizerData.quantity}
            </p>
            <p>
              <strong>N = </strong>
              {fertilizerData.n_content}
            </p>
            <p>
              <strong>P = </strong>
              {fertilizerData.p_content}
            </p>
            <p>
              <strong>K = </strong>
              {fertilizerData.k_content}
            </p>
          </InfoCard>
        </div>

        {/* Timeline Section */}
        <div className="mb-6 md:mb-8">
          <div className="inline-block border-2 border-green-500 rounded-xl px-4 py-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Timeline</h2>
          </div>
          <InfoCard
            title={timelineData.title}
            description={timelineData.description}
            imageUrl={timelineData.imageUrl}
            imageAlt={timelineData.imageAlt}
          >
            {timelineData.steps.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </InfoCard>
        </div>

        {/* Safety & Guidelines Section */}
        <div className="text-center p-3">
          <h2 className="text-2xl md:text-3xl font-bold cursor-pointer text-gray-800 hover:underline hover:text-red-500">
            Safety & Guidelines
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GuidanceDetails;
