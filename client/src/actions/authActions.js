// import { TEST_DISPATCH } from "./types";
import { GET_ERRORS } from "./types";
import axios from "axios";

// Register User

// export const registerUser = userData => {
//   return {
//     type: TEST_DISPATCH,
//     payload: userData
//   };
// };

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
