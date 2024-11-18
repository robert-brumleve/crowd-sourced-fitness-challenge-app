import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth to get login function

const Login = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Use navigate for redirection after login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulating a login response with a fake JWT token
    // You will need to replace this with your API call to verify the user and get a real token
    const fakeToken = "your_jwt_token"; // Replace with the token from your authentication server

    // Perform login with the received token
    login(fakeToken); // Call the login function from context to store the token and update authentication state

    // Redirect to the dashboard or another page after successful login
    navigate("/dashboard");
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
