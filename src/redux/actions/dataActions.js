import {
  SET_SCREAM,
  SET_SCREAMS,
  GET_SCREAMS,
  LOADING_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from "../types";
import axios from "axios";

export const getAllScreams = () => async dispatch => {
  try {
    dispatch({ type: LOADING_SCREAMS });
    const res = await axios.get(
      "https://asia-east2-socialapp-17669.cloudfunctions.net/api/screams"
    );
    if (res) {
      dispatch({ type: { type: SET_SCREAMS, payload: res.data } });
    }
  } catch (error) {
    dispatch({ type: { type: SET_SCREAMS, payload: [] } });
  }
};
export const getScream = screamId => async dispatch => {
  try {
    dispatch({ type: LOADING_SCREAMS });
    const res = await axios.get(
      `https://asia-east2-socialapp-17669.cloudfunctions.net/api/screams/${screamId}`
    );
    if (res) {
      dispatch({ type: { type: SET_SCREAMS, payload: res.data } });
    }
  } catch (error) {
    dispatch({ type: { type: SET_SCREAMS, payload: [] } });
  }
};
export const likeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(
      `https://asia-east2-socialapp-17669.cloudfunctions.net/api/screams/${screamId}/like`
    );
    if (res) {
      dispatch({ type: LIKE_SCREAM, payload: { updatedScream: res.data } });
    }
  } catch (error) {
    console.log(error);
  }
};
export const unLikeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(
      `https://asia-east2-socialapp-17669.cloudfunctions.net/api/screams/${screamId}/unlike`
    );
    if (res) {
      dispatch({ type: UNLIKE_SCREAM, payload: res.data });
    }
  } catch (error) {
    console.log(error);
  }
};
