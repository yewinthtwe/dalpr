import React, { Component } from "react";
import InOutRecordTable from "./InOutRecordTable";
import Pagination from "./common/pagination";
import { getInOutRecords } from "../services/inOutRecordServices";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns-tz";
import { toDate } from "date-fns";

class InOutRecord extends Component {
	state = {
		inOutRecords: [],
		currentPage: 1,
		pageSize: 10,
		searchQuery: "",
		sortColumn: { path: "Time", order: "desc" },
	};

	convertTimezone(inOutRecords) {
		//const timeZone = 'Asia/Yangon';

		_.forEach(inOutRecords, function (key, value) {
			//let Time = utcToZonedTime(key.Time, timeZone);
			//let inTime = utcToZonedTime(key.ticket.inTime);
			let inTime = key.ticket.inTime;
			let outTime = toDate(key.ticket.outTime);
			outTime = format(outTime, "yyyy-MM-dd HH:mm:ss", outTime);
			if (key.ticket.inTime) {
				inTime = toDate(key.ticket.inTime);
				inTime = format(inTime, "yyyy-MM-dd HH:mm:ss", inTime);
			}

			// Time = format(Time, 'yyyy-MM-dd HH:mm:ss', { timeZone: timeZone })
			//console.log(outTime);
			// key.Time = Time;
			key.ticket.inTime = inTime;
			key.ticket.outTime = outTime;
		});
		return inOutRecords;
	}

	async componentDidMount() {
		let { data: inOutRecords } = await getInOutRecords();
		inOutRecords = this.convertTimezone(inOutRecords);
		this.setState({ inOutRecords });
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			searchQuery,
			inOutRecords: allInOutRecords,
		} = this.state;

		let filtered = allInOutRecords;
		if (searchQuery)
			filtered = allInOutRecords.filter((m) =>
				m.lp.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
			);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const inOutRecords = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: inOutRecords };
	};

	render() {
		const { length: count } = this.state.inOutRecords;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		if (count === 0)
			return <Typography component='p'>There is no InOut record.</Typography>;

		const { totalCount, data: inOutRecords } = this.getPagedData();

		return (
			<div className='row'>
				<div className='col'>
					<Typography variant='h5' component='h5'>
						InOut records
					</Typography>
					<Typography component='p'>
						Showing {totalCount} InOut record.
					</Typography>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<InOutRecordTable
						inOutRecords={inOutRecords}
						sortColumn={sortColumn}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default InOutRecord;
