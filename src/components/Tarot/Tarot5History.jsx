import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Tarot5History() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fiveHistory = useSelector((store) => store.history.fiveHistory) || [];

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "FETCH_FIVE_HISTORY" });

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
      return "Upright";
    } else if (o === false) {
      return "Reversed";
    }
  };

  const deleteSpread = (id) => {
    dispatch({ type: "DELETE_FIVE_SPREAD_HISTORY", payload: id });
  };

  return (
    <div className="flex flex-col align-middle items-center w-11/12">
      <h1 className="text-center text-lg font-bold mb-4">5-Spread History</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : fiveHistory.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">Date</th>
              <th className="text-center p-2">Card One</th>
              <th className="text-center p-2">Card Two</th>
              <th className="text-center p-2">Card Three</th>
              <th className="text-center p-2">Card Four</th>
              <th className="text-center p-2">Card Five</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fiveHistory.map((el, index) => (
              <tr
                key={el.spread_id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 whitespace-nowrap">
                  {formatDate(el.date_spread_drawn)}
                </td>
                <td className="p-2 text-center">
                  {el.card_one_name} –{" "}
                  {formatOrientation(el.card_one_orientation)}
                </td>
                <td className="p-2 text-center">
                  {el.card_two_name} –{" "}
                  {formatOrientation(el.card_two_orientation)}
                </td>
                <td className="p-2 text-center">
                  {el.card_three_name} –{" "}
                  {formatOrientation(el.card_three_orientation)}
                </td>
                <td className="p-2 text-center">
                  {el.card_four_name} –{" "}
                  {formatOrientation(el.card_four_orientation)}
                </td>
                <td className="p-2 text-center">
                  {el.card_five_name} –{" "}
                  {formatOrientation(el.card_five_orientation)}
                </td>
                <td className="p-2">
                  <button
                    className="justify-center bg-red-600 px-4 py-1 rounded-full"
                    onClick={() => deleteSpread(el.spread_id)}
                  >
                    <TrashIcon className="w-6 text-white" />
                  </button>
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
