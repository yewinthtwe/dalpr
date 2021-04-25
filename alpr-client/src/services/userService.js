import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

function usersUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getUsers() {
	return http.get(apiEndpoint);
}

export function getUser(userId) {
	return http.get(usersUrl(userId));
}

export function saveUser(user) {
	if (user._id) {
		const body = { ...user };
		delete body._id;
		console.log("userService: Update:", body);
		return http.put(usersUrl(user._id), body);
	} else {
		console.log("userService: Save new:", user);
		return http.post(apiEndpoint, user);
	}
}

export function deleteUser(userId) {
	return http.delete(usersUrl(userId));
}
