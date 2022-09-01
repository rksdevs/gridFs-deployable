import { useReducer } from "react";

import axios from "axios";
import {
  SET_LOADING,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  SET_USER,
} from "../types";
import authReducer from "./authReducer";
import authContext from "./authContext";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {
  const initialState = {
    user: {},
    isAuth: false,
    token: null,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const registerUser = async (name, email, password) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      setAuthToken(res.data.token);
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const loginUser = async (email, password) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      setAuthToken(res.data.token);
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const validateToken = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios.get("/api/auth/user");
      dispatch({ type: SET_USER, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setAuthToken(null);
  };

  return (
    <authContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        validateToken,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
