import { combineReducers } from 'redux';
import SrlReducer from './srl_reducer';
import RegexReducer from './regex_reducer';

export default combineReducers({
  srlInput: SrlReducer,
  regexInput: RegexReducer
});
