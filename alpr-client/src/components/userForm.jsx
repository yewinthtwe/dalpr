import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveUser, getUser } from '../services/userServices';

class UserForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name:"",
      isAdmin: false
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    username: Joi.string()
      .required()
      .min(6)
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    name: Joi.string()
      .required()
      .min(6)
      .label("Name"),
    isAdmin: Joi.boolean(),
  };

  async populateUser(){
    try {
      const userId = this.props.match.params.id;
      if (userId === "new") return;

      const { data: user } = await getUser(userId);
      this.setState({ data: this.mapToViewModel(user) });
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
   await this.populateUser();
  }
  
  mapToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      password: user.password,
      name: user.name,
      isAdmin: user.isAdmin
    };
  }

  doSubmit = async () => {
    await saveUser(this.state.data);
    this.props.history.push("/users");
  };
  
  render(){
    return (
    <div>
      <h3> Users </h3>
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password')}
        {this.renderInput('name', 'Name')}
        {this.renderInput('isAdmin','IsAdmin')}
        {this.renderButton('Save')}
      </form>
    </div>
    )
    
  }
}

export default UserForm;
