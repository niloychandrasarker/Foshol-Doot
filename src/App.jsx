import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerGuidance from "./pages/FertilizerGuidance";
import DiseaseDetection from "./pages/DiseaseDetection";
import AgriGPT from "./pages/AgriGPT";

import RecommendedCrops from "./pages/RecommendedCrops";
import GuidanceDetails from "./pages/GuidanceDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/recommended-crops" element={<RecommendedCrops />} />

        <Route path="/fertilizer-guidance" element={<FertilizerGuidance />} />
        <Route path="/guidance-details" element={<GuidanceDetails />} />

        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/agri-gpt" element={<AgriGPT />} />
      </Routes>
    </Layout>
  );
}

export default App;
