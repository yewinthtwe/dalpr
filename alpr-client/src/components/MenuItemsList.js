import React from "react";
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
import { withRouter } from "react-router-dom";

export const menuItemsList = [
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
		onClick: () => history.push("/member"),
	},
	{
		icon: <PeopleIcon />,
		text: "User",
		badge: "",
		subMenu: "",
		onClick: () => history.push("/user"),
	},
	{
		icon: <SettingsRemoteIcon />,
		text: "OBU",
		badge: "",
		subMenu: "",
		onClick: () => history.push("/obu"),
	},
	{
		icon: <AssessmentIcon />,
		text: "Report",
		badge: "",
		subMenu: "",
		onClick: () => history.push("/report"),
	},
	{
		icon: <LocalAtmIcon />,
		text: "Pay Kiosk",
		badge: "",
		subMenu: "",
		onClick: () => history.push("/kiosk"),
	},
	{
		icon: <TrafficIcon />,
		text: "System Control",
		badge: "",
		subMenu: "",
		onClick: () => history.push("/control"),
	},
	{
		icon: <SettingsIcon />,
		text: "Setting",
		badge: "",
		subMenu: openCollapse ? <ExpandLess /> : <ExpandMore />,
		onClick: () => handleOpenSettings(),
	},
];

export const subMenuItemsList = [
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
		// onClick: () => history.push("/monitoredIp"),
		onClick: () => console.log("Monitored IP."),
	},
];
