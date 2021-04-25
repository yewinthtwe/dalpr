import React from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { withRouter } from "react-router-dom";
import {
	Paper,
	makeStyles,
	TableBody,
	TableRow,
	TableCell,
	// Toolbar,
	// InputAdornment,
} from "@material-ui/core";
import PageHeader from "./common/PageHeader";
import useTable from "./common/useTable";
import * as reportService from "../services/reportService";
import { format } from "date-fns";
// import Popup from "./Popup";
// import Notification from "./Notification";
// import ConfirmDialog from "./ConfirmDialog";
// import SearchIcon from "@material-ui/icons/Search";
// import AddIcon from "@material-ui/icons/Add";
// import CloseIcon from "@material-ui/icons/Close";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import ReportForm from "./ReportForm";
// import Controls from "./Controls";
// import http from "../services/httpService";

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
	{ id: "date", label: "Date" },
	{ id: "lp", label: "Plate" },
	{ id: "inTime", label: "In Time" },
	{ id: "outTime", label: "Out Time" },
	{ id: "parkedMinutes", label: "Parked Time" },
	{ id: "parkingFee", label: "Fee" },
	{ id: "ticketId", label: "Ticket ID" },
	{ id: "isMember", label: "Member Status" },
];

function Report(props) {
	// const { history } = props;
	const classes = useStyles();
	const [report, setReport] = React.useState([]);
	const [filterFn, setFilterFn] = React.useState({
		fn: (items) => {
			return items;
		},
	});

	const [pageRefresh, setPageRefresh] = React.useState(false);

	const { TblContainer, TblHead, TblPagination } = useTable(
		report,
		headCells,
		filterFn
	);

	React.useEffect(() => {
		async function fetchReport() {
			try {
				const report = await reportService.getAllReport();
				setReport(report);
				setPageRefresh(true);
			} catch (error) {}
		}
		fetchReport();
	}, [pageRefresh]);

	return (
		<>
			<PageHeader
				title='Report'
				subTitle='Vehicle Access Control'
				icon={<PeopleAltIcon fontSize='large' />}
			/>
			<Paper className={classes.pageContent}>
				<TblContainer>
					<TblHead />
					<TableBody>
						{report.map((item) => (
							<TableRow key={item._id}>
								<TableCell>
									{" "}
									{item.createdAt
										? format(new Date(item.createdAt), "dd/MM/yyy")
										: "N/A"}{" "}
								</TableCell>
								<TableCell> {item.lp} </TableCell>
								<TableCell>
									{" "}
									{item.inTime
										? format(new Date(item.inTime), "ppp")
										: "N/A"}{" "}
								</TableCell>
								<TableCell>
									{" "}
									{item.outTime
										? format(new Date(item.outTime), "ppp")
										: "N/A"}{" "}
								</TableCell>
								<TableCell> {item.ticket.parkedMinutes} </TableCell>
								<TableCell> {item.ticket.parkingFee} </TableCell>
								<TableCell> {item.ticket.ticketId} </TableCell>
								<TableCell>
									{" "}
									{item.isMember ? "Member" : "Non-member"}{" "}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
		</>
	);
}

export default withRouter(Report);
