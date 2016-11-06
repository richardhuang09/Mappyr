import * as types from '../constants/ActionTypes';


let nextMarkerKey = 0;
export function addMarker(text, coordinate) {
  return {
    type: types.ADD_MARKER,
    key: nextMarkerKey += 1,
    text,
    coordinate,
  }
};
