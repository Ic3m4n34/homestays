import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_HOMESTAY,
    HOMESTAY_ERROR,
    CLEAR_HOMESTAY,
    GET_HOMESTAYS
} from './types';

//Get Current Homestay data
export const getCurrentHomestay = () => async dispatch => {
    try{
        const res = await axios.get('/api/homestay/me');

        console.log('api/homestay/me res value for axios ', res);
        dispatch ({
            type: GET_HOMESTAY,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: HOMESTAY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status    }
        });
    }
};
// Get all homestays
export const getHomestays = () => async dispatch => {
  console.log('action');
  dispatch({ type: CLEAR_HOMESTAY });

  try {
    const res = await axios.get('/api/homestay');

    dispatch({
      type: GET_HOMESTAYS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: HOMESTAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status    }
    });
  }
};

// Get homestay by ID
export const getHomestayById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/homestay/user/${userId}`);
    dispatch({
      type: GET_HOMESTAY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: HOMESTAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Create or update profile
export const createHomestay = (
    formData,
    history,
    edit = false
  ) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post('/api/homestay', formData, config);
      console.log('inside createHomestay action and value of res is ', res);

      dispatch({
        type: GET_HOMESTAY,
        payload: res.data
      });

      dispatch(setAlert(edit ? 'Homestay Updated' : 'Homestay Created', 'success'));

      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: HOMESTAY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };