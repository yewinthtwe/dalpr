import React, { Component }  from "react";
import { getInOutRecord } from '../services/inOutRecordServices';
import Card from './CardUI';

const imageUrl = "http://localhost:30000/plateimages/";

class InOutRecordCard extends Component {
  state = {
    data: {
        _id: "",
        licensePlate: "",
        inPhoto: "",
        inTime: "",
        outPhoto: "",
        outTime: "",
        Direction: "",
        
    },
    errors: {}
  };

  async populateInOutRecord(){
      const inOutRecordId = this.props.match.params.id;
      const { data: inOutRecord } = await getInOutRecord(inOutRecordId);
      //console.log(inOutRecord);
      this.setState({ data: this.mapToViewModel( inOutRecord ) });
  }

  async componentDidMount() {
   await this.populateInOutRecord();
  }
  
  mapToViewModel(inOutRecord) {
    return {
      _id: inOutRecord._id,
      licensePlate: inOutRecord.licensePlate,
      inPhoto: inOutRecord.inPhoto,
      outPhoto: inOutRecord.outPhoto,
      inTime: inOutRecord.ticket.inTime,
      outTime: inOutRecord.ticket.outTime,
      Direction: inOutRecord.Direction
    };
  }

  doSubmit = () => {
    //await saveGateUser(this.state.data);
    this.props.history.push("/inOutRecord");
  };
  
  render(){

      const inPhoto = this.state.data.inPhoto;
      const outPhoto = this.state.data.outPhoto;
      // const inTime = this.state.data.inTime;
      // const outTime = this.state.data.outTime;
      const imgsrc = [ `${imageUrl}${inPhoto}`, `${imageUrl}${outPhoto}` ];
      //console.log(this.props);
    
    return (
    <div>
      <Card
        data={this.state.data}
        imgsrc={imgsrc}
        title={this.state.data.licensePlate}
        onSubmit={this.doSubmit} > 
      </Card>
    </div>
    )
    
  }
}

export default InOutRecordCard;
