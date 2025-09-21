import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/auth" replace/>;
  }
  return children
};
