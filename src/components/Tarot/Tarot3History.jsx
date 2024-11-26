import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Tarot3History() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const threeHistory = useSelector((store) => store.history.threeHistory) || [];

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "FETCH_THREE_HISTORY" });

    const fetchComplete = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(fetchComplete);
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZoneName: "short",
    }).format(new Date(date));
  };

  const formatOrientation = (o) => {
    if (o === true) {
        return "Upright"
    } else if(o === false) {
        return "Reversed"
    }
  }

  return (
    <div className="flex flex-col align-middle w-full">
      <h1 className="text-center text-lg font-bold mb-4">3-Spread History</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : threeHistory.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">Date</th>
              <th className="text-center p-2">Card One</th>
              <th className="text-center p-2">Card Two</th>
              <th className="text-center p-2">Card Three</th>
            </tr>
          </thead>
          <tbody>
            {threeHistory.map((el, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 whitespace-nowrap">{formatDate(el.date_spread_drawn)}</td>
                <td className="p-2 text-center">
                  {el.card_one_name} – {formatOrientation(el.card_one_orientation)}
                </td>
                <td className="p-2 text-center">
                {el.card_two_name} – {formatOrientation(el.card_two_orientation)}
                </td>
                <td className="p-2 text-center">
                  {el.card_three_name} – {formatOrientation(el.card_three_orientation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No History to Display</p>
      )}
    </div>
  );
}

