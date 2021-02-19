import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import songs from './songs';

export default combineReducers({
  form: formReducer,
  songs
});
