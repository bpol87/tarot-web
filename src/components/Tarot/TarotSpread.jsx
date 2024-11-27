import React, { useState } from "react";
import Tarot3Spread from "./Tarot3Spread";
import Tarot5Spread from "./Tarot5Spread";

export default function TarotSpread() {
  const [selectedSpread, setSelectedSpread] = useState(null);

  const setDisplay = (type) => {
    setSelectedSpread(type);
  };

  const renderSpread = () => {
    switch (selectedSpread) {
      case "three":
        return <Tarot3Spread />;
        case "five":
          return <Tarot5Spread />;
      default:
        return <p>Select a spread.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="flex flex-row gap-6">
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded-full"
          onClick={() => setDisplay("three")}
        >
          3 Card Spread
        </button>
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded-full"
          onClick={() => setDisplay("five")}
        >
          5 Card Spread
        </button>
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded-full"
          onClick={() => setDisplay("cross")}
        >
          Celtic Cross Spread
        </button>
      </div>
      <div className="w-full flex justify-center">{renderSpread()}</div>
    </div>
  );
}
