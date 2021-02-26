import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({

  drawer: {
    width: '180px'
  },
 
}));


const MuiDrawer = ( props )  => {

  const { history } = props;
  const classes = useStyles();
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
            badge: <Badge badgeContent={9} color='secondary'/>,
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

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
      >
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
  );
}

export default withRouter(MuiDrawer);