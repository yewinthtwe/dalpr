import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from '../services/authService';
import Table from "./common/table";
//import Like from "./common/like";

class LanesTable extends Component {
  columns = [
    { path: "plate", label: "License Plate", content: lane => <Link to={`/lanes/${lane._id}`}>{lane.plate}</Link> },
    {
      path: "owner_name",
      label: "Owner Name",
    },
    { path: "address", label: "Address" },
    { path: "reg_date", label: "Registration Date" },
    { path: "obuId", label: "OBU" },
  ];

  deleteColumn =  {
      key: "delete",
      content: lane => (
        <button
          onClick={() => this.props.onDelete(lane)}
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
    const { lanes, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={lanes}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default LanesTable;
