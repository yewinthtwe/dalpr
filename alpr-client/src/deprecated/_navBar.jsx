import React from "react";
import { Link, NavLink } from "react-router-dom";
import CopyrightIcon from '@material-ui/icons/Copyright';
import TrafficIcon from '@material-ui/icons/Traffic';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FaceIcon from '@material-ui/icons/Face';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const NavBar = ({user}) => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
       <span className="material-icons" >control_camera</span>dalpr
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
          <Chip icon={<EmojiTransportationIcon />} label="InOut" clickable />
          </NavLink>

          <NavLink className="nav-item nav-link" to="/members">
          <Chip icon={<AssignmentIndIcon />} label="Member" clickable />
          </NavLink>
          
          <NavLink className="nav-item nav-link" to="/users">
          <Chip icon={<AccountBoxIcon />} label="SystemUser" clickable />
          
          </NavLink>

          <NavLink className="nav-item nav-link" to="/lanes">
          <Chip icon={<TrafficIcon />} label="LaneControl" clickable />
          
          </NavLink>

          { !user &&
          <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">
          <Chip icon={<ExitToAppIcon />} label="Login" clickable />
          </NavLink>
          </React.Fragment>
          }
          { user &&
          <React.Fragment>
          <NavLink className="nav-item nav-link" to={`/users/${user._id}`}>
            <Chip icon={<FaceIcon />} label={user.username} clickable />
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            <Chip icon={<MeetingRoomIcon />} label="Logout" clickable />
          </NavLink>

          </React.Fragment>
          }
        </div>
      </div>
      <span className="navbar-text">
      <Typography style={{fontSize: 10}} component="p">
       Evaluation Copy. Build.20200923002 | <CopyrightIcon fontSize="small"> </CopyrightIcon> 2020 | Q-Free ASA
      </Typography>
    </span>
    </nav>
  );
};

export default NavBar;
