import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/obus";

export function getObuCollection() {
	return http.get(apiEndpoint);
	//console.log("ObuServiceJs:", response);
}

export function saveObu() {
	return null;
}

export function deleteObu() {
	return null;
}
