import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul className="navbar-links">
        <li>
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/homepage" onClick={logout}>
            Log out {currentUser.username}
          </NavLink>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-links right">
        <li>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link to="/homepage" className="navbar-brand">
        Jobly
      </Link>
      <div className="navbar-collapse">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </div>
    </nav>
  );
}

export default Navigation;
