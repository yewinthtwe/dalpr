import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CameraIcon from "@material-ui/icons/Camera";
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
import * as cameraService from "../services/AlprCameraService";
import http from "../services/httpService";
import AlprPopup from "./AlprPopup";
import AlprNotification from "./AlprNotification";
import AlprConfirmDialog from "./AlprConfirmDialog";
import AlprCameraForm from "./AlprCameraForm";

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
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
	{ id: "ip", label: "Camera IP" },
	{ id: "username", label: "Login Name" },
	{ id: "password", label: "Password" },

	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprConfigCamera(props) {
	const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [camera, setCamera] = useState([]);
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const [pageRefresh, setPageRefresh] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useAlprTable(camera, headCells, filterFn);

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

	const addOrEdit = async (camera, resetForm) => {
		const source = http.getCancelToken();
		if (camera.id === 0) {
			delete camera.id;
			await cameraService.saveCamera(camera, source);
		} else {
			await cameraService.saveCamera(camera, source);
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

	const onDelete = async (_id) => {
		const source = http.getCancelToken();

		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		await cameraService.deleteCamera(_id, source);
		setPageRefresh(false);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	useEffect(() => {
		const source = http.getCancelToken();
		async function fetchCamera() {
			try {
				const camera = await cameraService.getCameras(source);
				setCamera(camera);
				setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchCamera();
		return () => {
			source.cancel();
		};
	}, [history.location.pathname, pageRefresh]);

	return (
		<>
			<AlprPageHeader
				title='Camera Configuration'
				subTitle='Diamond Inya'
				icon={<CameraIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
						className={classes.searchInput}
						label='Search camera name'
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
								<TableCell> {item.ip} </TableCell>
								<TableCell> {item.username} </TableCell>
								<TableCell> {item.password} </TableCell>
								<TableCell> {item.status ? "Online" : "Offline"} </TableCell>
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
													onDelete(item._id);
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
				title='Camera Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprCameraForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
				></AlprCameraForm>
			</AlprPopup>

			<AlprNotification notify={notify} setNotify={setNotify} />
			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprConfigCamera);
