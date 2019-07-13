import {
  SET_AUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from "../types";

const initialState = {
  authenticated: false,
  profile: {},
  likes: [],
  notifications: [],
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_USER:
      console.log(action.payload);
      return {
        authenticated: true,
        ...action.payload,
        loading: false
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case SET_ERRORS:
      return initialState;
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            handle: state.profile.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        )
      };
    default:
      return state;
  }
};
