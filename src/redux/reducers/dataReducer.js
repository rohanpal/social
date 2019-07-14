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
      console.log(payload.screamId);
      let index = state.screams.findIndex(scream => {
        console.log(payload.screamId);
        return scream.screamId === payload.screamId;
      });
      console.log(index);
      let updatedScreams = [...state.screams];
      updatedScreams[index] = payload;

      return {
        ...state,
        screams: updatedScreams
      };
    default:
      return state;
  }
};
