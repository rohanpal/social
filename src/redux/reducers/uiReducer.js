import { CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from "../types";

const initialState = {
  errors: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case CLEAR_ERRORS:
      return initialState;
    case LOADING_UI:
      return { ...state, loading: true };

    default:
      return state;
  }
};
