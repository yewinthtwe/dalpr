import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthApi from "./AuthApi";
// import * as authService from "../../services/authService";

export default function ProtectedRoute({ children, ...rest }) {
	const { authUser } = React.useContext(AuthApi);
	//let history = useHistory();
	console.log("ProtectedRoute: authUser:", authUser);
	//console.log("ProtectedRoute: history:", history);

	return (
		<Route
			{...rest}
			render={({ location }) => {
				return authUser?.isLoggedIn === true ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: {
								from: location,
							},
						}}
					/>
				);
			}}
		/>
	);
}

// function ProtectedRoute({ auth, component: Component, ...rest }) {
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) => {
// 				if (!auth) {
// 					return (
// 						<Redirect
// 							to={{ pathname: "/login", state: { from: props.location } }}
// 						/>
// 					);
// 				} else {
// 					return <Component />;
// 				}
// 			}}
// 		/>
// 	);
// }
