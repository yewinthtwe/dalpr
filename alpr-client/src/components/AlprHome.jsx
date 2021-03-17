import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleIcon from "@material-ui/icons/People";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CameraIcon from "@material-ui/icons/Camera";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import MemoryIcon from "@material-ui/icons/Memory";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import ProtectedRoute from "./common/protectedRoute";
import AlprMembers from "./AlprMembers";
import AlprInOutRecordMui from "./AlprInOutRecordMui";
import AlprUsers from "./AlprUsers";
import AlprObus from "./AlprObus";
import AlprLogin from "./AlprLogin";
import AlprLogout from "./AlprLogout";
import NotFound from "./notFound";
import auth from "../services/authService";
import AlprConfig from "./AlprConfig";
import AlprConfigCamera from "./AlprCamera";
//import AlprRelay from "./AlprRelay";
import AlprIoModule from "./AlprIoModule";
import AlprLane from "./AlprLane";
import AlprGeneralSetting from "./AlprGeneralSetting";
import AlprPrice from "./AlprPrice";
import AlprAiLane from "./AlprAiLane";
import AlprMonitoredIp from "./AlprMonitoredIp";
import * as monitoredIpService from "../services/AlprMonitoredIpService";
import http from "../services/httpService";
import AlprNotification from "./AlprNotification";
import { Badge, Grid, IconButton, Tooltip } from "@material-ui/core";
import _ from "lodash";

// import AlprConfigFormik from './_AlprConfigFormik';
//import MenuItem from '@material-ui/core/MenuItem';

//import AlprInOutRecord from "../components/AlprInOutRecord";
///services/authService';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		backgroundColor: "#99a1a6",
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		backgroundColor: "#F5F5F3",
		color: "#2c2c3c",
		justifyContent: "right",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "#2e4057",
		justifyContent: "center",
		color: "#151A1B",
	},
	card: {
		minWidth: 100,
		backgroundColor: "#F5F5F3",
		color: "#151A1B",
		borderRadius: 12,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	table: {
		"& thead th": {
			fontWeight: "600",
			color: theme.palette.primary.main,
			backgroundColor: "#F5F5F3",
		},
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
	listItemText: {
		color: "#FEFDFD",
	},
}));

function AlprHome(props) {
	const [openCollapse, setOpenCollapse] = React.useState(false);
	const [monitoredIp, setMonitoredIp] = React.useState([]);
	const [alerts, setAlerts] = React.useState([]);
	const [notify, setNotify] = React.useState({
		isOpen: false,
		message: "",
		type: "",
	});

	React.useEffect(() => {
		const source = http.getCancelToken();
		async function fetchMonitoredIps() {
			try {
				const ips = await monitoredIpService.getMonitoredIps(source);
				setMonitoredIp(ips);
				const offLineAlert = _.filter(ips, { status: "offline" });
				setAlerts(offLineAlert);
				//setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchMonitoredIps();
	}, [monitoredIp]);

	function handleOpenSettings() {
		setOpenCollapse(!openCollapse);
		//console.log("handleOpenSettings: triggered.");
	}

	const handleAlertMessage = () => {
		if (alerts) {
			_.forEach(alerts, (alr) => {
				setNotify({
					isOpen: true,
					message: alr.message,
					type: "error",
				});
			});
		}
	};

	const { history } = props;
	const [user, setUser] = React.useState("");
	React.useEffect(() => {
		setUser(auth.getCurrentUser());
	}, []);

	const itemList = [
		{
			icon: <MenuBookIcon />,
			text: "InOut Log",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/inOutRecord"),
		},
		{
			icon: <AssignmentIndIcon />,
			text: "Member",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/members"),
		},
		{
			icon: <PeopleIcon />,
			text: "Users",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/users"),
		},
		{
			icon: <SettingsRemoteIcon />,
			text: "OBU",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/obus"),
		},
		{
			icon: <AssessmentIcon />,
			text: "Report",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/report"),
		},
		{
			icon: <SettingsIcon />,
			text: "Setting",
			badge: "",
			subMenu: openCollapse ? <ExpandLess /> : <ExpandMore />,
			onClick: () => handleOpenSettings(),
		},
	];

	const subItemList = [
		{
			icon: <SettingsApplicationsIcon />,
			text: "General",
			onClick: () => history.push("/generalSetting"),
		},
		{
			icon: <DirectionsCarIcon />,
			text: "Define Lane",
			onClick: () => history.push("/lane"),
		},
		{
			icon: <CameraIcon />,
			text: "Camera",
			onClick: () => history.push("/camera"),
		},
		{
			icon: <EmojiTransportationIcon />,
			text: "Auto Lane",
			onClick: () => history.push("/aiLane"),
		},
		{
			icon: <MemoryIcon />,
			text: "ioModule",
			onClick: () => history.push("/ioModule"),
		},
		{
			icon: <MonetizationOnIcon />,
			text: "Parking Fee",
			onClick: () => history.push("/price"),
		},
		{
			icon: <AddToQueueIcon />,
			text: "Monitor Device",
			onClick: () => history.push("/monitoredIp"),
		},
	];

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Grid container>
						<Grid item>
							<Typography variant='subtitle2'>
								<Box
									fontWeight='fontWeightRegular'
									fontSize={20}
									lineHeight={2}
									textAlign='left'
								>
									Vehicle Access Control System
								</Box>
								<Box
									fontWeight='fontWeightRegular'
									fontSize={9}
									lineHeight={2}
									textAlign='left'
								>
									Version 2.0.1
								</Box>
							</Typography>
						</Grid>
						<Grid item xs></Grid>
						<Grid item>
							<Tooltip title='Alert'>
								<IconButton onClick={handleAlertMessage}>
									<Badge badgeContent={alerts.length} color='secondary'>
										<NotificationsIcon />
									</Badge>
								</IconButton>
							</Tooltip>
							<Tooltip title='Logout'>
								<IconButton onClick={() => history.push("/logout")}>
									<PowerSettingsNewIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'
			>
				<div className={classes.toolbar} />

				<List>
					{itemList.map((item, index) => {
						const { text, icon, onClick, badge, subMenu } = item;
						return (
							<ListItem button key={text} onClick={onClick}>
								{icon && (
									<ListItemIcon>
										{" "}
										{icon} {badge}
									</ListItemIcon>
								)}
								<ListItemText className={classes.listItemText} primary={text} />
								{subMenu}
							</ListItem>
						);
					})}
					<Collapse in={openCollapse} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							{subItemList.map((subItem) => {
								const { text, icon, onClick } = subItem;
								return (
									<ListItem
										button
										key={text}
										onClick={onClick}
										className={classes.nested}
									>
										{icon && <ListItemIcon> {icon} </ListItemIcon>}
										<ListItemText
											className={classes.listItemText}
											primary={text}
										/>
									</ListItem>
								);
							})}
						</List>
					</Collapse>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route path='/login' render={AlprLogin} />
					<Route path='/logout' render={AlprLogout} />
					<ProtectedRoute path='/users' render={AlprUsers} />
					<Route
						exact
						path='/users'
						render={(props) => <AlprUsers {...props}></AlprUsers>}
					/>
					<ProtectedRoute path='/config' render={AlprConfig} />
					<Route path='/config' render={AlprConfig} />
					<ProtectedRoute path='/camera' render={AlprConfigCamera} />
					<Route path='/camera' render={AlprConfigCamera} />
					<ProtectedRoute path='/aiLane' render={AlprAiLane} />
					<Route path='/aiLane' render={AlprAiLane} />
					<ProtectedRoute path='/ioModule' render={AlprIoModule} />
					<Route path='/ioModule' render={AlprIoModule} />
					<ProtectedRoute path='/lane' render={AlprLane} />
					<Route path='/lane' render={AlprLane} />
					<ProtectedRoute path='/generalSetting' render={AlprGeneralSetting} />
					<Route path='/generalSetting' render={AlprGeneralSetting} />
					<ProtectedRoute path='/price' render={AlprPrice} />
					<Route path='/price' render={AlprPrice} />
					<ProtectedRoute path='/monitoredIp' render={AlprMonitoredIp} />
					<Route path='/monitoredIp' render={AlprMonitoredIp} />
					<ProtectedRoute path='/obus' render={AlprObus} />
					<Route path='/obus' render={AlprObus} />
					<ProtectedRoute path='/members' render={AlprMembers} />
					<Route
						path='/members'
						render={(props) => <AlprMembers {...props} user={user} />}
					/>
					<ProtectedRoute path='/inOutRecord' render={AlprInOutRecordMui} />
					<Route
						path='/inOutRecord'
						render={(props) => <AlprInOutRecordMui {...props} user={user} />}
					/>
					<Route path='/not-found' render={NotFound} />
					<Redirect from='/' exact to='/inOutRecord' />
					<Redirect to='/not-found' />
				</Switch>
				<AlprNotification notify={notify} setNotify={setNotify} />
			</main>
		</div>
	);
}

export default withRouter(AlprHome);
