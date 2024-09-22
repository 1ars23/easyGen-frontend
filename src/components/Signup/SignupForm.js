import React, { useState,useEffect } from "react";
import axios from "axios";
import { checkLoginStatus } from "../Login/checkLoginStatus";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const loggedIn = await checkLoginStatus();
      if (loggedIn) {
        setIsLoggedIn(true); // Set login status to true if response is successful
        navigate("/dashboard"); // Redirect to dashboard if already logged in
      }
    };

    verifyLoginStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        { user_name, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // If registration is successful, attempt to log in
      if (response.status === 200) {
        setResponseMessage("Registration successful! Logging you in...");

        // Now, login the user after registration
        const loginResponse = await axios.post(
          "http://localhost:3001/api/login",
          { email, password },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const token = loginResponse.data.body.access_token;
        localStorage.setItem("authToken", token);

        // Redirect to the dashboard
        navigate("/dashboard");
      }

      // Clear form fields after successful submission
      setUserName("");
      setEmail("");
      setPassword("");
      setResponseMessage("Registration successful!");
    } catch (error) {
      // Handle the error and extract the error message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setResponseMessage(error.response.data.message);
      } else {
        setResponseMessage("Registration failed! Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h4>Sign Up</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          {/* <label>Username:</label> */}
          <input
            type="text"
            name="user_name"
            placeholder="User Name"
            className="text_input"
            value={user_name} // Controlled input
            onChange={(e) => setUserName(e.target.value)} // Update username state
            required
          />
        </div>
        <div className="text_area">
          {/* <label>Email:</label> */}
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="text_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="text_area">
          {/* <label>Password:</label> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" value="Sign up" className="btn">
          Sign Up
        </button>
      </form>
      {responseMessage && <p className="error-msg">{responseMessage}</p>}
      <a className="link" href="/login">
        Login
      </a>
    </div>
  );
};

export default SignupForm;
