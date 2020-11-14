import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({user}) => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
       <span className="material-icons" >control_camera</span>dalrp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/inOutRecord">
            <i className="fa fa-car" aria-hidden="true"></i> InOut Record
          </NavLink>

          <NavLink className="nav-item nav-link" to="/members">
            <i className="fa fa-users" aria-hidden="true"></i> Members
          </NavLink>
          
          <NavLink className="nav-item nav-link" to="/users">
            <i className="fa fa-user-circle" aria-hidden="true"></i> System users
          </NavLink>

          <NavLink className="nav-item nav-link" to="/lanes">
            <i className="fa fa-microchip" aria-hidden="true"></i> IO Module
          </NavLink>

          { !user &&
          <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">
            <i className="fa fa-sign-in" aria-hidden="true"></i> Login
          </NavLink>
          </React.Fragment>
          }
          { user &&
          <React.Fragment>
          <NavLink className="nav-item nav-link" to={`/users/${user._id}`}>
            {user.username}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
          <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
          </NavLink>

          </React.Fragment>
          }
        </div>
      </div>
      <span className="navbar-text">
      - Dalpr - Build.20200923001
    </span>
    </nav>
  );
};

export default NavBar;
