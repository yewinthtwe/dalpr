import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AlprConfigFormik from './AlprConfigFormik';

import AlprConfig from './AlprConfig';
import { withRouter } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/common/protectedRoute';
import AlprMembers from "../components/AlprMembers";
import AlprMemberForm from '../components/AlprMemberForm';
import AlprInOutRecord from "../components/AlprInOutRecord";
import AlprInOutRecordMui from "../components/AlprInOutRecordMui";
import AlprUsers from "../components/AlprUsers";
import AlprObus from "../components/AlprObus";
import AlprLogin from "../components/AlprLogin"; 
import AlprLogout from "../components/AlprLogout";
import NotFound from "../components/notFound";
import auth from '../services/authService';

///services/authService';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function PermanentDrawerLeft(props) {
  const { history } = props;
  const [user, setUser] = useState('');
  useEffect (() => {
    setUser(auth.getCurrentUser());
  },[]);

  const itemList = [
    { 
      icon : <MenuBookIcon/>,
      text : 'InOut Log',
      badge: '',
      onClick: () => history.push('/inOutRecord')
    },
    {
      icon : <AssignmentIndIcon/>,
      text : 'Member',
      badge: '',
      onClick: () => history.push('/members')
    },
    { 
      icon : <PeopleIcon/>,
      text : 'Users',
      badge: '',
      onClick: () => history.push('/users')
    },
    { 
      icon : <SettingsRemoteIcon/>,
      text : 'OBU',
      badge: '',
      onClick: () => history.push('/obus')
    },
    { 
      icon : <SettingsIcon/>,
      text : 'Setting',
      badge: '',
      onClick: () => history.push('/config')
    },
    { 
      icon : <AssessmentIcon/>,
      text : 'Report',
      badge: '',
      onClick: () => history.push('/report')
    },
    { 
      icon : <PowerSettingsNewIcon/>,
      text : 'Logout',
      badge: '',
      onClick: () => history.push('/logout')
    },
];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="subtitle2" noWrap>
            Vehicle Access Control System
          </Typography>
          <MenuItem>
            <IconButton 
            aria-label="show 6 noti" 
            color="inherit" 
            edge="end"
            >
              <PowerSettingsNewIcon/>
            </IconButton>
            <p>Messages</p>
        </MenuItem>
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Typography variant="h6" >
            Management Server
          </Typography>
        <Divider />
        <List>
          { itemList.map ((item, index) => {
            const { text, icon, onClick, badge } = item;
            return (
            <ListItem button key={text} onClick={onClick}>
               <Card>
                 <CardContent>
                  {icon && <ListItemIcon>{icon} { badge }</ListItemIcon>}
                  <ListItemText primary={text}/>
                </CardContent>
               </Card>
            </ListItem>
            );
          })}
        </List> 
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {/* <Typography variant="h6">
            Configuration
        </Typography>
        <AlprConfigFormik/> */}
        <Switch>
             <Route exact path="/users" render={ props => <AlprUsers { ...props }></AlprUsers> } />
             <Route path="/login" render={ AlprLogin } />
             <Route path="/logout" render={ AlprLogout } />
             <Route path="/config" render={ AlprConfig } />

            <Route path="/alprconfigformik" render={ AlprConfigFormik } />
            
             <Route path="/obus" render={ AlprObus } />
             <ProtectedRoute path="/members/:id" render={ AlprMemberForm } />
             <Route path="/members" render={props => <AlprMembers {...props} user={ user } 
             />} />
             <Route path="/inOutRecord" render={ props => <AlprInOutRecordMui {...props} user={ user }/>} />
             <Route path="/not-found" render={ NotFound } />
        <Redirect from="/" exact to="/inOutRecord" />
        <Redirect to="/not-found" />
            </Switch>
      </main>
    </div>
  );
}

export default withRouter(PermanentDrawerLeft);
