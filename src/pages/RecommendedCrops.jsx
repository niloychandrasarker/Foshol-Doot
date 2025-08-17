import img2 from "../../public/img2.jpg";
import img3 from "../../public/img3.jpg";
import img1 from "../../public/img1.jpg";
import { LuBadgeCheck } from "react-icons/lu";

const cropsData = [
  {
    id: 1,
    name: "Rice",
    score: 85,
    imageAlt: "Rice crop",
    imageUrl: img1,
  },
  {
    id: 2,
    name: "Wheat",
    score: 85,
    imageAlt: "Wheat crop",
    imageUrl: img2,
  },
  {
    id: 3,
    name: "Potatoes",
    score: 85,
    imageAlt: "Potato crop",
    imageUrl: img3,
  },
  {
    id: 4,
    name: "Carrots",
    score: 85,
    imageAlt: "Carrot crop",
    imageUrl: img2,
  },
  {
    id: 5,
    name: "Corn",
    score: 85,
    imageAlt: "Corn crop",
    imageUrl: img1,
  },
  {
    id: 6,
    name: "Millet",
    score: 85,
    imageAlt: "Millet crop",
    imageUrl: img3,
  },
];

//--> Reusable Crop Card Component
const CropCard = ({ name, score, imageAlt, imageUrl }) => {
  return (
    <div className="bg-green-200 rounded-2xl shadow-lg transition duration-300 transform scale-100 hover:scale-105">
      <div className="pb-3">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 px-3">{name}</h3>
      <p className="text-gray-700 text-sm px-3 py-2">Crop suitability score</p>
      <div className="flex items-center justify-between p-3 pb-3">
        <span className="text-gray-900 font-semibold">{score}% match</span>
        <div className="rounded-full flex items-center justify-center">
          <LuBadgeCheck className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const Test = () => {
  return (
    <div className="bg-green-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 p-3 md:p-6">
          List of Recommended Crops
        </h1>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-6">
          {cropsData.map((crop) => (
            <CropCard
              key={crop.id}
              name={crop.name}
              score={crop.score}
              imageAlt={crop.imageAlt}
              imageUrl={crop.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;
