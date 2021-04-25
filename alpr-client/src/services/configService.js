import http from "./httpService";
import { apiUrl } from "../config.json";

const cameraApiEndPoint = apiUrl + "/configAlpr/camera";
const laneApiEndPoint = apiUrl + "/configAlpr/lane";
const relayApiEndPoint = apiUrl + "/configAlpr/relay";
const ioModuleApiEndPoint = apiUrl + "/configAlpr/iomodule";
const configAlpr = apiUrl + "/configAlpr/config";

export function getConfig() {
	return http.get(configAlpr);
}

export function getCameras() {
	return http.get(cameraApiEndPoint);
}

export function getLanes() {
	return http.get(laneApiEndPoint);
}

export function getRelays() {
	return http.get(relayApiEndPoint);
}

export function getIoModules() {
	return http.get(ioModuleApiEndPoint);
}

export function saveConfig(config) {
	if (config._id) {
		const body = { ...config };
		return http.put(`${apiUrl}/configAlpr/config/${config._id}`, body);
	} else {
		return http.post(`${apiUrl}/configAlpr/config`, config);
	}
}

export function deleteConfig(id) {
	return http.delete(`${apiUrl}/configAlpr/config/${id}`);
}
