import * as types from '../constants/ActionTypes';

const marker = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_MARKER:
      return {
        key: action.key,
        title: action.text,
        coordinate: action.coordinate,
        upvotes: 0,
        downvotes: 0,
      };

    default:
      return state;
  }
};

const stagingMarkers = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MARKER:
      return [
        ...state,
        marker({}, action),
      ];
    default:
      return state;
  }
};

export default stagingMarkers;
