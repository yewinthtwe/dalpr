import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/relay";

export async function getRelays() {
	try {
		const response = await http.get(apiEndpoint);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("getRelays:", error);
	}
}

export async function saveRelay(relay) {
	try {
		if (relay._id) {
			const body = { ...relay };
			const response = await http.put(`${apiEndpoint}/${relay._id}`, body);
			const { data } = response;
			return data;
		}
		const response = await http.post(apiEndpoint, relay);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("saveRelay:", error);
	}
}

export async function updateRelayStatus(body) {
	try {
		const response = await http.patch(`${apiEndpoint}/${body.relay}`, {
			name: body.relay,
			inUsed: body.inUsed,
		});
		const { data } = response;
		return data;
	} catch (error) {
		console.log("updateRelayStatus:", error);
	}
}

export async function deleteRelay(id) {
	try {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("deleteRelay", error);
	}
}
