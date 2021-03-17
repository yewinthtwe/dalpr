import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import NavBar from "./components/navBar";
import AlprMembers from "./components/AlprMembers";
import AlprMemberForm from './components/AlprMemberForm';
import AlprInOutRecord from "./components/AlprInOutRecord";
import AlprUsers from "./components/AlprUsers";
import AlprObus from "./components/AlprObus";
import AlprLogin from "./components/AlprLogin"; 
import AlprLogout from "./components/AlprLogout";
//import AlprConfig from "./components/AlprConfig";

import AlprConfigFormik from "./components/AlprConfigFormik";
// import Users from "./components/users";
import UserForm from "./components/userForm";
//import LoginForm from "./components/loginForm";
//import muLoginForm from './components/muLoginForm';
//import Logout from './components/logout';
//import Relays from "./components/relays";

import auth from './services/authService';
import NotFound from "./components/notFound";
import ProtectedRoute from './components/common/protectedRoute';
import InOutRecordCard from "./components/inOutRecordCard";
import Lanes from './components/lanes';
// import MuSwitch from './components/common/switch';
// import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MuiDrawer from './components/MuiDrawer';
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({

  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126"
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526"
    },
    background: {
      default: "#f4f5fd"
    }
  },
  overrides: {
      MuiAppBar: {
        root: { 
          transform: 'translateZ(0)'
        }
      }
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    }
  }
});

const useStyles = makeStyles ({
  appMain: {
    display: 'flex'
  }
});

function AlprApp () {

  const classes = useStyles();

  const [user, setUser] = useState('');
  useEffect (() => {
    setUser(auth.getCurrentUser());
  },[]);

  return (
    <>
    <ThemeProvider theme={theme}>
    <div className={classes.appMain}>
      <MuiDrawer/>
           <Switch>
             <ProtectedRoute path="/users/:id" render={ UserForm } />
             <Route exact path="/users" render={ props => <AlprUsers { ...props }></AlprUsers> } />
             <Route path="/login" render={ AlprLogin } />
             <Route path="/logout" render={ AlprLogout } />
             <Route path="/config" render={ AlprConfigFormik } />
             <Route path="/lanes" render={ Lanes } />
             <Route path="/obus" render={ AlprObus } />
             <ProtectedRoute path="/members/:id" render={ AlprMemberForm } />
             <Route path="/members" render={props => <AlprMembers {...props} user={ user } 
             />} />
             <ProtectedRoute path="/inOutRecord/:id" render={ InOutRecordCard } />
             <Route path="/inOutRecord" render={ props => <AlprInOutRecord {...props} user={ user }/>} />
             <Route path="/not-found" render={ NotFound } />
        <Redirect from="/" exact to="/inOutRecord" />
        <Redirect to="/not-found" />
            </Switch>
        <CssBaseline />
    </div>  
    </ThemeProvider>
    </>
  );
}

export default AlprApp;
