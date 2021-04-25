import React from "react";
import CameraIcon from "@material-ui/icons/Camera";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import MemoryIcon from "@material-ui/icons/Memory";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { useHistory } from "react-router-dom";

export function subItemList() {
	const history = useHistory();
	return [
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
}
