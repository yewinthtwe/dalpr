import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/lane";

export function getLanes() {
	return http.get(apiEndpoint);
}

export function saveLane(lane) {
	if (lane._id) {
		const body = { ...lane };
		delete body._id;
		return http.put(`${apiEndpoint}/${lane._id}`, body);
	} else {
		return http.post(apiEndpoint, lane);
	}
}

export function deleteLane(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}
