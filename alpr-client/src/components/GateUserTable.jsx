import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import {Img} from 'react-image'
import Card from "./CardUI";
const imageUrl = "http://localhost:30000/plateimages/";

class GateUserTable extends Component {
  columns = [
    {
      path: "licensePlate",
      label: "License Plate",
      content: gateuser => <Link to={`/gateUsers/${gateuser._id}`}> {gateuser.licensePlate} </Link>
    },

    { path: "inTime", label: "Entry Time" },
    { path: "outTime", label: "Exit Time" },

    { 
      path: "photo", 
      label: "Photo",
      content: p => <Img  alt="" 
                          src={`${imageUrl}${p.photo}`} 
                          width="80" 
                          height="50"/>
    },

    { path: "isMember", label: "Is Member" },
    { path: "camera_id", label: "Lane Number" },
];

  render() {
    const { gateusers, onSort, sortColumn } = this.props;

    return (

      <Table
        columns={this.columns}
        data={gateusers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default GateUserTable;
