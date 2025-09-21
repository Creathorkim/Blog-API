import { AuthContext } from "./authContext";
import { useEffect, useState } from "react";
import { login } from "./api";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const logIn = async (data) => {
    const daTa = await login(data);
    if (daTa.success && daTa.result.token) {
      localStorage.setItem("token", daTa.result.token);
      setToken(daTa.result.token);
    } else {
      return { success: false, error: daTa.error };
    }
    return daTa;
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
