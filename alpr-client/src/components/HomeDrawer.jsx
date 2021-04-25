import React from "react";
// import {
// 	Route,
// 	Switch,
// 	Redirect,
// 	withRouter,
// 	BrowserRouter as Router,
// } from "react-router-dom";
// import _ from "lodash";
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
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import TrafficIcon from "@material-ui/icons/Traffic";
import PersonIcon from "@material-ui/icons/Person";
// import Notification from "./common/Notification";
// import * as monitoredIpService from "../services/monitoredIpService";
// import AuthApi from "./common/AuthApi";
// import Member from "./Member";
// import InOutRecord from "./InOutRecord";
// import User from "./User";
// import Obu from "./Obu";
// import Login from "./Login";
// import Logout from "./Logout";
// import NotFound from "./notFound";
// import Config from "./Config";
// import Camera from "./Camera";
// import IoModule from "./IoModule";
// import Lane from "./Lane";
// import GeneralSetting from "./GeneralSetting";
// import Price from "./Price";
// import AiLane from "./AiLane";
// import Report from "./Report";
// import BarcodeApp from "./Barcode";
// import Kiosk from "./Kiosk";
// import SystemControl from "./SystemControl";
import {
	Toolbar,
	Drawer,
	Badge,
	Grid,
	IconButton,
	Tooltip,
	makeStyles,
	AppBar,
	Box,
	Collapse,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CssBaseline,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AuthApi from "./common/AuthApi";

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

function HomeDrawer() {
	const history = useHistory();
	const { authUser } = React.useContext(AuthApi);
	let user = authUser?.username;
	const [openCollapse, setOpenCollapse] = React.useState(false);
	const [alerts] = React.useState([]);
	//console.log("HomeDrawer: authUser:", authUser);
	//const [monitoredIp, setMonitoredIp] = React.useState([]);
	// const [notify, setNotify] = React.useState({
	// 	isOpen: false,
	// 	message: "",
	// 	type: "",
	// });

	// React.useEffect(() => {
	// 	async function fetchMonitoredIps() {
	// 		try {
	// 			const ips = await monitoredIpService.getMonitoredIps();
	// 			setMonitoredIp(ips);
	// 			const offLineAlert = _.filter(ips, { status: "offline" });
	// 			setAlerts(offLineAlert);
	// 			//setPageRefresh(true);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	fetchMonitoredIps();
	// }, []);

	function handleOpenSettings() {
		setOpenCollapse(!openCollapse);
		//console.log("handleOpenSettings: triggered.");
	}

	const itemList = [
		{
			icon: <MenuBookIcon />,
			text: "InOut Log",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/inOutRecord"),
			//link: <Link to='/inOutRecord' />,
		},
		{
			icon: <AssignmentIndIcon />,
			text: "Member",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/member"),
			//link: <Link to='/member' />,
		},
		{
			icon: <PeopleIcon />,
			text: "User",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/user"),
			//link: <Link to='/user' />,
		},
		{
			icon: <SettingsRemoteIcon />,
			text: "OBU",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/obu"),
			//link: <Link to='/inOutRecord' />,
		},
		{
			icon: <AssessmentIcon />,
			text: "Report",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/report"),
			//link: <Link to='/inOutRecord' />,
		},
		{
			icon: <LocalAtmIcon />,
			text: "Pay Kiosk",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/kiosk"),
			//link: <Link to='/inOutRecord' />,
		},
		{
			icon: <TrafficIcon />,
			text: "System Control",
			badge: "",
			subMenu: "",
			onClick: () => history.push("/control"),
			//link: <Link to='/inOutRecord' />,
		},
		{
			icon: <SettingsIcon />,
			text: "Setting",
			badge: "",
			subMenu: openCollapse ? <ExpandLess /> : <ExpandMore />,
			onClick: () => handleOpenSettings(),
			//link: <Link to='/inOutRecord' />,
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
			text: "Physical Lane",
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
			//onClick: () => console.log("Monitored IP."),
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
							{authUser ? (
								<Tooltip title={user}>
									<IconButton>
										<PersonIcon />
									</IconButton>
								</Tooltip>
							) : (
								"login"
							)}
							<Tooltip title='Alert'>
								<IconButton>
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
		</div>
	);
}

export default HomeDrawer;
