import React from "react";
import SearchIcon from "@material-ui/icons/Search";
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
import Controls from "./common/Controls";
// import MemberForm from "./memberForm";
// import CloseIcon from "@material-ui/icons/Close";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import Popup from "./Popup";s
import useTable from "./common/useTable";
import * as obuService from "../services/obuService";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
import PageHeader from "./common/PageHeader";
// import http from "../services/httpService";
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
];

function Obus() {
	// const { history } = props;
	const classes = useStyles();

	const [pageRefresh, setPageRefresh] = React.useState(false);
	const [obus, setObus] = React.useState([]);
	const [inUsedObu, setInUsedObu] = React.useState([]);
	const [remainingObu, setRemainingObu] = React.useState(0);

	React.useEffect(() => {
		async function fetchObus() {
			const response = await obuService.getObuCollection();
			showNoti(response);
			setObus(response.data);
			setInUsedObu(_.filter(response.data, ["inUsed", true]));
			let obuLeft = obus.length - inUsedObu.length;
			setRemainingObu(obuLeft);
			setPageRefresh(true);
		}
		fetchObus();
		// setPageRefresh(false);
		// eslint-disable-next-line
	}, [pageRefresh]);

	const [filterFn, setFilterFn] = React.useState({
		fn: (items) => {
			return items;
		},
	});

	// const [openPopup, setOpenPopup] = React.useState(false);
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

	const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
		useTable(obus, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (item) => {
				if (target.value === "") return item;
				else
					return _.filter(item, (p) => {
						return p.obuId.toLowerCase().includes(target.value.toLowerCase());
					});
			},
		});
	};

	const showNoti = (resp) => {
		if (resp.status >= 400) {
			setNotify({
				isOpen: true,
				message: resp.data,
				type: "error",
			});
		} else {
			setNotify({
				isOpen: true,
				message: "Submitted Successfully.",
				type: "success",
			});
		}
	};

	return (
		<>
			<PageHeader
				title='On-Board Unit'
				subTitle='OBU database is read only. Changes are not allowed.'
				icon={<SettingsRemoteIcon fontSize='large' />}
			></PageHeader>

			<Grid container spacing={2} className={classes.root}>
				<Grid item xs={12}>
					<Chip label={`In-Used : ${inUsedObu.length}`} color='primary' />
					<Chip label={`Total: ${obus.length}`} />
					<Chip label={`Remaining: ${remainingObu}`} color='secondary' />
				</Grid>
			</Grid>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
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
							<TableRow key={item?._id}>
								<TableCell> {item?.srNo} </TableCell>
								<TableCell> {item?.obuId} </TableCell>
								<TableCell>
									{" "}
									{item.inUsed ? (
										<Typography color='secondary'> In Used </Typography>
									) : (
										"Available"
									)}{" "}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>

			<Notification notify={notify} setNotify={setNotify} />

			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			{/* <pre> {JSON.stringify(result, null, 2)} </pre> */}
		</>
	);
}

export default withRouter(Obus);
