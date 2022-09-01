import { createContext } from "react";

const authContext = createContext({
  user: {},
  isAuth: false,
  token: null,
  isLoading: false,
});

//pending, resolved, rejected - status to be added for better application

export default authContext;
