import React, { Component }  from "react";
import { getGateUser } from '../services/gateUserServices';
import Card from './CardUI';

const imageUrl = "http://localhost:30000/plateimages/";

class GateUserCard extends Component {
  state = {
    data: {
        _id: "",
        licensePlate: "",
        photo: "",
        inTime: "",
        outTime:"",
        camera_id: 1,
    },
    errors: {}
  };

  async populateGateUser(){
    try {
      const gateuserId = this.props.match.params.id;
      const { data: gateuser } = await getGateUser(gateuserId);
      //console.log(gateuser);
      this.setState({ data: this.mapToViewModel( gateuser ) });
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
   await this.populateGateUser();
  }
  
  mapToViewModel(gateuser) {
    return {
      _id: gateuser._id,
      licensePlate: gateuser.licensePlate,
      photo: gateuser.photo,
      inTime: gateuser.inTime,
      outTime: gateuser.outTime,
      camera_id: gateuser.camera_id,
    };
  }

  doSubmit = () => {
    //await saveGateUser(this.state.data);
    this.props.history.push("/gateUsers");
  };
  
  render(){

      const imgFilename = this.state.data.photo;
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

export default GateUserCard;
