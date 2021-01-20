import React, { Component }  from "react";
import { imageUrl } from '../config.json';
//import _ from "lodash";
//import { format } from 'date-fns-tz';
//import { toDate } from 'date-fns';
import { getInOutRecord } from '../services/inOutRecordServices';
//import Card from './CardUI';
import MuCard from './muCard';


class InOutRecordCard extends Component {
  state = {
    data: {
        _id: "",
        licensePlate: "",
        inPhoto: "",
        inTime: 0,
        outPhoto: "",
        outTime: 0,
        Direction: "",
        isMember: false,
        scanCameraId: 0
        
    },
    errors: {}
  };

  async populateInOutRecord(){
      const inOutRecordId = this.props.match.params.id;
      const { data: inOutRecord } = await getInOutRecord(inOutRecordId);
      //inOutRecord = this.convertTimezone(inOutRecord);
      this.setState({ data: this.mapToViewModel( inOutRecord ) });
  }

  async componentDidMount() {
   await this.populateInOutRecord();
  }
  
  mapToViewModel(inOutRecord) {
//console.log(inOutRecord);
    return {
      _id: inOutRecord._id,
      licensePlate: inOutRecord.licensePlate,
      inPhoto: inOutRecord.inPhoto,
      outPhoto: inOutRecord.outPhoto,
      inTime: inOutRecord.inTime,
      outTime: inOutRecord.outTime,
      Direction: inOutRecord.Direction,
      isMember: inOutRecord.isMember,
      scanCameraId: inOutRecord.scanCameraId,
    };
  }

  doSubmit = () => {
    //await saveGateUser(this.state.data);
    this.props.history.push("/inOutRecord");
  };
  
  render(){

      // const inPhoto = this.state.data.inPhoto;
      // const outPhoto = this.state.data.outPhoto;
      // const inTime = this.state.data.inTime;
      // const outTime = this.state.data.outTime;
    const imgsrc = imageUrl;
    //console.log(imgsrc);
    
    return (
    <div>
      <MuCard
        data={this.state.data}
        imgsrc={ imgsrc }
        title={this.state.data.licensePlate}
        onSubmit={this.doSubmit} > 
      </MuCard>
    </div>
    )
    
  }
}

export default InOutRecordCard;
