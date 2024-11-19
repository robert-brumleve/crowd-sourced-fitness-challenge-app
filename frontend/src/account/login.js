import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth to get login function
import axios from "axios"; // Import axios

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
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Show error message if any */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
