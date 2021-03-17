import React, { useState, useEffect } from "react";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
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
import AlprMemberForm from "./AlprMemberForm";
import useAlprTable from "./useAlprTable";
import * as memberService from "../services/AlprMemberService";
import AlprPopup from "./AlprPopup";
import AlprNotification from "./AlprNotification";
import AlprConfirmDialog from "./AlprConfirmDialog";
import http from "../services/httpService";
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
	{ id: "memberName", label: "Member Name" },
	{ id: "licensePlate", label: "License Plate" },
	{ id: "obu", label: "OBU Number" },
	{ id: "address", label: "Address" },
	{ id: "mobile", label: "Mobile" },
	{ id: "email", label: "Email" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function AlprMembers(props) {
	const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const [members, setMembers] = useState([]);
	const [pageRefresh, setPageRefresh] = useState(false);

	useEffect(() => {
		const source = http.getCancelToken();
		async function fetchMembers() {
			const data = await memberService.getMembers(source);
			setMembers(data);
			setPageRefresh(true);
		}
		fetchMembers();
		return () => {
			source.cancel();
		};
	}, [history.location.pathname, pageRefresh]);

	const [filterFn, setFilterFn] = useState({
		fn: (members) => {
			return members;
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

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useAlprTable(members, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((x) =>
						x.memberName.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = async (member, resetForm) => {
		const source = http.getCancelToken();
		if (member.id === 0) {
			delete member.id;
			await memberService.saveMember(member, source);
			setPageRefresh(false);
		} else {
			await memberService.saveMember(member, source);
			setPageRefresh(false);
		}
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setMembers(members)
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

	const onDelete = (_id) => {
		const source = http.getCancelToken();

		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		memberService.deleteMember(_id, source);
		setPageRefresh(false);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	return (
		<>
			<AlprPageHeader
				title='Members'
				subTitle='Diamond Inya'
				icon={<AssignmentIndIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<AlprControls.Input
						className={classes.searchInput}
						label='Search by Member name...'
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
								<TableCell> {item.memberName} </TableCell>
								<TableCell> {item.licensePlate} </TableCell>
								<TableCell> {item.obu.obuId} </TableCell>
								<TableCell> {item.address} </TableCell>
								<TableCell> {item.mobile} </TableCell>
								<TableCell> {item.email} </TableCell>
								<TableCell>
									{" "}
									{item.isActive === true ? "Active" : "Inactive"}{" "}
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
				title='Member Registration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AlprMemberForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</AlprPopup>

			<AlprNotification notify={notify} setNotify={setNotify} />

			<AlprConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(AlprMembers);
