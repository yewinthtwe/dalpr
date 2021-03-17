import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/relay";

export async function getRelays(source) {
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

export async function saveRelay(relay, source) {
	try {
		if (relay._id) {
			const body = { ...relay };
			const response = await http.put(`${apiEndpoint}/${relay._id}`, body, {
				cancelToken: source.token,
			});
			const { data } = response;
			return data;
		}
		const response = await http.post(apiEndpoint, relay, {
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

export async function updateRelayStatus(body, source) {
	try {
		const response = await http.patch(
			`${apiEndpoint}/${body.relay}`,
			{ name: body.relay, inUsed: body.inUsed },
			{ cancelToken: source.token }
		);
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

export async function deleteRelay(id, source) {
	try {
		const response = await http.delete(`${apiEndpoint}/${id}`, {
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
