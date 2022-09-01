import axios from "axios";
export default function setAuthToken(token) {
  if (token) {
    localStorage.setItem("jwt", token);
    axios.defaults.headers.common["authorization"] = token;
  } else {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["authorization"];
  }
}
