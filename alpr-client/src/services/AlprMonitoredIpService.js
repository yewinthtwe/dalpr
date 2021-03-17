import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/monitoredIp";

export async function getMonitoredIps(source) {
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

export async function saveMonitoredIp(monitoredIp, source) {
	try {
		if (monitoredIp._id) {
			const body = { ...monitoredIp };
			const response = await http.put(
				`${apiEndpoint}/${monitoredIp._id}`,
				body,
				{ cancelToken: source.token }
			);
			const { data } = response;
			return data;
		}
		const response = await http.post(apiEndpoint, monitoredIp, {
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

export async function deleteMonitoredIp(id, source) {
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
