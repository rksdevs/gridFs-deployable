import { Guest, User } from "../Layouts";
import { SignIn, SignUp, Dashboard, Upload } from "../Views";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useContext, useEffect, useState } from "react";
import authContext from "../Context/Auth/authContext";
import setAuthToken from "./setAuthToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Routing = () => {
  const { validateToken } = useContext(authContext);
  // const [user, setUser] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setAuthToken(token);
      validateToken();
    }
    // setUser(localStorage.getItem("user"));
    // console.log(user);
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<h1>Landing</h1>}></Route> */}
        <Route path="/" element={<Guest Child={SignIn} />}></Route>
        <Route path="/signin" element={<Guest Child={SignIn} />}></Route>
        <Route path="/signup" element={<Guest Child={SignUp} />}></Route>
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute
              Component={() => (
                <User>
                  <Dashboard />
                </User>
              )}
            />
          }
        ></Route>
        <Route
          path="/user/upload"
          element={
            <PrivateRoute
              Component={() => (
                <User>
                  <Upload />
                </User>
              )}
            />
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default Routing;
