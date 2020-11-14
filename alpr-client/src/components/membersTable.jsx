import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from '../services/authService';
import Table from "./common/table";
//import Like from "./common/like";

class MembersTable extends Component {
  columns = [
    { path: "licensePlate", label: "License Plate", content: member => <Link to={`/members/${member._id}`}>{member.licensePlate}</Link> },
    { path: "memberName", label: "Member Name" },
    { path: "address", label: "Address" },
    { path: "registrationDate", label: "Registration Date" },
    { path: "obuId", label: "OBU" },
  ];

  deleteColumn =  {
      key: "delete",
      content: member => (
        <button
          onClick={() => this.props.onDelete(member)}
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
    const { members, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={members}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MembersTable;
