import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import MembersTable from "./membersTable";
import Pagination from "./common/pagination";
import { getMembers, deleteMember, saveMember } from "../services/memberServices";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Members extends Component {
  state = {
    members: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "licensePlate", order: "asc" }
  };

  async componentDidMount() {
    const { data: members } = await getMembers();
    this.setState({ members });
  }

  handleAdd = async () => {
    const { data: member } = await saveMember();
    const members = [member, ...this.state.members];
    this.setState({ members });
   };
    
  handleDelete = async member => {
    const originalMembers = this.state.members;
    const members = originalMembers.filter(v => v._id !== member._id);
    this.setState({ members });
    try {
      await deleteMember(member._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
      toast.error('This member may have been deleted already');
      this.setState({ members: originalMembers });
    }
  };

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
      members: allMembers
    } = this.state;

    let filtered = allMembers;
    if (searchQuery)
      filtered = allMembers.filter(m =>
        m.licensePlate.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const members = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: members };
  };

  render() {
    const { length: count } = this.state.members;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <div>
    <h6>There is no registered member in the database.</h6>
    <Link 
          to='/members/new' className='btn btn-primary m-2'
          style={{marginBottom:20}}>
            New Member <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </Link>
      
    </div>;

    const { totalCount, data: members } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <br></br>
          <h4> Registered Members </h4>
          <h6> Search License Plate</h6>
          <p> Total {totalCount} member.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
          <MembersTable
            members={members}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          
          { user && (
          <Link 
          to='/members/new' className='btn btn-primary m-2'
          style={{marginBottom:20}}>
            New Member <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </Link>
          )}
          
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

export default Members;

