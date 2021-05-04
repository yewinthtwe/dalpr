import React from "react";
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
import Controls from "./common/Controls";
import PageHeader from "./common/PageHeader";
import RelayForm from "./Forms/RelayForm";
import useTable from "./common/useTable";
import * as relayService from "../services/relayService";
// import http from "../services/httpService";
import Popup from "./common/Popup";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
import _ from "lodash";
// import { withRouter } from "react-router-dom";

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
	{ id: "relayId", label: "Relay ID" },
	{ id: "name", label: "Relay Name" },
	{ id: "relayValue", label: "Value" },
	{ id: "ioModule", label: "IO Module" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function Relay(props) {
	// const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [relays, setRelays] = React.useState([]);
	const [filterFn, setFilterFn] = React.useState({
		fn: (items) => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = React.useState(false);
	const [pageRefresh, setPageRefresh] = React.useState(false);
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
	} = useTable(relays, headCells, filterFn);

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
		if (relay.id === 0) {
			delete relay.id;
			const resp = await relayService.saveRelay(relay);
			let filteredRelays = _.pick(
				resp.data,
				"relayId",
				"relayValue",
				"description",
				"name"
			);
			setRelays(filteredRelays);
			setPageRefresh(true);
		} else {
			const resp = await relayService.saveRelay(relay);
			setRelays(resp.data);
			setPageRefresh(true);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
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
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		await relayService.deleteRelay(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
		setPageRefresh(false);
	};

	React.useEffect(() => {
		async function fetchRelays() {
			try {
				let resp = await relayService.getRelays();
				let filteredRelays = _.map(resp.data, "name");
				console.log(filteredRelays);
				setRelays(filteredRelays);
				setPageRefresh(true);
			} catch (error) {
				console.log("Relay:", error);
			}
		}
		fetchRelays();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='Relay Configuration'
				subTitle='Diamond Inya'
				icon={<VerticalAlignCenterIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
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
								<TableCell> {item.rlId} </TableCell>
								<TableCell> {item.name} </TableCell>
								<TableCell> {item.value} </TableCell>
								<TableCell> {item.ioModule} </TableCell>
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
				title='Relay Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<RelayForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
					relays={relays}
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

export default Relay;
