import React from "react";
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
// import directionsCarIcon from "@material-ui/icons/directionsCar";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import {
	Paper,
	makeStyles,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
	Typography,
} from "@material-ui/core";
import Controls from "./common/Controls";
import PageHeader from "./common/PageHeader";
import useTable from "./common/useAlprTable";
import MonitoredIpForm from "./MonitoredIpForm";
import * as monitoredIpService from "../services/monitoredIpService";
// import http from "../services/httpService";
import Popup from "./common/Popup";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

const headCells = [
	{ id: "name", label: "Device Name" },
	{ id: "description", label: "Description" },
	{ id: "ip", label: "IP Address" },
	{ id: "isMonitored", label: "Monitoring" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprMonitoredIp(props) {
	// const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [monitoredIps, setMonitoredIps] = React.useState([]);
	const [filterFn, setFilterFn] = React.useState({
		fn: (items) => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = React.useState(false);
	const [notify, setNotify] = React.useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [confirmDialog, setConfirmDialog] = React.useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const [pageRefresh, setPageRefresh] = React.useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(monitoredIps, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((x) =>
						x.name.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = async (aiLane, resetForm) => {
		if (aiLane.id === 0) {
			delete aiLane.id;
			await monitoredIpService.saveMonitoredIp(aiLane);
			setPageRefresh(true);
		} else {
			await monitoredIpService.saveMonitoredIp(aiLane);
			setPageRefresh(true);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
		//setMonitoredIps(monitoredIps)
		setNotify({
			isOpen: true,
			message: "Submitted Successfully.",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	const onDelete = async (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		await monitoredIpService.deleteMonitoredIp(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	React.useEffect(() => {
		async function fetchAiLanes() {
			try {
				const monitoredIps = await monitoredIpService.getMonitoredIps();
				setMonitoredIps(monitoredIps);
				setPageRefresh(true);
			} catch (error) {
				console.log("AlprMonitoredIp:", error);
			}
		}
		fetchAiLanes();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='Device Monitoring Configuration'
				subTitle='Diamond Inya'
				icon={<EmojiTransportationIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search by name...'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>

					<Controls.Button
						className={classes.newButton}
						text='Add New'
						variant='outlined'
						startIcon={<AddIcon />}
						onClick={() => {
							setOpenPopup(true);
							setRecordForEdit(null);
						}}
					/>
				</Toolbar>

				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting().map((item) => (
							<TableRow key={item._id}>
								<TableCell> {item.name} </TableCell>
								<TableCell> {item.description} </TableCell>
								<TableCell> {item.ip} </TableCell>
								<TableCell>
									{" "}
									{item.isMonitored ? "Enable" : "Disabled"}{" "}
								</TableCell>
								<TableCell>
									{item.status === "online" ? (
										<Typography color='primary'> {item.status} </Typography>
									) : (
										<Typography color='secondary'> {item.status} </Typography>
									)}
								</TableCell>
								<TableCell>
									<Controls.ActionButton
										color='primary'
										onClick={() => {
											openInPopup(item);
										}}
									>
										<EditOutlinedIcon fontSize='small' />
									</Controls.ActionButton>

									<Controls.ActionButton
										color='secondary'
										onClick={() => {
											setConfirmDialog({
												isOpen: true,
												title: "Are you sure to delete this record?",
												subTitle: "You can't undo this operation.",
												onConfirm: () => {
													onDelete(item._id);
												},
											});
										}}
									>
										<CloseIcon fontSize='small' />
									</Controls.ActionButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>

			<Popup
				title='Device Monitoring'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<MonitoredIpForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</Popup>

			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprMonitoredIp);
