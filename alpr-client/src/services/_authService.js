// import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";
import http from "./httpService";

//const authAxios = http.setCookie();

export async function login(username, password) {
	// const { data: jwt } = await http.post(apiUrl + "/auth", {
	// 	username,
	// 	password,
	// });
	const resp = await http.post(apiUrl + "/auth", { username, password });
	console.log("authService:", resp);
	// localStorage.setItem(tokenKey, jwt);
}

// export function loginWithjwt(jwt) {
// 	const authAxios = http.setCookie();
// 	localStorage.setItem(tokenKey, jwt);
// }

// export function logout() {
// 	localStorage.removeItem(tokenKey);
// }

// export function getCurrentUser() {
// 	try {
// 		const jwt = localStorage.getItem(tokenKey);
// 		return jwtDecode(jwt);
// 	} catch (ex) {
// 		return null;
// 	}
// }

// export function getJwt() {
// 	return localStorage.getItem(tokenKey);
// }

export default {
	login,
	// loginWithjwt,
	// logout,
	// getJwt,
	// getCurrentUser,
};
