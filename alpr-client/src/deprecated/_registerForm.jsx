import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {saveUser} from '../services/userServices';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", isAdmin: false },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .min(6)
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    isAdmin: Joi.boolean().label("AdminUser")
  };

  doSubmit = async () => {
    try{
      const response = await saveUser(this.state.data);
      auth.loginWithjwt(response.headers['x-auth-token']);
      window.localtion('/');
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div>
        <h3>Register system user</h3>
        <form onSubmit={this.doSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("isAdmin", "AdminUser", "checkbox")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
