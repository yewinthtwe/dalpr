import React, { Component } from "react";
import { Link } from "react-router-dom";
import Role from "../components/common/isAdmin";
import Table from "../components/common/table";

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

    {
      key: "delete",
      content: user => ( 
        <button
          onClick={() => this.props.onDelete(user)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }

  ];

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
