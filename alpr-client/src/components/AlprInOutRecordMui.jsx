import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SearchBar from "material-ui-search-bar";
import * as inOutRecordService from "../services/AlprInOutRecordService";
import http from "../services/httpService";
import { withRouter } from "react-router-dom";
import { imageUrl } from "../config.json";
import AlprPageHeader from "./AlprPageHeader";

//import { nanoid } from 'nanoid'
//import { deleteObu } from './../services/AlprMemberServices';
//import SearchIcon from '@material-ui/icons/Search';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import AlprControls from './AlprControls';

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
					{row.licensePlate}{" "}
				</TableCell>
				<TableCell> {row.inTime ? row.inTime : "N/A"} </TableCell>
				<TableCell> {row.outTime ? row.outTime : "N/A"}</TableCell>
				<TableCell> {row.Direction} </TableCell>
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
												{row.licensePlate}
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
		licensePlate: PropTypes.array.isRequired,
		inTime: PropTypes.string.isRequired,
		outTime: PropTypes.string.isRequired,
		obu: PropTypes.string.isRequired,
		Direction: PropTypes.string.isRequired,
		ticket: PropTypes.object,
	}).isRequired,
};

function AlprInOutRecordMui(props) {
	const [records, setRecords] = React.useState([]);
	const [rows, setRows] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [searched, setSearched] = React.useState("");
	//const { history } = props;
	const [pageRefresh, setPageRefresh] = React.useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	React.useEffect(() => {
		const source = http.getCancelToken();

		async function fetchInOutRecords() {
			const inOutRecords = await inOutRecordService.getInOutRecords(source);
			setRecords(inOutRecords.data);
			setPageRefresh(true);
			setRows(records);
		}

		fetchInOutRecords();
		return () => {
			source.cancel("AlprInOutRecordMui: cancel call");
		};
	}, [pageRefresh, records]);

	const requestSearch = (searchedVal) => {
		const filteredRows = records.filter((row) => {
			return row.licensePlate
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
			<AlprPageHeader
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
							<TableCell>Direction</TableCell>
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
export default withRouter(AlprInOutRecordMui);
