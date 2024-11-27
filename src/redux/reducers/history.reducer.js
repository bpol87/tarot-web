import { combineReducers } from "redux";

// Reducer for three-history
const threeHistory = (state = [], action) => {
    switch (action.type) {
      case "SET_THREE_HISTORY":
        return action.payload;
      case "UNSET_THREE_HISTORY":
        return [];
      default:
        return state;
    }
};

// Reducer for five-history
const fiveHistory = (state = [], action) => {
    switch (action.type) {
      case "SET_FIVE_HISTORY":
        return action.payload;
      case "UNSET_FIVE_HISTORY":
        return [];
      default:
        return state;
    }
};

const history = combineReducers({
  threeHistory,
  fiveHistory,
});

export default history;
