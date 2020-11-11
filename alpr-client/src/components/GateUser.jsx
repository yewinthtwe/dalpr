import React, { Component } from "react";
import GateUserTable from "./GateUserTable";
import Pagination from "./common/pagination";
import { getGateUsers } from "../services/gateUserServices";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";


class GateUser extends Component {
  state = {
    gateusers: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "epoch_time", order: "desc" }
  };

  async componentDidMount() {
    const { data: gateusers } = await getGateUsers();
    this.setState({ gateusers });
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
      gateusers: allGateUsers
    } = this.state;

    let filtered = allGateUsers;
    if (searchQuery)
    filtered = allGateUsers.filter(m =>
      m.licensePlate.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const gateusers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: gateusers };
  };

  render() {
    const { length: count } = this.state.gateusers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There is no gateuser data found in the database.</p>;

    const { totalCount, data: gateusers } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
        <h4> Gate users record</h4>
          <p> Total number of gateuser is {totalCount} currently.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <GateUserTable
            gateusers={gateusers}
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

export default GateUser;

