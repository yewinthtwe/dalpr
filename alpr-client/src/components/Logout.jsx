import * as React from "react";
import auth from "../services/authService";
import AuthApi from "./common/AuthApi";

export default function Logout() {
	const { authUser } = React.useContext(AuthApi);

	if (authUser?.username) {
		auth.logout(authUser._id);
		console.log("LogoutJsx: logout user", authUser.username);
	}
	window.location = "/login";
	return null;
}
