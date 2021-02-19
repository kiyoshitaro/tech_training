import axios from 'axios';
import { GET_SONGS, ADD_SONG,GET_SONG, DELETE_SONG, EDIT_SONG } from './types';
import history from '../history'; // added


// GET TODOS
export const getSongs = () => async dispatch => {
  const res = await axios.get('/music/songs/');
  dispatch({
    type: GET_SONGS,
    payload: res.data
  });
};


import { reset } from 'redux-form'; // added

// ADD SONG
export const addSong = formValues => async dispatch => {
  const res = await axios.post('/music/songs/', { ...formValues });
  console.log(formValues)
  dispatch({
    type: ADD_SONG,
    payload: res.data
  });
  dispatch(reset('songForm'));
};

export const getSong = id => async dispatch => { // added
  const res = await axios.get(`/music/songs/${id}/`);
  dispatch({
    type: GET_SONG,
    payload: res.data
  });
};

export const deleteSong = id => async dispatch => { // added
  await axios.delete(`/music/songs/${id}/`);
  dispatch({
    type: DELETE_SONG,
    payload: id
  });
  history.push('/');
}

export const editSong = (id, formValues) => async dispatch => {
  const res = await axios.patch(`/music/songs/${id}/`, formValues);
  dispatch({
    type: EDIT_SONG,
    payload: res.data
  });
  history.push('/react');
};
