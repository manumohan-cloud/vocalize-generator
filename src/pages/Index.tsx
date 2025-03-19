
import React from "react";
import ElevenLabsGenerator from "../components/ElevenLabsGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Vocalize Generator
      </h1>
      <ElevenLabsGenerator />
    </div>
  );
};

export default Index;
