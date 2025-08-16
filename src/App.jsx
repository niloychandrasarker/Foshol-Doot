import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerGuidance from "./pages/FertilizerGuidance";
import DiseaseDetection from "./pages/DiseaseDetection";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/fertilizer-guidance" element={<FertilizerGuidance />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
      </Routes>
    </Layout>
  );
}

export default App;
