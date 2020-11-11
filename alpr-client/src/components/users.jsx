import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import UserTable from "./usersTable";
import Pagination from "./common/pagination";
import { getUsers, deleteUser, saveUser } from "../services/userServices";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "username", order: "asc" }
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  handleAdd = async () => {
    const { data: user } = await saveUser();
    const users = [user, ...this.state.users];
    this.setState({ users });
   };
    
  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u._id !== user._id);
    this.setState({ users });
    try {
      await deleteUser(user._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
      toast.error('This user may have been deleted already');
      this.setState({ users: originalUsers });
    }
  };

  handleIsAdmin = user => {
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...users[index] };
    users[index].isAdmin = !users[index].isAdmin;
    this.setState({ users });
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
      users: allUsers
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(m =>
        m.username.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { length: count } = this.state.users;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    //const { user } = this.props;
    
    if (count === 0) return <p>There is no registered user in the database.</p>;

    const { totalCount, data: users } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <h4> System Users </h4>
          <h5> Search System user</h5>
          <p> Total { totalCount } user.</p>
          <SearchBox value={ searchQuery } onChange={ this.handleSearch }/>
          
          <UserTable
            users={users}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          
          <Link 
          to='/users/new' className='btn btn-primary m-2'
          style={{marginBottom:20}}>
            New User
          </Link>

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

export default Users;
