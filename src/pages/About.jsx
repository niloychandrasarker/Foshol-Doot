import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-green-700">
        About Foshol Doot
      </h1>
      <p className="mb-4 text-lg text-gray-700">
        <strong>Foshol Doot</strong> is an innovative platform designed to
        empower farmers and agricultural stakeholders with AI-driven guidance,
        crop recommendations, disease detection, and fertilizer advice. Our
        mission is to bridge the gap between technology and agriculture, making
        modern solutions accessible to everyone in the farming community.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">
        Key Features
      </h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6">
        <li>
          AI-powered crop recommendations based on soil, weather, and region.
        </li>
        <li>Instant disease detection using image analysis.</li>
        <li>Personalized fertilizer guidance for optimal yield.</li>
        <li>Modern, user-friendly interface for all devices.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">
        Our Vision
      </h2>
      <p className="mb-4 text-gray-700">
        We envision a future where every farmer has access to the latest
        agricultural technology, enabling sustainable and profitable farming
        practices. Foshol Doot is committed to continuous innovation and support
        for the agricultural community.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">
        Meet the Team
      </h2>
      <p className="mb-4 text-gray-700">
        Our team consists of passionate technologists, agronomists, and
        designers dedicated to making a positive impact in agriculture. We
        believe in collaboration, innovation, and the power of technology to
        transform lives.
      </p>
      <p className="text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Foshol Doot. All rights reserved.
      </p>
    </div>
  );
};

export default About;
