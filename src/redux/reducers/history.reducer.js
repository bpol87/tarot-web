import { combineReducers } from "redux";

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

  const history = combineReducers({
    threeHistory
  })

  export default history;