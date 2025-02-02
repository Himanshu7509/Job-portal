import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("Token");
  const id = Cookies.get("Id");

  if (!token || !id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
