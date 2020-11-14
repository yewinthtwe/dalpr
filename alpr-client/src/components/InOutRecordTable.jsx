import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import {Img} from 'react-image'
import { imageUrl } from '../config.json';

class InOutRecordTable extends Component {
  columns = [
    {
      path: "licensePlate",
      label: "License Plate",
      content: inOutRecord => <Link to={`/inOutRecord/${inOutRecord._id}`}> {inOutRecord.licensePlate} </Link>
    },

    { path: "Time", label: "Time" },
    { 
      path: "Photo", 
      label: "Photo",
      content: p => <Img  alt="" 
                          src={`${imageUrl}${p.Photo}`} 
                          width="80" 
                          height="50"/>
    },
    { path: "CameraId", label: "Camera ID" },
    { path: "Direction", label: "Direction"}
];

  render() {
    const { inOutRecords, onSort, sortColumn } = this.props;

    return (

      <Table
        columns={this.columns}
        data={inOutRecords}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default InOutRecordTable;
