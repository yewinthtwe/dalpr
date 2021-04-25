import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/monitoredIp";

export async function getMonitoredIps() {
	try {
		const response = await http.get(apiEndpoint);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("getMonitoredIps:", error);
	}
}

export async function saveMonitoredIp(monitoredIp) {
	try {
		if (monitoredIp._id) {
			const body = { ...monitoredIp };
			const response = await http.put(
				`${apiEndpoint}/${monitoredIp._id}`,
				body
			);
			const { data } = response;
			return data;
		}
		const response = await http.post(apiEndpoint, monitoredIp);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("saveMonitoredIp:", error);
	}
}

export async function deleteMonitoredIp(id) {
	try {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("deleteMonitoredIp:", error);
	}
}
