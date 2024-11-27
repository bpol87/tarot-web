import React, { useState } from 'react';
import TarotCardModal from './TarotCardModal';

export default function TarotCard(props) {
  const { card, orientation, spread } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card, orientation) => {
    setSelectedCard({ ...card, orientation });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const spread_description = (card, spread, orientation) => {
    if (!spread) {
      return <p className="text-sm md:text-base">{card.description_up}</p>;
    } else {
      return (
        <>
          <p className="text-sm md:text-base py-2">
            {orientation ? "Upright" : "Reversed"}
          </p>
          <p className="text-xs md:text-base py-2 hidden sm:block">
            {orientation ? card.description_up : card.description_reversed}
          </p>
        </>
      );
    }
  };

  return (
    <div>
      <div
        className="flex flex-col text-center border border-black p-4 w-[80%] sm:w-[250px] md:w-[300px] min-h-[150px] sm:min-h-[200px] md:min-h-[350px] rounded-xl shadow-lg space-y-2"
        onClick={() => openModal(card, orientation)}
      >
        <p className="text-sm sm:text-xl md:text-2xl py-1">{card.name}</p>
        {spread_description(card, spread, orientation)}
      </div>

      {/* Modal Component */}
      <TarotCardModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        cardData={selectedCard}
      />
    </div>
  );
}

