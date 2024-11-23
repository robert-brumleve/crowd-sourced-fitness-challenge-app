import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth to get login function
import axios from "axios"; // Import axios
import login_chat from "../chat/components/LoginChat";
import Header from "../components/Header";

const Login = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state to handle invalid login attempts
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Use navigate for redirection after login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    try {
      // Send POST request with username and password using axios
      const response = await axios.post("/login", {
        username,
        password,
      });

      // Check if the response contains a token
      if (response.data && response.data.token) {
        const token = response.data.token; // Assuming the token is returned in 'token' field
        login(token); // Call the login function from context to store the token and update authentication state

        // store user details in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userID", response.data.user.userID);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("profile_picture", response.data.user.profile_picture);
        
        //login/register to firebase chat
        login_chat();
        
        // Redirect to the dashboard or another page after successful login
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      // If error occurs, set the error message
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="card-header text-center">
        <Header header="LOGIN" />
      </div>
      <div style={{ width: "25rem" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>
          {error && (
            <div className="error-message alert alert-danger mt-3">{error}</div>
          )}{" "}
          {/* Show error message if any */}
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
        </form>
        <div>
          <span>Don't have an account? </span>
          <a href="/account" className="link-primary">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
