import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import personArmsUp from "../data/images/person-arms-up.svg";
import { MagnifyingGlassIcon } from "./Icons";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Navbar = () => {
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Destructure login, logout, and isAuthenticated from context

  const handleChange = (event) => {
    setKeywords(event.target.value);
  };

  const OnSearch = (event) => {
    event.preventDefault();
    if (keywords.trim() === "") {
      navigate("/challenges");
    } else {
      navigate(`/challenges/search/${keywords}`);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" aria-current="page" to="/">
          <img
            src={personArmsUp}
            alt="person-arms-up"
            style={{ width: "50px", height: "50px" }}
          />
          Fitness Challenge
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/account">
                Create Account
              </NavLink>
            </li>

            {/* Conditionally render login or logout link */}
            {!isAuthenticated ? (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/challenges">
                Community challenges
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/u1/challenges"
              >
                My challenges
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" onSubmit={OnSearch}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Challenge keyword"
              aria-label="Search"
              value={keywords}
              onChange={handleChange}
            />
            <button className="btn btn-outline-success" type="submit">
              {MagnifyingGlassIcon}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
