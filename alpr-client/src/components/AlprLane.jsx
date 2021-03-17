import React, { useState, useEffect } from "react";
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
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
import AlprLaneForm from "./AlprLaneForm";
import * as laneService from "../services/AlprLaneService";
import http from "../services/httpService";
import AlprPopup from "./AlprPopup";
import AlprNotification from "./AlprNotification";
import AlprConfirmDialog from "./AlprConfirmDialog";
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
	{ id: "name", label: "Lane Name" },
	{ id: "description", label: "Description" },
	{ id: "isExitLane", label: "Lane Type" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprLane(props) {
	const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [lanes, setLanes] = useState([]);
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
	} = useAlprTable(lanes, headCells, filterFn);

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

	const addOrEdit = async (lane, resetForm) => {
		const source = http.getCancelToken();

		if (lane.id === 0) {
			delete lane.id;
			await laneService.saveLane(lane, source);
		} else {
			await laneService.saveLane(lane, source);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
		//setLanes(lanes)
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
		await laneService.deleteLane(_id, source);
		setPageRefresh(false);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	useEffect(() => {
		const source = http.getCancelToken();

		async function fetchLanes() {
			try {
				const lanes = await laneService.getLanes(source);
				setLanes(lanes);
				setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchLanes();

		return () => {
			source.cancel();
		};
	}, [history.location.pathname, pageRefresh]);

	return (
		<>
			<AlprPageHeader
				title='Define Lane(s)'
				subTitle='Diamond Inya'
				caption='Actual lanes must be defined here with lane type such as Entry or Exit. By default lane type is Exit.'
				icon={<DirectionsCarIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
						className={classes.searchInput}
						label='Search by Lane name...'
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
								<TableCell>
									{" "}
									{item.isExitLane === true ? "Exit" : "Entry"}{" "}
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
				title='Lane Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprLaneForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</AlprPopup>

			<AlprNotification notify={notify} setNotify={setNotify} />
			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprLane);
