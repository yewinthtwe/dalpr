import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/relay";

export function getRelays() {
	return http.get(apiEndpoint);
}

export function saveRelay(relay) {
	if (relay._id) {
		const body = { ...relay };
		return http.put(`${apiEndpoint}/${relay._id}`, body);
	} else {
		return http.post(apiEndpoint, relay);
	}
}

export function updateRelayStatus(body) {
	return http.patch(`${apiEndpoint}/${body.relay}`, {
		name: body.relay,
		inUsed: body.inUsed,
	});
}

export function deleteRelay(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}
