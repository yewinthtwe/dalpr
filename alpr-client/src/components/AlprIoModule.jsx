import React, { useState, useEffect } from "react";
import MemoryIcon from "@material-ui/icons/Memory";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import HdrStrongIcon from "@material-ui/icons/HdrStrong";
import HdrWeakIcon from "@material-ui/icons/HdrWeak";
import {
	Paper,
	makeStyles,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
	IconButton,
	Collapse,
	Card,
	Typography,
} from "@material-ui/core";
import AlprControls from "./AlprControls";
import AlprPageHeader from "./AlprPageHeader";
import AlprIoModuleForm from "./AlprIoModuleForm";
import useAlprTable from "./useAlprTable";
import * as ioModuleService from "../services/AlprIoModuleService";
import http from "../services/httpService";
import AlprPopup from "./AlprPopup";
import AlprNotification from "./AlprNotification";
import AlprConfirmDialog from "./AlprConfirmDialog";
import { withRouter } from "react-router-dom";
//import _ from "lodash";
// import { handleInputChange } from "react-select/src/utils";

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
	{ id: "relays", label: "Relay" },
	{ id: "name", label: "Module Name" },
	{ id: "description", label: "Description" },
	{ id: "ip", label: "IP Address" },
	{ id: "username", label: "Login Name" },
	{ id: "password", label: "Password" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprIoModule(props) {
	const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [ioModules, setIoModules] = useState([]);
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
	} = useAlprTable(ioModules, headCells, filterFn);

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

	const addOrEdit = async (ioModule, resetForm) => {
		const source = http.getCancelToken();

		if (ioModule.id === 0) {
			delete ioModule.id;
			await ioModuleService.saveIoModule(ioModule, source);
		} else {
			await ioModuleService.saveIoModule(ioModule, source);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
		//setIoModules(ioModules)
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
		await ioModuleService.deleteIoModule(_id, source);
		setPageRefresh(false);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	useEffect(() => {
		const source = http.getCancelToken();

		async function fetchIoModules() {
			try {
				const ioModules = await ioModuleService.getIoModules(source);
				setIoModules(ioModules);
				setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchIoModules();

		return () => {
			source.cancel();
		};
	}, [history.location.pathname, pageRefresh]);

	const [open, setOpen] = React.useState(false);

	return (
		<>
			<AlprPageHeader
				title='Module Configuration'
				subTitle='Diamond Inya'
				icon={<MemoryIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
						className={classes.searchInput}
						label='Search by Module name...'
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
								<TableCell>
									<IconButton
										aria-label='expand row'
										size='small'
										onClick={() => setOpen(!open)}
									>
										{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
									</IconButton>
									<Collapse in={open} timeout='auto' unmountOnExit>
										<Card>
											{item.relays.map((r) =>
												r.inUsed === true ? (
													<div key={r._id}>
														<HdrStrongIcon color='secondary' key={r._id} />
														<Typography> {r.name} </Typography>
													</div>
												) : (
													<div key={r._id}>
														<HdrWeakIcon color='primary' key={r._id} />
														<Typography> {r.name} </Typography>
													</div>
												)
											)}
										</Card>
									</Collapse>
								</TableCell>
								<TableCell> {item.name} </TableCell>
								<TableCell> {item.description} </TableCell>
								<TableCell> {item.ip} </TableCell>
								<TableCell> {item.username} </TableCell>
								<TableCell> {item.password} </TableCell>
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
				title='Module Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprIoModuleForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</AlprPopup>

			<AlprNotification notify={notify} setNotify={setNotify} />
			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprIoModule);
