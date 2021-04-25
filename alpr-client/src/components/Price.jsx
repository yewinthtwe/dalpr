import React from "react";
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
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
import PriceForm from "./Forms/PriceForm";
import * as priceService from "../services/priceService";
// import http from "../services/httpService";
import Popup from "./common/Popup";
import Notification from "./common/Notification";
import ConfirmDialog from "./common/ConfirmDialog";
import { withRouter } from "react-router-dom";
// import _ from "lodash";

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
	{ id: "name", label: "Price Name" },
	{ id: "rate", label: "Rate" },
	{ id: "billingCircle", label: "Billing Circle (minutes)" },
	{ id: "discountEntitleMinutes", label: "Free Minutes" },
	{ id: "discountPercent", label: "Discount Percent" },
	{ id: "discountedRate", label: "Discounted Rate" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function Price(props) {
	// const { history } = props;
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = React.useState(null);
	const [price, setPrice] = React.useState([]);
	const [filterFn, setFilterFn] = React.useState({
		fn: (items) => {
			return items;
		},
	});
	const [pageRefresh, setPageRefresh] = React.useState(false);
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
	} = useTable(price, headCells, filterFn);

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

	const addOrEdit = async (price, resetForm) => {
		if (price.id === 0) {
			delete price.id;
			await priceService.savePrice(price);
			setPageRefresh(true);
		} else {
			await priceService.savePrice(price);
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
		await priceService.deletePrice(_id);
		setPageRefresh(true);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully.",
			type: "error",
		});
	};

	React.useEffect(() => {
		async function fetchPrice() {
			try {
				const prices = await priceService.getPrice();
				setPrice(prices);
				setPageRefresh(true);
			} catch (error) {}
		}
		fetchPrice();
	}, [pageRefresh]);

	// function handleCalculation(item) {
	// 	console.log("AlprPrice: handleCalculation: ", item);
	// 	// discountPercent% * X = Y
	// 	// {
	// 	// 	"name": "price1",
	// 	// 	"rate": 500,
	// 	// 	"billingCircle": 30,
	// 	// 	"discountEntitleMinutes": 30,
	// 	// 	"discountPercent": 20,
	// 	// 	"discountedRate": 0,
	// 	// 	"__v": 0,
	// 	// 	"status": false
	// 	// }
	// 	// let percent = _.divide(item.discountPercent, 100);

	// 	// if(item.billingCircle > 30 ) {
	// 	// 	_.multiply(percent, )
	// 	// }
	// }

	return (
		<>
			<PageHeader
				title='Price Configuration'
				subTitle='Diamond Inya'
				icon={<MonetizationOnIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search by Price name...'
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
								<TableCell> {item.rate} </TableCell>
								<TableCell> {item.billingCircle} </TableCell>
								<TableCell> {item.discountEntitleMinutes} </TableCell>
								<TableCell> {item.discountPercent} </TableCell>
								<TableCell>{}</TableCell>
								<TableCell> {item.status ? "Enable" : "Disabled"} </TableCell>
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
				title='Price Configuration'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<PriceForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</Popup>

			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default withRouter(Price);
