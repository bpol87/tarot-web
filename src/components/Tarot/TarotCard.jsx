export default function TarotCard(props) {
  const { card, orientation, spread } = props;

  const spread_description = (card, spread, orientation) => {
    if (!spread) {
      return <p>{card.description_up}</p>;
    } else {
      return (
        <>
          <p>{orientation ? "Upright" : "Reversed"}</p>
          <p>{orientation ? card.description_up : card.description_reversed}</p>
        </>
      );
    }
  };

  return (
    <div className="border rounded-md p-4 max-w-52">
      <p className="text-3xl">{card.name}</p>
      <p>
        {card.suit} {card.value}
      </p>
      {spread_description(card, spread, orientation)}
    </div>
  );
}

