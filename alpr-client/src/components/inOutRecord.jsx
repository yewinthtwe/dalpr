import React, { Component } from "react";
import InOutRecordTable from "./InOutRecordTable";
import Pagination from "./common/pagination";
import { getInOutRecords } from "../services/inOutRecordServices";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";


class InOutRecord extends Component {
  state = {
    inOutRecords: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "Time", order: "desc" }
  };

  async componentDidMount() {
    const { data: inOutRecords } = await getInOutRecords();
    this.setState({ inOutRecords });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };


  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      inOutRecords: allInOutRecords
    } = this.state;

    let filtered = allInOutRecords;
    if (searchQuery)
    filtered = allInOutRecords.filter(m =>
      m.licensePlate.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const inOutRecords = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: inOutRecords };
  };

  render() {
    const { length: count } = this.state.inOutRecords;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There is no inOutRecord data found in the database.</p>;

    const { totalCount, data: inOutRecords } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <br></br>
        <h4> InOut records</h4>
          <p> Total number of InOut record {totalCount} currently.</p>
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

