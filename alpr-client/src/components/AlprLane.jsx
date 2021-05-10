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
// const newRelay = "relay2";ssss

function AlprLane() {
	//const { history } = props;
	const classes = useStyles();
	const [pageRefresh, setPageRefresh] = React.useState(false);
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [alprLanes, setAlprLanes] = React.useState([]);

	const [cameraOptions, setCameraOptions] = React.useState([]);
	const [ioModuleOptions, setIoModuleOptions] = React.useState([]);
	const [relayOptions, setRelayOptions] = React.useState([]);
	const [relays, setRelays] = React.useState([]);
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

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(alprLanes, headCells, filterFn);

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
			await alprLaneService.saveAiLane(aiLane);
			setPageRefresh(true);
		} else {
			await alprLaneService.saveAiLane(aiLane);
			//console.log("AiLane: Creating record: response:", resp);
			setPageRefresh(true);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
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

	const getRelayName = (relayObjectId) => {
		let relayName = "";
		_.map(alprLanes, (param) => {
			console.log(_.filter(param.ioModule.relays, ["_id", relayObjectId]));
			let rl = _.filter(param.ioModule.relays, ["_id", relayObjectId]);
			console.log("Relay name:", _.toString(_.map(rl, "name")));
			relayName = _.toString(_.map(rl, "name"));
		});
		return relayName;
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
				setRelayOptions(ioMod.data.relays);

				// _.map(alprLanes.data, (o) => {
				// 	let rel = _.find(o.ioModule.relays, (relObj) => {
				// 		return _.isEqual(o.relay, relObj._id);
				// 	});
				// 	console.log("matching result of a relay in IoModule:", rel);

				// });
				// const lanes = await laneService.getLanes();
				// setLaneOptions(lanes.data);

				// const cameras = await cameraService.getCameras();
				// setCameraOptions(cameras.data);

				//const ioMod = await ioModuleService.getIoModules();
				//setIoModuleOptions(ioMod.data);
				//console.log("AlprLaneJsx: ioModuleOptions:", ioModuleOptions);

				// const response = await ioModuleService.getRelays();
				// let rl = _.map(response.data, (modu) => {
				// 	return _.map(modu.relays);
				// });
				// //console.log("rl:", _.flattenDeep(rl));
				// setRelayOptions(_.flattenDeep(rl));

				// ioModules = _.filter(ioModules, { status: "online" });
				// console.log("AiLane: ioModule:", response.data);

				// _.forEach(response.data, (ioModule) => {
				// 	availableRelays = _.filter(ioModule.relays.map(), { inUsed: false });
				// 	if (_.isEmpty(availableRelays)) {
				// 		//console.log("AlprAiLane: No Relay Available.", availableRelays);
				// 		setNotify({
				// 			isOpen: true,
				// 			message: "All Relays are in Used.",
				// 			type: "error",
				// 		});
				// 	} else {
				// 		//console.log("AlprAiLane: Relay Available.", availableRelays);
				// 	}
				// });
				//setPageRefresh(true);
			} catch (error) {}
		}
		fetchAiLanes();
	}, []);

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
								<TableCell> {item.lane.name} </TableCell>
								<TableCell> {item.camera.name} </TableCell>
								<TableCell> {getRelayName(item.relay)}</TableCell>
								<TableCell> {item.ioModule.name} </TableCell>
								<TableCell>
									{" "}
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
