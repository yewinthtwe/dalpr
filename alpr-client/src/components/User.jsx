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
import UserForm from "./Forms/UserForm";
import useTable from "./common/useTable";
import * as userService from "../services/userService";
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
	{ id: "username", label: "User Name" },
	{ id: "password", label: "Password" },
	{ id: "name", label: "Full Name" },
	{ id: "email", label: "Email" },
	{ id: "isAdmin", label: "Role" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function User() {
	// const { history } = props;
	const classes = useStyles();
	//const { authUser } = React.useContext(AuthApi);
	//console.log("UserJs:", authUser);
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [users, setUsers] = React.useState([]);
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
	} = useTable(users, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;

		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((x) =>
						x.username.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = async (user, resetForm) => {
		if (user.id === 0) {
			delete user.id;
			await userService.saveUser(user);
			setPageRefresh(true);
		} else {
			await userService.saveUser(user);
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
		await userService.deleteUser(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
		setPageRefresh(false);
	};

	React.useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await userService.getUsers();
				setUsers(response.data);
				setPageRefresh(true);
			} catch (error) {
				console.log("userJSX:", error);
			}
		}
		fetchUsers();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='System User'
				subTitle='Vehicle Access Control system admin user and normal users can be defined here.'
				icon={<PeopleAltIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search by User name...'
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
								<TableCell> {item.username} </TableCell>
								<TableCell> {item.password} </TableCell>
								<TableCell> {item.name} </TableCell>
								<TableCell> {item.email} </TableCell>
								<TableCell>
									{" "}
									{item.isAdmin === true ? "Admin" : "Normal"}{" "}
								</TableCell>
								<TableCell>
									{" "}
									{item.isActive === true ? "Active" : "Inactive"}{" "}
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
				title='System User'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<UserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</Popup>

			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}
