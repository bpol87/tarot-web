import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchDeck() {
  try {
    const response = yield axios.get("/api/tarot");
    const deck = response.data;
    yield put({ type: "SET_DECK", payload: deck });
  } catch (error) {
    console.log("Error fetching deck:", error);
  }
}

function* addTarot3Spread(action) {
  try {
    const data = action.payload;
    const spreadData = {
      card_one: data[0].id,
      card_one_orientation: data[0].orientation,
      card_two: data[1].id,
      card_two_orientation: data[1].orientation,
      card_three: data[2].id,
      card_three_orientation: data[2].orientation,
    };

    yield axios.post("/api/tarot/3-spread", spreadData);
  } catch (error) {
    console.log("Error adding spread to history", error);
  }
}

function* addTarot5Spread(action) {
  try {
    const data = action.payload;
    const spreadData = {
      card_one: data[0].id,
      card_one_orientation: data[0].orientation,
      card_two: data[1].id,
      card_two_orientation: data[1].orientation,
      card_three: data[2].id,
      card_three_orientation: data[2].orientation,
      card_four: data[3].id,
      card_four_orientation: data[3].orientation,
      card_five: data[4].id,
      card_five_orientation: data[4].orientation,
    };

    yield axios.post("/api/tarot/5-spread", spreadData);
  } catch (error) {
    console.log("Error adding 5-spread to history", error);
  }
}

function* fetchThreeHistory() {
  try {
    const response = yield axios.get("/api/tarot/3-history/");
    console.log("response is:", response);
    yield put({ type: "SET_THREE_HISTORY", payload: response.data });
  } catch (error) {
    console.log("Error fetching 3-spread history", error);
  }
}

function* fetchFiveHistory() {
  try {
    const response = yield axios.get("/api/tarot/5-history/");
    console.log("response is:", response);
    yield put({ type: "SET_FIVE_HISTORY", payload: response.data });
  } catch (error) {
    console.log("Error fetching 5-spread history", error);
  }
}

function* delete3History(action) {
  try {
    yield axios.delete(`/api/tarot/delete/three/${action.payload}`);
    yield put({ type: "FETCH_THREE_HISTORY" });
  } catch (error) {
    console.log(`Error deleting history item: ${action.payload}`, error);
  }
}

function* delete5History(action) {
    try {
      yield axios.delete(`/api/tarot/delete/five/${action.payload}`);
      yield put({ type: "FETCH_FIVE_HISTORY" });
    } catch (error) {
      console.log(`Error deleting history item: ${action.payload}`, error);
    }
  }

function* tarotSaga() {
  yield takeLatest("FETCH_DECK", fetchDeck);
  yield takeLatest("SAVE_THREE_TAROT_SPREAD", addTarot3Spread);
  yield takeLatest("SAVE_FIVE_TAROT_SPREAD", addTarot5Spread); // New action for 5-spread
  yield takeLatest("FETCH_THREE_HISTORY", fetchThreeHistory);
  yield takeLatest("FETCH_FIVE_HISTORY", fetchFiveHistory); // New action for 5-history
  yield takeLatest("DELETE_THREE_SPREAD_HISTORY", delete3History);
  yield takeLatest("DELETE_FIVE_SPREAD_HISTORY", delete5History);
}

export default tarotSaga;
