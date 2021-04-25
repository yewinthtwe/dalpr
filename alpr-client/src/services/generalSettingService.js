import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/generalSetting";

export function getGeneralSetting() {
	return http.get(apiEndpoint);
}

export function saveGeneralSetting(generalSetting) {
	if (generalSetting._id) {
		const body = { ...generalSetting };
		return http.put(`${apiEndpoint}/${generalSetting._id}`, body);
	} else {
		return http.post(apiEndpoint, generalSetting);
	}
}

export function deleteGeneralSetting(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}
