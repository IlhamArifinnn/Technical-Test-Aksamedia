// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser({ ...userData });
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  // update profile
  const updateFullname = (fullname) => {
    setUser((prev) => {
      const updatedUser = { ...prev, fullname };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateFullname }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
