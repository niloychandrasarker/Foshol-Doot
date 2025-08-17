import img5 from "../../public/img5.jpg";
import { FaAngleRight } from "react-icons/fa6";
import { FaMagic } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";

//--> Data for the disease cards
const diseasesData = [
  {
    id: 1,
    name: "Rust",
    description: "Treatment recommendations (organic + chemical)",
    imageAlt: "Rust disease on crop leaves",
    imageUrl: img5,
  },
  {
    id: 2,
    name: "Leaf Blight",
    description: "Treatment recommendations (organic + chemical)",
    imageAlt: "Leaf blight on crop leaves",
    imageUrl: img5,
  },
  {
    id: 3,
    name: "Powdery Mildew",
    description: "Treatment recommendations (organic + chemical)",
    imageAlt: "Powdery mildew on crop leaves",
    imageUrl: img5,
  },
  {
    id: 4,
    name: "Downy Mildew",
    description: "Treatment recommendations (organic + chemical)",
    imageAlt: "Downy mildew on crop leaves",
    imageUrl: img5,
  },
];

//--> Reusable Disease Card Component
const DiseaseCard = ({ name, description, imageAlt, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 flex-shrink-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-48 sm:h-full object-cover rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl"
          />
        </div>
        <div className="flex-1 bg-green-200 p-4 md:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-700 text-md mb-4">{description}</p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white pl-4 pr-2 py-2 rounded-full font-medium text-md flex items-center gap-4 self-start transition-colors duration-200 cursor-pointer">
            Read More
            <FaAngleRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Test3 = () => {
  return (
    <div className="bg-green-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Diseases in your crop
          </h1>
          <div className="max-w-6xl h-[2px] bg-gray-400 mx-auto rounded-full"></div>
        </div>

        {/* Disease Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-12">
          {diseasesData.map((disease) => (
            <DiseaseCard
              key={disease.id}
              name={disease.name}
              description={disease.description}
              imageAlt={disease.imageAlt}
              imageUrl={disease.imageUrl}
            />
          ))}
        </div>

        {/* AI Chat Button */}
        <div className="text-center">
          <button className="bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-3xl font-semibold text-base md:text-lg flex flex-col sm:flex-row items-center justify-center gap-2 mx-auto cursor-pointer transition-colors duration-200 shadow-lg hover:shadow-xl">
            <div className="px-2 rounded-lg">
              <FaMagic className="w-6 h-6" />
            </div>
            Directly chat with AI for solution
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test3;
