import React from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
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
import IoModuleForm from "./Forms/IoModuleForm";
import useTable from "./common/useTable";
import * as ioModuleService from "../services/ioModuleService";
// import http from "../services/httpService";
import Popup from "./common/Popup";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
// import { withRouter } from "react-router-dom";
// import AuthApi from "./common/AuthApi";

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
	{ id: "name", label: "IoModule Name" },
	{ id: "ip", label: "IP Address" },
	{ id: "username", label: "Login name" },
	{ id: "password", label: "Password" },
	{ id: "numberOfRelays", label: "Number of Relays" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function IoModule() {
	// const { history } = props;
	const classes = useStyles();
	//const { authIoModule } = React.useContext(AuthApi);
	//console.log("IoModuleJs:", authIoModule);
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [ioModules, setIoModules] = React.useState([]);
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
	} = useTable(ioModules, headCells, filterFn);

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

	const addOrEdit = async (ioMod, resetForm) => {
		if (ioMod.id === 0) {
			delete ioMod.id;
			await ioModuleService.saveIoModule(ioMod);
			setPageRefresh(true);
		} else {
			await ioModuleService.saveIoModule(ioMod);
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

	const onDelete = async (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		await ioModuleService.deleteIoModule(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
		setPageRefresh(false);
	};

	React.useEffect(() => {
		async function fetchIoModules() {
			try {
				const response = await ioModuleService.getIoModules();
				setIoModules(response.data);
				setPageRefresh(true);
			} catch (error) {
				console.log("IoModuleJsx:", error);
			}
		}
		fetchIoModules();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='IoModule'
				subTitle='Io Modules'
				icon={<PeopleAltIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search by IoModule name...'
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
								<TableCell> {item.ip} </TableCell>
								<TableCell> {item.username} </TableCell>
								<TableCell> {item.password} </TableCell>
								<TableCell> {item.numberOfRelays} </TableCell>
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
				title='System IoModule'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<IoModuleForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</Popup>

			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

// import React from "react";
// import MemoryIcon from "@material-ui/icons/Memory";
// import SearchIcon from "@material-ui/icons/Search";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import AddIcon from "@material-ui/icons/Add";
// import CloseIcon from "@material-ui/icons/Close";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import HdrStrongIcon from "@material-ui/icons/HdrStrong";
// import HdrWeakIcon from "@material-ui/icons/HdrWeak";
// import {
// 	Paper,
// 	makeStyles,
// 	TableBody,
// 	TableRow,
// 	TableCell,
// 	Toolbar,
// 	InputAdornment,
// 	IconButton,
// 	Collapse,
// 	Card,
// 	Typography,
// } from "@material-ui/core";
// import Controls from "./common/Controls";
// import PageHeader from "./common/PageHeader";
// import IoModuleForm from "./Forms/IoModuleForm";
// import useTable from "./common/useTable";
// import * as ioModuleService from "../services/ioModuleService";
// import Popup from "./common/Popup";
// import Notification from "./common/Notification";
// import ConfirmDialog from "./common/ConfirmDialog";
// import { relayData } from "./common/relayData";
// import _ from "lodash";
// // import { withRouter } from "react-router-dom";
// // import http from "../services/httpService";
// // import { handleInputChange } from "react-select/src/utils";

// const useStyles = makeStyles((theme) => ({
// 	pageContent: {
// 		margin: theme.spacing(5),
// 		padding: theme.spacing(3),
// 	},
// 	searchInput: {
// 		width: "75%",
// 	},
// 	newButton: {
// 		position: "absolute",
// 		right: "10px",
// 	},
// }));

// const headCells = [
// 	{ id: "name", label: "Module Name" },
// 	{ id: "description", label: "Description" },
// 	{ id: "ip", label: "IP Address" },
// 	{ id: "username", label: "Login Name" },
// 	{ id: "password", label: "Password" },
// 	{ id: "numberOfRelays", label: "Number of Relays", disableSorting: true },
// 	{ id: "actions", label: "Actions", disableSorting: true },
// ];

// export default function IoModule() {
// 	// const { history } = props;
// 	const classes = useStyles();
// 	const [pageRefresh, setPageRefresh] = React.useState(false);
// 	const [recordForEdit, setRecordForEdit] = React.useState(null);
// 	const [ioModules, setIoModules] = React.useState([]);
// 	const [filterFn, setFilterFn] = React.useState({
// 		fn: (items) => {
// 			return items;
// 		},
// 	});
// 	const [openPopup, setOpenPopup] = React.useState(false);
// 	const [notify, setNotify] = React.useState({
// 		isOpen: false,
// 		message: "",
// 		type: "",
// 	});
// 	const [confirmDialog, setConfirmDialog] = React.useState({
// 		isOpen: false,
// 		title: "",
// 		subTitle: "",
// 	});

// 	const {
// 		TblContainer,
// 		TblHead,
// 		TblPagination,
// 		recordsAfterPagingAndSorting,
// 	} = useTable(ioModules, headCells, filterFn);

// 	const handleSearch = (e) => {
// 		let target = e.target;
// 		setFilterFn({
// 			fn: (items) => {
// 				if (target.value === "") return items;
// 				else
// 					return items.filter((x) =>
// 						x.name.toLowerCase().includes(target.value)
// 					);
// 			},
// 		});
// 	};

// 	const addOrEdit = async (formData, resetForm) => {
// 		if (formData.id === 0) {
// 			delete formData.id;
// 			const resp = await ioModuleService.saveIoModule(formData);
// 			setIoModules(resp.data);
// 			setPageRefresh(true);
// 		} else {
// 			const resp = await ioModuleService.saveIoModule(formData);
// 			setIoModules(resp.data);
// 			setPageRefresh(true);
// 		}
// 		resetForm();
// 		setRecordForEdit(null);
// 		setOpenPopup(false);
// 		setPageRefresh(false);
// 		//setIoModules(ioModules)
// 		setNotify({
// 			isOpen: true,
// 			message: "Submitted Successfully.",
// 			type: "success",
// 		});
// 	};

// 	const openInPopup = (item) => {
// 		setRecordForEdit(item);
// 		setOpenPopup(true);
// 	};

// 	const onDelete = async (_id) => {
// 		setConfirmDialog({
// 			...confirmDialog,
// 			isOpen: false,
// 		});
// 		await ioModuleService.deleteIoModule(_id);
// 		setPageRefresh(true);
// 		setNotify({
// 			isOpen: true,
// 			message: "Deleted Successfully.",
// 			type: "error",
// 		});
// 		setPageRefresh(false);
// 	};

// 	React.useEffect(() => {
// 		async function fetchIoModules() {
// 			try {
// 				const resp = await ioModuleService.getIoModules();
// 				console.log("ioModules: fetching iomods:", resp.data);
// 				setIoModules(resp.data);
// 				setPageRefresh(true);
// 			} catch (error) {}
// 		}
// 		fetchIoModules();
// 	}, [pageRefresh]);

// 	const [open, setOpen] = React.useState(false);

// 	return (
// 		<>
// 			<PageHeader
// 				title='Module Configuration'
// 				subTitle='Diamond Inya'
// 				icon={<MemoryIcon fontSize='large' />}
// 			/>

// 			<Paper className={classes.pageContent}>
// 				<Toolbar>
// 					<Controls.Input
// 						className={classes.searchInput}
// 						label='Search by Module name...'
// 						InputProps={{
// 							startAdornment: (
// 								<InputAdornment position='start'>
// 									<SearchIcon />
// 								</InputAdornment>
// 							),
// 						}}
// 						onChange={handleSearch}
// 					/>

// 					<Controls.Button
// 						className={classes.newButton}
// 						text='Add New'
// 						variant='outlined'
// 						startIcon={<AddIcon />}
// 						onClick={() => {
// 							setOpenPopup(true);
// 							setRecordForEdit(null);
// 						}}
// 					/>
// 				</Toolbar>

// 				<TblContainer>
// 					<TblHead />
// 					<TableBody>
// 						{recordsAfterPagingAndSorting().map((item) => (
// 							<TableRow key={item._id}>
// 								{/* <TableCell>
// 									<IconButton
// 										aria-label='expand row'
// 										size='small'
// 										onClick={() => setOpen(!open)}
// 									>
// 										{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// 									</IconButton>
// 									<Collapse in={open} timeout='auto' unmountOnExit>
// 										<Card>
// 											{item.numberOfRelayss.map((r) =>
// 												r.inUsed === true ? (
// 													<div key={r._id}>
// 														<HdrStrongIcon color='secondary' key={r._id} />
// 														<Typography> {r.name} </Typography>
// 													</div>
// 												) : (
// 													<div key={r._id}>
// 														<HdrWeakIcon color='primary' key={r._id} />
// 														<Typography> {r.name} </Typography>
// 													</div>
// 												)
// 											)}
// 										</Card>
// 									</Collapse>
// 								</TableCell> */}
// 								<TableCell> {item.name} </TableCell>
// 								<TableCell> {item.description} </TableCell>
// 								<TableCell> {item.ip} </TableCell>
// 								<TableCell> {item.username} </TableCell>
// 								<TableCell> {item.password} </TableCell>
// 								<TableCell> {item.numberOfRelays} </TableCell>
// 								<TableCell>
// 									<Controls.ActionButton
// 										color='primary'
// 										onClick={() => {
// 											openInPopup(item);
// 										}}
// 									>
// 										<EditOutlinedIcon fontSize='small' />
// 									</Controls.ActionButton>

// 									<Controls.ActionButton
// 										color='secondary'
// 										onClick={() => {
// 											setConfirmDialog({
// 												isOpen: true,
// 												title: "Are you sure to delete this record?",
// 												subTitle: "You can't undo this operation.",
// 												onConfirm: () => {
// 													onDelete(item._id);
// 												},
// 											});
// 										}}
// 									>
// 										<CloseIcon fontSize='small' />
// 									</Controls.ActionButton>
// 								</TableCell>
// 							</TableRow>
// 						))}
// 					</TableBody>
// 				</TblContainer>
// 				<TblPagination />
// 			</Paper>

// 			<Popup
// 				title='Module Configuration'
// 				openPopup={openPopup}
// 				setOpenPopup={setOpenPopup}
// 			>
// 				<IoModuleForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
// 			</Popup>

// 			<Notification notify={notify} setNotify={setNotify} />
// 			<ConfirmDialog
// 				confirmDialog={confirmDialog}
// 				setConfirmDialog={setConfirmDialog}
// 			/>
// 		</>
// 	);
// }
