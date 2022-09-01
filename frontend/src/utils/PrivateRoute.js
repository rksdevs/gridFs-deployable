import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import authContext from "../Context/Auth/authContext";

const PrivateRoute = ({ Component }) => {
  const { isAuth, loading } = useContext(authContext);
  return loading ? (
    <Spinner />
  ) : isAuth ? (
    <Component />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
