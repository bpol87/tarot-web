import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TarotCard from "./TarotCard";

export default function Tarot3Spread() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "FETCH_DECK"})
    }, [dispatch])
    const deck = useSelector((store) => store.tarot.deck);



  const [currentDeck, setCurrentDeck] = useState([...deck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const drawNextCard = () => {
    if (currentStep < 3 && currentDeck.length > 0) {

      const randomIndex = Math.floor(Math.random() * currentDeck.length);
      const selectedCard = currentDeck[randomIndex];

      // Randomly assign orientation (true = Upright, false = Reversed)
      const orientation = Math.random() < 0.5;

      const updatedDrawnCards = [
        ...drawnCards,
        { drawnCard: selectedCard, orientation: orientation },
      ];
      setDrawnCards(updatedDrawnCards);

      setCurrentDeck(currentDeck.filter((_, index) => index !== randomIndex));

      setCurrentStep(currentStep + 1);

      if (currentStep === 2) {
        dispatch({
          type: "SAVE_TAROT_SPREAD",
          payload: updatedDrawnCards.map((card) => ({
            id: card.drawnCard.id,
            orientation: card.orientation,
          })),
        });
      }
    }
  };

  const resetSpread = () => {
    setCurrentDeck([...deck]);
    setDrawnCards([]);
    setCurrentStep(0);
  };

  return (
    <div className="text-center py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tarot Card Draw</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Drawn Cards:</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {drawnCards.length > 0 &&
            drawnCards.map((card, index) => (
              <TarotCard
                key={index}
                card={card.drawnCard}
                orientation={card.orientation}
                spread={true}
              />
            ))}
        </div>
      </div>
      {currentStep < 3 ? (
        <button
          onClick={drawNextCard}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          {currentStep === 0 ? "Start 3-card Spread" : "Next Card"}
        </button>
      ) : (
        <>
          <p className="mt-6 text-lg font-medium">All cards have been drawn!</p>
          <button
            onClick={resetSpread}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Reset Spread
          </button>
        </>
      )}
    </div>
  );
}


