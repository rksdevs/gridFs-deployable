import {
  SET_LOADING,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  SET_USER,
  LOGOUT,
} from "../types";
export default function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
      };

    case SET_USER:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: localStorage.getItem("jwt"),
        user: payload.info,
      };
    case LOGOUT: {
      return {
        ...state,
        user: {},
        isAuth: false,
        token: null,
      };
    }
    default:
      return state;
  }
}
