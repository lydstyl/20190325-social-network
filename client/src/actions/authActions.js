// import { TEST_DISPATCH } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  // plus simple qu'une fonction dans une fonction
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        // on appelle dispatch au lieu de return car ajax async
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        // on appelle dispatch au lieu de return car ajax async
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from ls
  localStorage.removeItem("jwtToken");
  // Remove auth header
  setAuthToken(false);
  // Set current user to {} wich will set isAutheticated to false
  dispatch(setCurrentUser({}));
};
