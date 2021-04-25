import React, { useState, useEffect } from "react";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {
	Paper,
	makeStyles,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
} from "@material-ui/core";
import Controls from "../components/Controls";
import PageHeader from "../components/PageHeader";
import useAlprTable from "../components/useAlprTable";
import * as inOutRecordService from "../services/AlprInOutRecordServices";
import http from "../services/httpService";
import { withRouter } from "react-router-dom";
// import Collapse from '@material-ui/core/Collapse';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import IconButton from '@material-ui/core/IconButton';

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
	{ id: "lp", label: "License Plate" },
	{ id: "obu", label: "OBU Tag" },
	{ id: "inTime", label: "In Time" },
	{ id: "outTime", label: "Out Time" },
	{ id: "direction", label: "direction" },
];

function AlprInOutRecord(props) {
	const { history } = props;
	const classes = useStyles();

	const [inOutRecords, setInOutRecords] = useState([]);
	const [pageRefresh, setPageRefresh] = useState(false);
	// const [open, setOpen] = React.useState(false);

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useAlprTable(inOutRecords, headCells, filterFn);

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

	React.useEffect(() => {
		async function fetchInOutRecords() {
			try {
				const inOutRecords = await inOutRecordService.getInOutRecords();
				setInOutRecords(inOutRecords.data);
				setPageRefresh(true);
			} catch (error) {}
		}
		fetchInOutRecords();
		setPageRefresh(false);
	}, [pageRefresh]);

	const handleClick = (itemId) => {
		console.log("AlprInOutRecordJS: hendleClick:", itemId);
	};

	return (
		<>
			<PageHeader
				title='In Out Logs'
				subTitle='In Out Logs'
				icon={<MenuBookIcon fontSize='large' />}
			/>

			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search license plate...'
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
							<TableRow
								key={item._id}
								onClick={(event) => handleClick(item._id)}
							>
								{/* <Collapse in={open} timeout="auto" unmountOnExit></Collapse> */}
								<TableCell> {item.lp} </TableCell>
								<TableCell> {item.obu} </TableCell>
								<TableCell> {item.inTime} </TableCell>
								<TableCell> {item.outTime} </TableCell>
								<TableCell> {item.direction} </TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
		</>
	);
}

export default withRouter(AlprInOutRecord);
