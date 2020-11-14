import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMember, saveMember } from '../services/memberServices';

class MemberForm extends Form {
  state = {
    data: {
      licensePlate: "",
      memberName: "",
      address:"",
      obuId: 123456789012,
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    
    licensePlate: Joi.string()
      .required()
      .label("License Plate"),
    memberName: Joi.string()
      .required()
      .min(6)
      .label("Member Name"),
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
      const member_id = this.props.match.params.id;
      if ( member_id === "new") return;
      const { data: member } = await getMember( member_id );
      this.setState({ data: this.mapToViewModel( member ) });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
    }
 }

  async componentDidMount() {
   await this.populateMember();
  }
  
  mapToViewModel( member ) {
    return {
      _id: member._id,
      licensePlate: member.licensePlate,
      memberName: member.memberName,
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
        {this.renderInput('memberName', 'Member Name')}
        {this.renderInput('address', 'Address')}
        {this.renderInput('obuId', 'OBU')}
        {this.renderButton('Save')}
      </form>
    </div>
    )
    
  }
}

export default MemberForm;
