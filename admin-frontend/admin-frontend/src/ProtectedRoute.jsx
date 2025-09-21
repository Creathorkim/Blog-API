import { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
