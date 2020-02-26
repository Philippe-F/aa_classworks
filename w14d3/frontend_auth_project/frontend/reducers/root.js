import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import session_reducer from './session_reducer'; 

export default combineReducers({
  entities: entitiesReducer,
  session: session_reducer
});
