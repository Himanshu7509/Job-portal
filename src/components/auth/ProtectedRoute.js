import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("Token");
  const id = Cookies.get("Id");
  const hostToken = Cookies.get("jwtToken");
  const hostId = Cookies.get("userId");

  if ((hostToken && hostId) || (token && id)) {
    return children;
  } else {
   
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;