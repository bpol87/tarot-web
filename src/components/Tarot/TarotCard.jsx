export default function TarotCard(props) {
  const card = props.card;
  return (
    <div className="border rounded-md p-4">
      <p className="text-3xl">{card.name}</p>
      <p>
        {card.suit} {card.value}
      </p>
      <p>{card.description}</p>
    </div>
  );
}
