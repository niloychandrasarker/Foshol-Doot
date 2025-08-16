import React from "react";
import SlidingCards from "../components/SlidingCards";

const CardsDemo: React.FC = () => {
  const farmingCards = [
    {
      id: 1,
      title: "Crop Monitoring",
      content:
        "Monitor your crops with advanced sensors and get real-time updates about soil moisture and plant health.",
      image: "/images/crop-monitoring.jpg",
    },
    {
      id: 2,
      title: "Weather Forecast",
      content:
        "Get accurate weather predictions to plan your farming activities and protect your crops.",
      image: "/images/weather.jpg",
    },
    {
      id: 3,
      title: "Irrigation Management",
      content:
        "Optimize water usage with smart irrigation systems that respond to soil and weather conditions.",
      image: "/images/irrigation.jpg",
    },
    {
      id: 4,
      title: "Pest Control",
      content:
        "Early detection and prevention of pest infestations to protect your harvest.",
      image: "/images/pest-control.jpg",
    },
  ];

  return (
    <div className="cards-demo-page">
      <h1>Farming Assistant Features</h1>
      <SlidingCards cards={farmingCards} autoSlide={true} slideDelay={1500} />
    </div>
  );
};

export default CardsDemo;
