import { combineReducers } from 'redux';
import { default as stagingMarkers } from './markers';
import { default as location } from './location';
import { default as navigationState } from './navigator';

// const simple = (state = {}, action) => {
//   switch (action.type) {
//     default: return state;
//   }
// };

const mappyrApp = combineReducers({
  stagingMarkers,
  location,
  navigationState,
});

export default mappyrApp;
