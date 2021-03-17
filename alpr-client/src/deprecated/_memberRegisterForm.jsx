import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMember } from '../services/memberServices';

class MemberRegisterForm extends Form {
  state = {
    data: { licensePlate: ["2D9802"], owner_name: "yewint", address: "ABX road, WDC" },
    errors: {}
  };

  schema = {
    licensePlate: Joi.array()
      .required()
      .label("License Plate"),
    owner_name: Joi.string()
      .required()
      .label("Owner Name"),
    address: Joi.string()
      .required()
      .label("Address"),
 };

  doSubmit = async () => {
    await saveMember(this.state.data);
  };

  render() {
    return (
      <div>
        <h3>Member Registration</h3>
        <form onSubmit={this.doSubmit}>
          {this.renderInput("licensePlate", "License Plate")}
          {this.renderInput("owner_name", "Owner Name")}
          {this.renderInput("address", "Address")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default MemberRegisterForm;
