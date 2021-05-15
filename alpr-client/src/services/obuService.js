import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/obus";

export async function getObuCollection() {
	try {
		const response = await http.get(apiEndpoint);
		return response;
	} catch (error) {
		if (error.response) {
			return error.response;
		} else if (error.request) {
			return error.request;
		} else {
			return error.message;
		}
	}
}

export async function getObu() {
	try {
		const response = await http.get(`${apiEndpoint}/one`);
		return response;
	} catch (error) {
		if (error.response) {
			return error.response;
		} else if (error.request) {
			return error.request;
		} else {
			return error.message;
		}
	}
}
