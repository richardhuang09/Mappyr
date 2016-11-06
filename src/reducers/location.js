import * as types from '../constants/ActionTypes';
import * as mapConstants from '../constants/MapConstants';

const initialPosition = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: mapConstants.LATITUDE_DELTA,
  longitudeDelta: mapConstants.LONGITUDE_DELTA,
};

const location = (state = initialPosition, action = {}) => {
  switch (action.type) {
    case types.CHANGE_USER_LOCATION:
      return action.location;
    default:
      return state;
  }
};

export default location;
