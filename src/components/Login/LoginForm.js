import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { checkLoginStatus } from "./checkLoginStatus";

const LoginForm = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const loggedIn = await checkLoginStatus();
      if (loggedIn) {
        setIsLoggedIn(true); // Set login status to true if response is successful
      }
    };

    verifyLoginStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        { email, password }, // Send email and password as an object
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.body.access_token;
      localStorage.setItem("authToken", token);
      setResponseMessage("Login successful!");

      // Fetch the dashboard data using the token
      const dashboardResponse = await axios.get(
        "http://localhost:3001/api/user/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dashboardData = dashboardResponse.data;
      console.log("dashboardData", dashboardData);

      setIsLoggedIn(true); // Set isLoggedIn to true to trigger navigation
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setResponseMessage(error.response.data.message);
      } else {
        setResponseMessage("Login failed! Please try again.");
      }
      console.error(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login">
      <h4>Sign In</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="text_input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>
        <div className="text_area">
          <input
            type="password" 
            id="password"
            name="password"
            placeholder="Password" 
            className="text_input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
        <input type="submit" value="SIGN IN" className="btn" />
      </form>
      {responseMessage && <p className="error-msg">{responseMessage}</p>}
      <a className="link" href="/signup">
        Sign Up
      </a>
    </div>
  );
};

export default LoginForm;
