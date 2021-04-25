import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/obus";

export async function getObuCollection() {
	try {
		const response = await http.get(apiEndpoint);

		console.log("ObuServiceJs:", response);
		return response;
	} catch (error) {
		console.log("ObuService:", error);
	}
}

export function saveObu() {
	return null;
}

export function deleteObu() {
	return null;
}
