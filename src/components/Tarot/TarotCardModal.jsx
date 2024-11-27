import React, { useState, useEffect } from 'react';

const TarotCardModal = ({ isOpen, closeModal, cardData }) => {
  const { name, suit, value, description_up, description_reversed, orientation } = cardData || {};

  // State for controlling the current orientation in the modal (either upright or reversed)
  const [currentOrientation, setCurrentOrientation] = useState(orientation);

  // Update the orientation state when the modal is opened and the orientation prop changes
  useEffect(() => {
    if (isOpen) {
      setCurrentOrientation(orientation);
    }
  }, [orientation, isOpen]);

  // Handle the toggle change (switch between upright/reversed)
  const toggleOrientation = (newOrientation) => {
    setCurrentOrientation(newOrientation);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-2xl mb-4">{name} Card</h2>

          <div className="mb-4">
            <p className="text-sm font-medium">Tarot Card Name: <span className="font-bold">{name}</span></p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium">Tarot Card Suit: <span className="font-bold">{suit}</span></p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium">Tarot Card Value: <span className="font-bold">{value}</span></p>
          </div>

          <div className="mb-4 flex space-x-4 justify-center">
            <button
              onClick={() => toggleOrientation(true)} // Set as upright
              className={`px-4 py-2 rounded-full ${currentOrientation ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              Upright
            </button>
            <button
              onClick={() => toggleOrientation(false)} // Set as reversed
              className={`px-4 py-2 rounded-full ${!currentOrientation ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              Reversed
            </button>
          </div>

          <div className="mb-4">
            {currentOrientation ? (
              <p className="text-sm text-gray-500">Upright description: {description_up}</p>
            ) : (
              <p className="text-sm text-gray-500">Reversed description: {description_reversed}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TarotCardModal;