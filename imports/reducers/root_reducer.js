import { combineReducers } from 'redux';
import SrlReducer from './srl_reducer';

export default combineReducers({
  srl: SrlReducer
});
