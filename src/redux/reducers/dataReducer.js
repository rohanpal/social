import {
  SET_SCREAM,
  SET_SCREAMS,
  GET_SCREAMS,
  LOADING_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SCREAMS:
      return {
        ...state,
        screams: payload,
        loading: false
      };
    case LOADING_SCREAMS:
      return { ...state, loading: true };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === payload.screamId
      );
      let updatedScreams = [...state.screams];
      updatedScreams[index] = payload.data;
      return {
        ...state,
        screams: updatedScreams
      };
    default:
      return state;
  }
};
