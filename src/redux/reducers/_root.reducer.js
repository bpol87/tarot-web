import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import tarot from './tarot.reducer';
import history from './history.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  tarot,
  history
});

export default rootReducer;
