import React from "react";
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
import Controls from "./common/Controls";
import PageHeader from "./common/PageHeader";
//import MemberForm from "./Forms/MemberForm";
import MemberFormV2 from "./Forms/MemberFormV2";
import useTable from "./common/useTable";
import * as memberService from "../services/memberService";
import Popup from "./common/Popup";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
import _ from "lodash";
// import http from "../services/httpService";
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
	{ id: "memberName", label: "Member Name" },
	{ id: "memberType", label: "Member Type" },
	{ id: "registrationDate", label: "Reg. Date" },
	{ id: "expireDate", label: "Expire Date" },
	{ id: "lp", label: "License Plate" },
	{ id: "obu", label: "OBU Number" },
	{ id: "address", label: "Address" },
	{ id: "mobile", label: "Mobile" },
	{ id: "email", label: "Email" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function Member(props) {
	//const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [openPopup, setOpenPopup] = React.useState(false);
	const [members, setMembers] = React.useState([]);
	const [pageRefresh, setPageRefresh] = React.useState(false);

	const [filterFn, setFilterFn] = React.useState({
		fn: (item) => {
			return item;
		},
	});

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
	} = useTable(members, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((x) =>
						x.memberName.toLowerCase().includes(target.value.toLowerCase())
					);
			},
		});
	};

	const addOrEdit = async (member, resetForm) => {
		if (member.id === 0) {
			console.log("MemberJsx: addOrEdit: New member:", member);
			await memberService.saveMember(member);
			setPageRefresh(true);
		} else {
			member.lp = _.map(member.lp, "plate");
			console.log("MemberJsx: addOrEdit: Update member:", member);
			await memberService.saveMember(member);
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
		await memberService.deleteMember(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
		setPageRefresh(false);
	};

	React.useEffect(() => {
		async function fetchData() {
			try {
				const response = await memberService.getMembers();
				//console.log("MemberJsx: response:", response.data);
				setMembers(response.data);
				setPageRefresh(true);
			} catch (error) {
				console.log("MemberJsx:", error);
			}
		}
		fetchData();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='Members'
				subTitle='Residential Vehicle owners, Diamond Inya'
				icon={<AssignmentIndIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
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
								<TableCell> {item.memberName} </TableCell>
								<TableCell> {item.memberType} </TableCell>
								<TableCell> {item.registrationDate} </TableCell>
								<TableCell> {item.expireDate} </TableCell>
								<TableCell>
									{" "}
									{item.lp[0].plate} {item.lp.length > 1 ? "..." : ""}
								</TableCell>
								<TableCell> {item.obu.obuId} </TableCell>
								<TableCell> {item.address} </TableCell>
								<TableCell> {item.mobile} </TableCell>
								<TableCell> {item.email} </TableCell>
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
				title='Member Registration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				{/* <MemberForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
				<MemberFormV2
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
				></MemberFormV2>
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default Member;
