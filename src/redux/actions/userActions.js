import {
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post(
      "https://asia-east2-socialapp-17669.cloudfunctions.net/api/login",
      userData
    );
    setAuthToken(res.data.token);
    dispatch(getUser());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const signupUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post(
      "https://asia-east2-socialapp-17669.cloudfunctions.net/api/signup",
      userData
    );

    setAuthToken(res.data.token);
    dispatch(getUser());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    console.log(error.response.data);
    if (error.response.code === "auth/weak-password") {
    }
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getUser = () => async dispatch => {
  try {
    dispatch({ type: LOADING_USER });
    const res = await axios.get(
      "https://asia-east2-socialapp-17669.cloudfunctions.net/api/user"
    );
    dispatch({ type: SET_USER, payload: res.data.userData });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
const setAuthToken = token => {
  localStorage.setItem("token", `Bearer ${token}`);
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
};
export const logout = () => async dispatch => {
  console.log("logout");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = "/login";
};
export const uploadImage = formData => async dispatch => {
  try {
    dispatch({ type: LOADING_USER });
    await axios.post(
      "https://asia-east2-socialapp-17669.cloudfunctions.net/api/user/image",
      formData
    );
    dispatch(getUser());
  } catch (error) {
    console.log(error);
  }
};
export const addUserDetails = userDetails => async dispatch => {
  try {
    dispatch({ type: LOADING_USER });
    await axios.post(
      "https://asia-east2-socialapp-17669.cloudfunctions.net/api/user/",
      userDetails
    );
    dispatch(getUser());
    console.log(userDetails.website);
  } catch (error) {
    console.log(error);
  }
};
