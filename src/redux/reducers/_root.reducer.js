import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import deck from './tarot.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  deck,
});

export default rootReducer;
