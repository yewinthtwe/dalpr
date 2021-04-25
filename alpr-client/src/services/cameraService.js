import http from "./httpService";
import { apiUrl } from "../config.json";

const cameraApiEndPoint = apiUrl + "/camera";

export function getCameras() {
	return http.get(cameraApiEndPoint);
}

export function saveCamera(camera) {
	if (camera._id) {
		const body = { ...camera };
		delete body._id;
		console.log("cameraService: Update:", body);
		return http.put(`${cameraApiEndPoint}/${camera._id}`, body);
	} else {
		console.log("cameraService: Save new:", camera);
		return http.post(`${cameraApiEndPoint}`, camera);
	}
}

export function deleteCamera(id) {
	return http.delete(`${cameraApiEndPoint}/${id}`);
}
