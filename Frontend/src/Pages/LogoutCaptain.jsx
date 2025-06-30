import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

const LogoutCaptain = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("CaptainToken");
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, { 
          headers: { 
            Authorization: `Bearer ${token}` // Note: "Bearer" is case-sensitive
          } 
        });
        
        if(response.status === 200){
          localStorage.removeItem("CaptainToken");
          navigate("/captain/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    
    logoutUser();
  }, [navigate]);
  
  return (
    <div>Logging out...</div>
  )
}

export default LogoutCaptain