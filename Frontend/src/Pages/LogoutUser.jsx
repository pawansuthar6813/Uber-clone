import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const LogoutUser = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("UserToken");
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, { 
          headers: { 
            Authorization: `Bearer ${token}` // Note: "Bearer" is case-sensitive
          } 
        });
        
        if(response.status === 200){
          localStorage.removeItem("UserToken");
          navigate("/user/login");
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

export default LogoutUser;