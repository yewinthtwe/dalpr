import React, { Component }  from "react";
import { getInOutRecord } from '../services/inOutRecordServices';
import Card from './CardUI';

const imageUrl = "http://localhost:30000/plateimages/";

class InOutRecordCard extends Component {
  state = {
    data: {
        _id: "",
        licensePlate: "",
        photo: "",
        Time: "",
        CameraId: 0,
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
      Photo: inOutRecord.Photo,
      Time: inOutRecord.Time,
      CameraId: inOutRecord.CameraId,
    };
  }

  doSubmit = () => {
    //await saveGateUser(this.state.data);
    this.props.history.push("/inOutRecord");
  };
  
  render(){

      const imgFilename = this.state.data.Photo;
      const imgsrc = `${imageUrl}${imgFilename}`;
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
