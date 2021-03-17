import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/obus";

export async function getObuCollection(source) {
	try {
		const response = await http.get(apiEndpoint, {
			cancelToken: source.token,
		});
		const { data } = response;

		return data;
	} catch (error) {
		if (http.isCancel(error)) {
			return error;
		} else {
			throw error;
		}
	}
}

export function saveObu(source) {
	return null;
}

export function deleteObu(source) {
	return null;
}
