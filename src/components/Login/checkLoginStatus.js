import axios from "axios";

export const checkLoginStatus = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const response = await axios.get("http://localhost:3001/api/user/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Return true if status is 200
      return response.status === 200; 
    } catch (error) {
      console.error("Not logged in or token invalid:", error);
      return false; // Return false if there’s an error
    }
  }
  return false; // Return false if no token exists
};
