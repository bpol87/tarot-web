import React, { useState } from "react";
import Tarot3Spread from "./Tarot3Spread";

export default function TarotSpread() {
  const [selectedSpread, setSelectedSpread] = useState(null);


  const setDisplay = (type) => {
    setSelectedSpread(type);
  };

  const renderSpread = () => {
    switch (selectedSpread) {
      case "three":
        return <Tarot3Spread />;
      default:
        return <p>Select a spread.</p>;
    }
  };

  return (
    <div className="text-center py-10 bg-gray-100 min-h-screen">
      <div>
        <button 
        className="px-4 py-2 bg-blue-700 text-blue-50 rounded-full"
        onClick={() => setDisplay('three')}>
          3 Card Spread
        </button>
      </div>
      <div className="spread-display mt-4">{renderSpread()}</div>
    </div>
  );
}
