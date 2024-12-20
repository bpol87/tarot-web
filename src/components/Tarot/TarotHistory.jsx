import React, { useState } from "react";
import Tarot3History from "./Tarot3History";
import Tarot5History from "./Tarot5History";

export default function TarotHistory() {
  const [selectedSpread, setSelectedSpread] = useState(null);

  const setDisplay = (type) => {
    setSelectedSpread(type);
  };

  const renderSpread = () => {
    switch (selectedSpread) {
      case "three":
        return <Tarot3History />;
        case "five":
        return <Tarot5History />;
      default:
        return <p>Select a spread to view its history.</p>;
    }
  };

  return (
    <div className="text-center min-h-screen">
      <h1>Tarot History</h1>
      <div>
        <button 
        className="px-4 py-2 bg-blue-700 text-blue-50 rounded-full"
        onClick={() => setDisplay("three")}>3-Spread</button>
        <button 
        className="px-4 py-2 bg-blue-700 text-blue-50 rounded-full"
        onClick={() => setDisplay("five")}>5-Spread</button>
      </div>
      <div className="flex spread-display mt-4 items-center justify-center">{renderSpread()}</div>
    </div>
  );
}