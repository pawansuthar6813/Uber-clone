import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useUser } from "../Context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useUser();
  
  // Check for token immediately - redirect early if not found
  const token = localStorage.getItem("UserToken");
  
  // First check - if no token exists, redirect immediately
  if (!token) {
    return <Navigate to="/user/login" replace />;
  }
  
  // If we have a token, validate it with the API
  useEffect(() => {
    // Skip if no token
    if (!token) {
      setLoading(false);
      return;
    }
    
    // API call to validate token
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
    .then((res) => {
      if (res.status === 200) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    })
    .catch(() => {
      // Token invalid or blacklisted
      localStorage.removeItem("UserToken");
      setIsAuthenticated(false);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [setUser]); // Only run once on mount
  
  // Show loading while checking with API
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // After loading, if not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }
  
  // If we have token and it's validated, show protected content
  return children;
};

export default UserProtectWrapper;