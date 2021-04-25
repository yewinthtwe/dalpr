import React from "react";
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
import Controls from "./common/Controls";
import PageHeader from "./common/PageHeader";
import useTable from "./common/useTable";
import GeneralSettingForm from "./Forms/GeneralSettingForm";
import * as generalSettingService from "../services/generalSettingService";
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
	{ id: "serverName", label: "Server Name" },
	{ id: "ip", label: "IP Address" },
	{ id: "port", label: "Port" },
	{ id: "apiUrl", label: "API Url" },
	{ id: "photoStore", label: "Photo Store" },
	{ id: "configuredLanes", label: "Number of Lanes" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function GeneralSetting(props) {
	// const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [generalSetting, setGeneralSetting] = React.useState([]);
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
	} = useTable(generalSetting, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((x) =>
						x.serverName.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = async (generalSetting, resetForm) => {
		if (generalSetting.id === 0) {
			delete generalSetting.id;
			await generalSettingService.saveGeneralSetting(generalSetting);
			setPageRefresh(true);
		} else {
			await generalSettingService.saveGeneralSetting(generalSetting);
			setPageRefresh(true);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setPageRefresh(false);
		//setGeneralSetting(generalSetting)
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
		await generalSettingService.deleteGeneralSetting(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	React.useEffect(() => {
		async function fetchGeneralSetting() {
			try {
				const generalSetting = await generalSettingService.getGeneralSetting();
				setGeneralSetting(generalSetting.data);
				setPageRefresh(true);
			} catch (error) {
				console.log("GeneralSetting:", error);
			}
		}
		fetchGeneralSetting();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='General Setting'
				subTitle='Diamond Inya'
				icon={<DirectionsCarIcon fontSize='large' />}
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
								<TableCell> {item.serverName} </TableCell>
								<TableCell> {item.ip} </TableCell>
								<TableCell> {item.port} </TableCell>
								<TableCell> {item.apiUrl} </TableCell>
								<TableCell> {item.photoStore} </TableCell>
								<TableCell> {item.configuredLanes} </TableCell>
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
				title='General Setting'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<GeneralSettingForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
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

export default withRouter(GeneralSetting);
