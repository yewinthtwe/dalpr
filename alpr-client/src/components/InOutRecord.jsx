import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import PageHeader from "./common/PageHeader";
import * as inOutRecordService from "../services/inOutRecordService";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchBar from "material-ui-search-bar";
// import { withRouter } from "react-router-dom";
import { imageUrl } from "../config.json";
import {
	makeStyles,
	Tab,
	Tabs,
	Divider,
	Paper,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	Typography,
	Table,
	TablePagination,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	IconButton,
	Collapse,
	Grid,
	Box,
} from "@material-ui/core";

// import http from "../services/httpService";
//import { nanoid } from 'nanoid'
//import { deleteObu } from './../services/AlprMemberServices';
//import SearchIcon from '@material-ui/icons/Search';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import Controls from './Controls';

const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},

	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},

	avatar: {
		backgroundColor: "#A663CC",
	},
	searchInput: {
		width: "75%",
	},
});

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function Row(props) {
	// const classes = useStyles();
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const inTime = row.inTime
		? format(new Date(`${row.inTime}`), "dd MMM yyyy iii ppp")
		: "N/A";
	const outTime = row.outTime
		? format(new Date(`${row.outTime}`), "dd MMM yyyy iii ppp")
		: "N/A";

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				{/* <TableRow className={classes.root}> */}
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					{" "}
					{row.lp}{" "}
				</TableCell>
				<TableCell> {inTime} </TableCell>
				<TableCell> {outTime}</TableCell>
				<TableCell> {row.direction} </TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box margin={1}>
							<Typography variant='h6' gutterBottom>
								Recorded Vehicle Information
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={8}>
									<Card>
										<CardHeader></CardHeader>
										<Tabs
											value={value}
											onChange={handleChange}
											aria-label='vehicle photo'
										>
											<Tab label='Entry Photo' {...a11yProps(0)} />
											<Tab label='Exit Photo' {...a11yProps(1)} />
										</Tabs>
										<CardContent>
											<TabPanel value={value} index={0}>
												<CardMedia
													component='li'
													className={classes.media}
													title='entryPhoto'
													image={`${imageUrl}${row.inPhoto}`}
												/>
											</TabPanel>

											<TabPanel value={value} index={1}>
												<CardMedia
													component='li'
													className={classes.media}
													title='exitPhoto'
													image={`${imageUrl}${row.outPhoto}`}
												/>
											</TabPanel>
										</CardContent>
									</Card>
								</Grid>
								<Grid
									alignContent='flex-start'
									item
									xs={4}
									container
									direction='row'
								>
									<Grid item xs={12}>
										<Divider />
										<Typography variant='subtitle2'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={16}
												lineHeight={2}
												textAlign='center'
											>
												Vehicle Information Details
											</Box>
										</Typography>
										<Divider />
									</Grid>

									<Grid item xs={6}>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												License Plate
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												In Time
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												Out Time
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												Member
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												OBU
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												Ticket ID
											</Box>
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												{row.lp}
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												{row.inTime ? row.inTime : "N/A"}
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												{row.outTime ? row.outTime : "N/A"}
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												{row.isMember ? "Member" : "Non-Member"}
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												{row.obu ? row.obu : "N/A"}
											</Box>
										</Typography>
										<Typography variant='subtitle1'>
											<Box
												fontWeight='fontWeightRegular'
												fontSize={14}
												lineHeight={4}
												textAlign='left'
											>
												{row.ticket.ticketId ? row.ticket.ticketId : "N/A"}
											</Box>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		lp: PropTypes.array.isRequired,
		inTime: PropTypes.string,
		outTime: PropTypes.string,
		obu: PropTypes.string,
		direction: PropTypes.string.isRequired,
		ticket: PropTypes.object,
	}).isRequired,
};

export function InOutRecord(props) {
	const [rows, setRows] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [searched, setSearched] = React.useState("");
	//const { history } = props;
	// const [pageRefresh, setPageRefresh] = React.useState(false);
	// const [records, setRecords] = React.useState([]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	React.useEffect(() => {
		(async () => {
			const inOutRecords = await inOutRecordService.getInOutRecords();
			setRows(inOutRecords.data);
			// setPageRefresh(true);
			//setRows(records);
			//setRecords(inOutRecords.data);
		})();
	}, []);

	const requestSearch = (searchedVal) => {
		const filteredRows = rows.filter((row) => {
			return row.lp
				.toString()
				.toLowerCase()
				.includes(searchedVal.toLowerCase());
		});
		setRows(filteredRows);
	};

	const cancelSearch = () => {
		setSearched("");
		requestSearch(searched);
	};

	return (
		<>
			<PageHeader
				title='Vehicle In/Out Records'
				subTitle='Diamond Inya'
				icon={<MenuBookIcon fontSize='large' />}
			/>

			<Paper>
				<SearchBar
					value={searched}
					onChange={(searchVal) => requestSearch(searchVal)}
					onCancelSearch={() => cancelSearch()}
				/>
			</Paper>

			<TableContainer component={Paper}>
				<Table aria-label='Vehicle In-Out record table'>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>License Plate</TableCell>
							<TableCell>In Time</TableCell>
							<TableCell>Out Time</TableCell>
							<TableCell>direction</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row key={row._id} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</>
	);
}
