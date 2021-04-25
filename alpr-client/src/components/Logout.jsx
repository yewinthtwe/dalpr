import * as React from "react";
import auth from "../services/authService";
import AuthApi from "./common/AuthApi";

export default function Logout() {
	const { authUser } = React.useContext(AuthApi);
	console.log("LogoutJsx:", authUser);
	if (authUser) {
		auth.logout(authUser._id);
	}
	window.location = "/login";
	return null;
}
