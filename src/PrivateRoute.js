import { Navigate } from "react-router-dom";
import { getCookie } from "./section/cookie";

const PrivateRoute = ({ children }) => {
  const valid = getCookie("login");
  if (valid) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
