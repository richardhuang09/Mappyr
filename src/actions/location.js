import * as types from '../constants/ActionTypes';

export function changeLocation(position) {
  return {
    type: types.CHANGE_USER_LOCATION,
    location: position,
  };
}
