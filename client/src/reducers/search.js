import {  SEARCH_SUCCESS, SEARCH_FAILURE } from "../actions/types";
const initialState = {
    search: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SEARCH_SUCCESS:
        return {
          ...state,
          loading: false,
          search: payload
        };
      case SEARCH_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload
        };
      default:
        return state;
    }
    
  };