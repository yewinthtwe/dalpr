import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
//import {Img} from 'react-image'
//import { imageUrl } from '../config.json';

class InOutRecordTable extends Component {
  columns = [
    {
      path: "licensePlate",
      label: "License Plate",
      content: inOutRecord => <Link to={`/inOutRecord/${inOutRecord._id}`}> {inOutRecord.licensePlate} </Link>
    },
    { path: "inTime", label: "In Time" },
    // { 
    //   path: "inPhoto", 
    //   label: "InPhoto",
    //   // content: p => <Img  alt="" 
    //   //                     src={`${imageUrl}${p.Photo}`} 
    //   //                     width="80" 
    //   //                     height="50"/>
    // },
    { path: "outTime", label: "Out Time" },
    // { 
    //   path: "outPhoto", 
    //   label: "OutPhoto",
    //   // content: p => <Img  alt="" 
    //   //                     src={`${imageUrl}${p.Photo}`} 
    //   //                     width="80" 
    //   //                     height="50"/>
    // },
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
