import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Members from "./components/members";
import MemberForm from "./components/memberForm";
import Users from "./components/users";
import UserForm from "./components/UserForm";
import LoginForm from "./components/loginForm";
//import muLoginForm from './components/muLoginForm';
import Logout from "./components/logout";
//import Relays from "./components/relays";
import InOutRecord from "./components/inOutRecord";
import auth from "../services/authService";
import NotFound from "../components/notFound";
import ProtectedRoute from "../components/common/protectedRoute";
import InOutRecordCard from "./components/inOutRecordCard";
import Lanes from "./components/lanes";
import MuSwitch from "../components/common/switch";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer></ToastContainer>
				<NavBar user={user} />
				<main className='container'>
					<Switch>
						<ProtectedRoute path='/users/:id' component={UserForm} />
						<Route path='/users' component={Users} />
						<Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} />
						<Route path='/lanes' component={Lanes} />
						<Route path='/switch' component={MuSwitch} />

						<ProtectedRoute path='/members/:id' component={MemberForm} />
						<Route
							path='/members'
							render={(props) => <Members {...props} user={this.state.user} />}
						/>
						<ProtectedRoute
							path='/inOutRecord/:id'
							component={InOutRecordCard}
						/>
						<Route
							path='/inOutRecord'
							render={(props) => (
								<InOutRecord {...props} user={this.state.user} />
							)}
						/>
						<Route path='/not-found' component={NotFound} />
						<Redirect from='/' exact to='/inOutRecord' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
