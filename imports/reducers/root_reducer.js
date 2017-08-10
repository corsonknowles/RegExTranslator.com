import { combineReducers } from 'redux';
import SrlReducer from './srl_reducer';
import RegexReducer from './regex_reducer';
import RegexsReducer from './regexs_reducer';

export default combineReducers({
  srl: SrlReducer,
  regex: RegexReducer,
  regexs: RegexsReducer
});
