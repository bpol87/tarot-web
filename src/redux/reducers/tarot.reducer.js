import { combineReducers } from "redux";

const deck = (state = {}, action) => {
  switch (action.type) {
    case "SET_DECK":
      return action.payload;
    case "UNSET_DECK":
      return {};
    default:
      return state;
  }
};

const tarot = combineReducers({
    deck
})

    export default tarot;
