import React, { useState } from "react";
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
// import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
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
import AlprControls from "./AlprControls";
import AlprPageHeader from "./AlprPageHeader";
import useAlprTable from "./useAlprTable";
import AlprAiLaneForm from "./AlprAiLaneForm";
import * as aiLaneService from "../services/AlprAiLaneService";
import * as cameraService from "../services/AlprCameraService";
import * as ioModuleService from "../services/AlprIoModuleService";
import * as laneService from "../services/AlprLaneService";
import * as relayService from "../services/AlprRelayService";
import http from "../services/httpService";
import AlprPopup from "./AlprPopup";
import AlprNotification from "./AlprNotification";
import AlprConfirmDialog from "./AlprConfirmDialog";
import { withRouter } from "react-router-dom";
import _ from "lodash";

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
	{ id: "name", label: "Auto Lane Name" },
	{ id: "description", label: "Description" },
	{ id: "lane", label: "Lane" },

	{ id: "laneType", label: "Lane Type" },
	{ id: "camera", label: "Camera" },

	{ id: "ioModule", label: "IO Module" },

	{ id: "relay", label: "Relay" },

	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

// const oldRelays = ["relay0", "relay1", "relay2"];
// const newRelay = "relay2";

function AlprAiLane(props) {
	const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [aiLanes, setAiLanes] = useState([]);
	const [cameraOptions, setCameraOptions] = React.useState([
		{ _id: 0, name: "" },
	]);

	const [ioModuleOptions, setIoModuleOptions] = React.useState([
		{ _id: 0, name: "" },
	]);

	const [laneOptions, setLaneOptions] = React.useState([{ _id: 0, name: "" }]);

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
	} = useAlprTable(aiLanes, headCells, filterFn);

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
		const source = http.getCancelToken();

		if (aiLane.id === 0) {
			delete aiLane.id;
			await aiLaneService.saveAiLane(aiLane, source);
			await relayService.updateRelayStatus(aiLane, source);
			//await relayService.saveRelay(aiLane.relayId, source);
			//console.log("AlprAiLane: Saving relays", aiLane);
		} else {
			await aiLaneService.saveAiLane(aiLane, source);
			await relayService.updateRelayStatus(aiLane, source);
			//console.log("AlprAiLane: Updating relay", aiLane);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
		//setAiLanes(aiLanes)
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
		const source = http.getCancelToken();

		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});

		item.inUsed = false;
		await relayService.updateRelayStatus(item, source);
		//console.log("AlprAiLane: Setting inUsed to false");
		await aiLaneService.deleteAiLane(item._id, source);
		setPageRefresh(false);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	React.useEffect(() => {
		let availableRelays = [];
		const source = http.getCancelToken();

		async function fetchAiLanes() {
			try {
				const aiLanes = await aiLaneService.getAiLanes(source);
				setAiLanes(aiLanes);
				const lanes = await laneService.getLanes(source);
				setLaneOptions(lanes);
				const cameras = await cameraService.getCameras(source);
				setCameraOptions(cameras);
				let ioModules = await ioModuleService.getIoModules(source);
				ioModules = _.filter(ioModules, { status: "online" });
				//console.log("AlprAiLane:", ioModules);
				setIoModuleOptions(ioModules);

				_.forEach(ioModules, (ioModule) => {
					availableRelays = _.filter(ioModule.relays, { inUsed: false });
					if (_.isEmpty(availableRelays)) {
						//console.log("AlprAiLane: No Relay Available.", availableRelays);
						setNotify({
							isOpen: true,
							message: "All Relays are in Used.",
							type: "error",
						});
					} else {
						//console.log("AlprAiLane: Relay Available.", availableRelays);
					}
				});

				setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchAiLanes();

		return () => {
			source.cancel();
		};
	}, [history.location.pathname, pageRefresh]);

	return (
		<>
			<AlprPageHeader
				title='Auto Lane Configuration'
				subTitle='Diamond Inya'
				icon={<EmojiTransportationIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
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

					<AlprControls.Button
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
								<TableCell> {item.lane} </TableCell>
								<TableCell> {item.laneType} </TableCell>
								<TableCell> {item.camera} </TableCell>
								<TableCell> {item.ioModule} </TableCell>
								<TableCell> {item.relay} </TableCell>
								<TableCell>
									{" "}
									{item.status === true ? "Enable" : "Disabled"}{" "}
								</TableCell>
								<TableCell>
									<AlprControls.ActionButton
										color='primary'
										onClick={() => {
											openInPopup(item);
										}}
									>
										<EditOutlinedIcon fontSize='small' />
									</AlprControls.ActionButton>

									<AlprControls.ActionButton
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
									</AlprControls.ActionButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>

			<AlprPopup
				title='Auto Lane Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprAiLaneForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
					cameraOptions={cameraOptions}
					laneOptions={laneOptions}
					ioModuleOptions={ioModuleOptions}
				/>
			</AlprPopup>
			<AlprNotification notify={notify} setNotify={setNotify} />
			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprAiLane);
