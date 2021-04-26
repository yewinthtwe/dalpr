// import React from "react";
import { apiUrl } from "../config.json";
import http from "./httpService";

export function login(data) {
	//console.log("authService: login:", data);
	return http.post(apiUrl + "/login", data);
	//console.log("authService: login: response:", response);
	// localStorage.setItem(tokenKey, jwt);
}

export function logout(id) {
	//console.log("authService: logout:", id);
	return http.get(apiUrl + `/logout/${id}`);
}

export default {
	login,
	logout,
};

// const tokenKey = 'token';
// import jwtDecode from "jwt-decode";
// http.setJwt(getJwt());
// export function loginWithjwt(jwt) {
//     localStorage.setItem(tokenKey, jwt);
// }
