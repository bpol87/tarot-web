import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TarotCard from "./TarotCard";

export default function Tarot5Spread() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DECK" });
  }, [dispatch]);

  const deck = useSelector((store) => store.tarot.deck);

  const [currentDeck, setCurrentDeck] = useState([...deck]);
  const [drawnCards, setDrawnCards] = useState([]); 
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const drawSpread = () => {
    setIsDrawing(true);
    const drawCards = async () => {
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (currentDeck.length > 0) {
          const randomIndex = Math.floor(Math.random() * currentDeck.length);
          const selectedCard = currentDeck[randomIndex];
          const orientation = Math.random() < 0.5;

          setDrawnCards((prevDrawnCards) => [
            ...prevDrawnCards,
            { drawnCard: selectedCard, orientation: orientation },
          ]);

          setCurrentDeck(currentDeck.filter((_, index) => index !== randomIndex));
          setCurrentStep((prevStep) => prevStep + 1);
        }
      }
    };

    drawCards();
  };

  useEffect(() => {
    if (currentStep === 5) {
      dispatch({
        type: "SAVE_FIVE_TAROT_SPREAD",
        payload: drawnCards.map((card) => ({
          id: card.drawnCard.id,
          orientation: card.orientation,
        })),
      });
    }
  }, [currentStep, drawnCards, dispatch]);

  const resetSpread = () => {
    setCurrentDeck([...deck]);
    setDrawnCards([]);
    setCurrentStep(0);
    setIsDrawing(false);
  };

  return (
    <div className="text-center py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">5-Card Draw</h1>
      <div>
        {currentStep < 3 ? (
          <button
            onClick={drawSpread}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            {isDrawing ? "Drawing Cards..." : "Draw Spread"}
          </button>
        ) : (
          <>
            <button
              onClick={resetSpread}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Reset Spread
            </button>
          </>
        )}
        <h2 className="text-xl font-semibold mb-4">Drawn Cards:</h2>
        <div className="grid grid-cols-5 gap-8">
          {/* Render all drawn cards in 3 distinct columns */}
          {drawnCards.map((card, index) => (
            <div key={index} className="w-full">
              <TarotCard
                card={card.drawnCard}
                orientation={card.orientation}
                spread={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
