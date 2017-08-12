import { combineReducers } from 'redux';
import chat from './chat';
import nav from './nav';

export default combineReducers({
  chat,
  nav
});
