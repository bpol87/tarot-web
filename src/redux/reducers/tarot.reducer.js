import { combineReducers } from 'redux';

const tarotDeckReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_DECK':
            return action.payload;
        case 'UNSET_DECK':
            return {}
        default:
            return state;
    }
}

export default tarotDeckReducer;