import React, { useState, useEffect } from "react";
import VerticalAlignCenterIcon from "@material-ui/icons/VerticalAlignCenter";
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
import AlprRelayForm from "./AlprRelayForm";
import useAlprTable from "./useAlprTable";
import * as relayService from "../services/AlprRelayService";
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
	{ id: "rlId", label: "Relay ID" },
	{ id: "name", label: "Relay Name" },
	{ id: "value", label: "Value" },
	{ id: "ioModule", label: "IO Module" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprRelay(props) {
	const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [relays, setRelays] = useState([]);
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
	} = useAlprTable(relays, headCells, filterFn);

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

	const addOrEdit = async (relay, resetForm) => {
		const source = http.getCancelToken();

		if (relay.id === 0) {
			delete relay.id;
			await relayService.saveRelay(relay, source);
		} else {
			await relayService.saveRelay(relay, source);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(true);
		//setRelays(relays)
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
		await relayService.deleteRelay(_id, source);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	React.useEffect(() => {
		const source = http.getCancelToken();

		async function fetchRelays() {
			try {
				let relays = await relayService.getRelays(source);
				setRelays(relays);

				setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchRelays();

		return () => {
			source.cancel();
		};
	}, [history.location.pathname, pageRefresh]);

	return (
		<>
			<AlprPageHeader
				title='Relay Configuration'
				subTitle='Diamond Inya'
				icon={<VerticalAlignCenterIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
						className={classes.searchInput}
						label='Search by Relay name...'
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
								<TableCell> {item.rlId} </TableCell>
								<TableCell> {item.name} </TableCell>
								<TableCell> {item.value} </TableCell>
								<TableCell> {item.ioModule} </TableCell>
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
				title='Relay Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprRelayForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</AlprPopup>

			<AlprNotification notify={notify} setNotify={setNotify} />
			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprRelay);
