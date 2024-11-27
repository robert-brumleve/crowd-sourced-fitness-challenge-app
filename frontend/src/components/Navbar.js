import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import personArmsUp from "../data/images/logo.png";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Destructure login, logout, and isAuthenticated from context

  // when a tab is active
  const getNavLinkClass = (isActive) =>
    `nav-link ${isActive ? "active-tab" : ""}`;

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
            alt="logo"
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
              <NavLink
                className={({ isActive }) => getNavLinkClass(isActive)}
                aria-current="page"
                to="/dashboard/:id"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => getNavLinkClass(isActive)}
                aria-current="page"
                to="/challenges"
              >
                Community challenges
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav  mb-2 mb-lg-0 ">
            {/* Conditionally render login or logout link */}
            {!isAuthenticated ? (
              <>
                {/* show createAccount in login page instead*/}
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    type="button"
                    aria-expanded="false"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* dropdown menu with user info and logout */}
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      border: "none",
                      padding:'5px',
                    }}
                  >
                    <img
                      className="d-inline-block align-center"
                      src={
                        localStorage.getItem("profile_picture")
                          ? localStorage.getItem("profile_picture")
                          : "img/chat/avatar.png"
                      }
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                    {localStorage.getItem("username")}
                  </button>
                  <ul className="dropdown-menu">
                    <li >
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
