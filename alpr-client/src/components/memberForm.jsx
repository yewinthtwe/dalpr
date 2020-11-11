import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMember, saveMember } from '../services/memberServices';

class MemberForm extends Form {
  state = {
    data: {
      licensePlate: "",
      owner_name: "",
      address:"",
      obuId: 1,
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    licensePlate: Joi.string()
      .required()
      .min(4)
      .label("License Plate"),
    owner_name: Joi.string()
      .required()
      .min(6)
      .label("Owner Name"),
    address: Joi.string()
      .required()
      .min(6)
      .label("Address"),
    obuId: Joi.number()
      .required()
      .label("OBU")
  };

  async populateMember(){
    try {
      const memberId = this.props.match.params.id;
      if (memberId === "new") return;

      const { data: member } = await getMember(memberId);
      this.setState({ data: this.mapToViewModel(member) });
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
   await this.populateMember();
  }
  
  mapToViewModel(member) {
    return {
      _id: member._id,
      licensePlate: member.licensePlate,
      owner_name: member.owner_name,
      address: member.address,
      obuId: member.obuId
    };
  }

  doSubmit = async () => {
    await saveMember(this.state.data);
    this.props.history.push("/members");
  };
  
  render(){
    return (
    <div>
      <h4> Member </h4>
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('licensePlate', 'License Plate')}
        {this.renderInput('owner_name', 'Owner Name')}
        {this.renderInput('address', 'Address')}
        {this.renderInput('obuId', 'OBU')}
        {this.renderButton('Save')}
      </form>
    </div>
    )
    
  }
}

export default MemberForm;
