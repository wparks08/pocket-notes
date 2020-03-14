import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";

import { GET_ERRORS, USER_LOADING, SET_CURRENT_USER } from "./types";

export const registerUser = (newUser, history) => dispatch => {
    axios
        .post("/registerUser", newUser)
        //redirects to login upon registration here
        .then(res => history.push("/loginUser"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const loginUser = sensitiveData => dispatch => {
    axios
        .post("/loginUser", sensitiveData)
        .then(res => {
            //saves and sets token to local storage
            const { token } = res.data;
            localStorage.setItem("JwtToken", token);
            setAuthToken(token);
            const decoded = jwtDecode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
export const logoutUser = () => dispatch => {
    localStorage.removeItem("JwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
