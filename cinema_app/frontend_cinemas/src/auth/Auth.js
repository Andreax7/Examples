import React, { createContext, useContext, useState } from "react";
import {useNavigate } from "react-router-dom";

const authContext = createContext();

export function AuthProvider({ children}) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = (userDetails) => {
    setUser(userDetails)
    navigate("/user")
  };

  const logout = () => {
    setUser({})
    localStorage.clear();
    navigate("/")
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const Auth = () => {
  return useContext(authContext);
};