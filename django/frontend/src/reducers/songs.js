import _ from 'lodash';
import { GET_SONGS,ADD_SONG, GET_SONG,DELETE_SONG, EDIT_SONG } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };

    case GET_SONG: 
    case ADD_SONG: // added
    return {
    ...state,
    [action.payload.id]: action.payload
    };
    case DELETE_SONG: // added
      return _.omit(state, action.payload);
    case EDIT_SONG: // added
    return {
    ...state,
    [action.payload.id]: action.payload
    };


    default:
      return state;
  }
};


