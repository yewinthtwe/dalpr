import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
	Paper,
	makeStyles,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	Grid,
	Chip,
	Toolbar,
	InputAdornment,
} from "@material-ui/core";
import AlprControls from "./AlprControls";
import AlprMemberForm from "./AlprMemberForm";
import useAlprTable from "./useAlprTable";
import * as obuService from "../services/AlprObuService";
import AlprPopup from "./AlprPopup";
import AlprNotification from "./AlprNotification";
import AlprConfirmDialog from "./AlprConfirmDialog";
import AlprPageHeader from "./AlprPageHeader";
import http from "../services/httpService";
import { withRouter } from "react-router-dom";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: theme.spacing(5),
	},
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
	chip: {},
}));

const headCells = [
	{ id: "srNo", label: "Serial Number" },
	{ id: "obuId", label: "OBU Number" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprObus(props) {
	const { history } = props;
	const classes = useStyles();

	const [pageRefresh, setPageRefresh] = React.useState(false);
	const [obus, setObus] = React.useState([]);
	const [inUsedObu, setInUsedObu] = React.useState([]);
	const [remainingObu, setRemainingObu] = React.useState(0);

	React.useEffect(() => {
		const source = http.getCancelToken();
		async function fetchObus() {
			const data = await obuService.getObuCollection(source);
			setObus(data);
			setInUsedObu(_.filter(data, ["inUsed", true]));
			let obuLeft = obus.length - inUsedObu.length;
			setRemainingObu(obuLeft);
			setPageRefresh(true);
		}
		fetchObus();
		// eslint-disable-next-line
	}, [history.location.pathname, pageRefresh]);

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
	} = useAlprTable(obus, headCells, filterFn);

	const addOrEdit = () => {
		setNotify({
			isOpen: true,
			message: "Please contact Qfree for more information.",
			type: "success",
		});
	};

	const openInPopup = () => {
		setNotify({
			isOpen: true,
			message: "Please contact Qfree for more information.",
			type: "success",
		});
	};

	const onDelete = () => {
		setNotify({
			isOpen: true,
			message: "Please contact Qfree for more information.",
			type: "success",
		});
	};

	// const searchValue = "2D98";
	// const array = [
	// 	{ plate: "2D9802", id: "0" },
	// 	{ plate: "2D9822", id: "1" },
	// 	{ plate: "1M6655", id: "2" },
	// ];

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (obus) => {
				if (target.value === "") return obus;
				else
					return _.filter(obus, (p) => {
						return p.obuId.toLowerCase().includes(target.value);
					});
			},
		});
	};

	return (
		<>
			<AlprPageHeader
				title='On-Board Unit'
				subTitle='Vehicle Access Control'
				icon={<SettingsRemoteIcon fontSize='large' />}
			></AlprPageHeader>

			<Grid container spacing={2} className={classes.root}>
				<Grid item xs={12}>
					<Chip label={`In-Used : ${inUsedObu.length}`} color='primary' />
					<Chip label={`Remaining: ${remainingObu}`} color='secondary' />
					<Chip label={`Total: ${obus.length}`} />
				</Grid>
			</Grid>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
						className={classes.searchInput}
						label='Search by OBU number...'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting().map((item) => (
							<TableRow key={item._id}>
								<TableCell> {item.srNo} </TableCell>
								<TableCell> {item.obuId} </TableCell>
								<TableCell>
									{" "}
									{item.inUsed ? (
										<Typography color='secondary'> In Used </Typography>
									) : (
										"Available"
									)}{" "}
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
											onDelete();
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
				title='OBU (On-Board-Unit)'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprMemberForm
					// recordForEdit={ recordForEdit }
					recordForEdit={null}
					addOrEdit={addOrEdit}
				/>
			</AlprPopup>

			<AlprNotification notify={notify} setNotify={setNotify} />

			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			{/* <pre> {JSON.stringify(result, null, 2)} </pre> */}
		</>
	);
}

export default withRouter(AlprObus);
