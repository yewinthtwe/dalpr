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
} from "@material-ui/core";
import Controls from "./common/Controls";
import PageHeader from "./common/PageHeader";
import useTable from "./common/useTable";
import AlprLaneForm from "./Forms/AlprLaneForm";
import * as alprLaneService from "../services/alprLaneService";
import Popup from "./common/Popup";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
import _ from "lodash";
// import { nanoid } from "nanoid";
// import { withRouter } from "react-router-dom";
// import * as relayService from "../services/relayService";
// import http from "../services/httpService";
import * as ioModuleService from "../services/ioModuleService";
import * as laneService from "../services/laneService";
import * as cameraService from "../services/cameraService";
//import AlprLaneFormV2 from "./Forms/AlprLaneFormV2";

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
	{ id: "name", label: "ALPR Lane Name" },
	{ id: "description", label: "Description" },
	{ id: "lane", label: "Physical Lane" },
	{ id: "camera", label: "Alpr Camera" },
	{ id: "relay", label: "Relay" },
	{ id: "ioModule", label: "IO Module" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

// const oldRelays = ["relay0", "relay1", "relay2"];
// const newRelay = "relay2";

function AlprLane() {
	//const { history } = props;
	const classes = useStyles();
	const [pageRefresh, setPageRefresh] = React.useState(false);
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [alprLanes, setAlprLanes] = React.useState([]);
	const [cameraOptions, setCameraOptions] = React.useState([]);
	const [ioModuleOptions, setIoModuleOptions] = React.useState([]);
	const [laneOptions, setLaneOptions] = React.useState([]);

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

	const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
		useTable(alprLanes, headCells, filterFn);

	//console.log("AlprLaneJsx: data fetched from database: alprLanes:", alprLanes);

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

	const showNoti = (resp) => {
		if (resp.status >= 400) {
			setNotify({
				isOpen: true,
				message: resp.data,
				type: "error",
			});
		} else {
			setNotify({
				isOpen: true,
				message: "Submitted Successfully.",
				type: "success",
			});
		}
	};

	const addOrEdit = async (item, resetForm) => {
		console.log("AlprLaneJsx: addOrEdit: called:", item);

		if (item.id === 0) {
			let resp = await alprLaneService.saveAiLane(item);
			showNoti(resp);
			setPageRefresh(true);
		} else {
			let resp = await alprLaneService.saveAiLane(item);
			showNoti(resp);
			setPageRefresh(true);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
	};

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	const onDelete = async (item) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		await alprLaneService.deleteAiLane(item._id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
		setPageRefresh(false);
	};

	const getName = (item) => {
		return item.name;
	};
	const getRelayName = (relayObjectId, ioModuleName) => {
		let matchedRelay = _.filter(ioModuleName.relays, ["_id", relayObjectId]);
		//console.log("matched relay:", matchedRelay);
		return matchedRelay[0].name;
	};

	React.useEffect(() => {
		async function fetchAiLanes() {
			try {
				const alprLanes = await alprLaneService.getAiLanes();
				setAlprLanes(alprLanes.data);

				const phyLanes = await laneService.getLanes();
				setLaneOptions(phyLanes.data);

				const cam = await cameraService.getCameras();
				setCameraOptions(cam.data);

				const ioMod = await ioModuleService.getIoModules();
				setIoModuleOptions(ioMod.data);
				setPageRefresh(true);
			} catch (error) {}
		}
		fetchAiLanes();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='ALPR Lane Configuration'
				subTitle='Diamond Inya'
				icon={<EmojiTransportationIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search by ALPR lane name...'
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
								<TableCell> {getName(item.lane)} </TableCell>
								<TableCell> {getName(item.camera)} </TableCell>
								<TableCell>
									{getRelayName(item.relay, item.ioModule)} {item.relay}
								</TableCell>
								<TableCell> {getName(item.ioModule)} </TableCell>
								<TableCell>
									{item.status === true ? "Enable" : "Disabled"}{" "}
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
													onDelete(item);
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
				title='ALPR Lane Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprLaneForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
					cameraOptions={cameraOptions}
					//relayOptions={relayOptions}
					laneOptions={laneOptions}
					ioModuleOptions={ioModuleOptions}
				/>
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default AlprLane;
