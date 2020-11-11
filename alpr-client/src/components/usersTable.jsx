import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from '../services/authService';
import Role from "./common/isAdmin";
import Table from "./common/table";

class UsersTable extends Component {

  columns = [
    {
      path: "username",
      label: "Username",
      content: user => <Link to={`/users/${user._id}`}>{user.username}</Link>
    },
    { path: "password", label: "Password", type: "password" },
    { path: "reg_date", label: "RegistrationDate" },
    {
      path: "role", label: "Admin", key: "role",
      content: user => (
        <Role isAdmin={user.isAdmin} onClick={() => this.props.onIsAdmin(user)} />
      )
    },
  ];

  deleteColumn =  {
      key: "delete",
      content: user => ( 
        <button
          onClick={() => this.props.onDelete(user)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
  };
  
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if(user && user.isAdmin) 
      this.columns.push(this.deleteColumn);
  }

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
