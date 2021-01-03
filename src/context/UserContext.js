import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const loginUser = ({ username, password }) => {
    setUser({ username, password });
  };
  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);
export default useUserContext;
