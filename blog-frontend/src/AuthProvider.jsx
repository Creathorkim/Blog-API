import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { LogIn } from "./api";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser([]);
      }
    } else {
      setUser([]);
    }
  }, [token]);

  const login = async (data) => {
    const daTa = await LogIn(data);
    if (daTa.success) {
      localStorage.setItem("token", daTa.result.token);
      setToken(daTa.result.token);
    } else {
      return { sucess: false, error: daTa.error };
    }
    return daTa;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
