import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the Auth context
const AuthContext = createContext();

// Provide the Auth context to the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token exists in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        jwtDecode(token); // Try to decode the token to check if it's valid
        setIsAuthenticated(true); // Valid token, user is authenticated
      } catch (error) {
        setIsAuthenticated(false); // Invalid token
      }
    }
  }, []);

  // Function to log in the user
  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token to localStorage
    setIsAuthenticated(true); // Update the state to reflect the logged-in status
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("authToken");
    // remove all user detail in local Storage
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    setIsAuthenticated(false); // Update state to reflect the logged-out status
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
