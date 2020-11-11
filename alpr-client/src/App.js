import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import NavBar from "./components/navBar";
import Members from "./components/members";
import MemberForm from './components/memberForm';
import Users from "./components/users";
import UserForm from "./components/userForm";
import LoginForm from "./components/loginForm";
import Logout from './components/logout';
import Relays from "./components/relays";
import GateUser from "./components/GateUser";
import auth from './services/authService';
import NotFound from "./components/notFound";
import ProtectedRoute from './components/common/protectedRoute';
import GateUserCard from "./components/GateUserCard";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


class App extends Component {

  state = { };
  
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/users/:id" component={UserForm} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/lanes" component={Relays} />

            <ProtectedRoute path="/members/:id" component={MemberForm} />
            <Route path="/members" render={props => <Members {...props} user={this.state.user} 
            />} />
            <ProtectedRoute path="/gateUsers/:id" component={GateUserCard} />
            <Route path="/gateUsers" render={props => <GateUser {...props} user={this.state.user}/>} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/users" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
