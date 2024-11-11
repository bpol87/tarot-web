import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TarotCard from "./TarotCard";

export default function TarotDeck() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DECK" });
  }, []);
  const deck = useSelector((store) => store.deck);
  return (
    <div>
      <p>This is the Tarot Deck</p>
      <div className="flex flex-wrap gap-8">
        {deck.length > 0
          ? deck.map((card) => {
              return <TarotCard key={card.id} card={card} />;
            })
          : ""}
      </div>
    </div>
  );
}
