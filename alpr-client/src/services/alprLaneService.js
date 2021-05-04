import http from "./httpService";
import { apiUrl } from "../config.json";
// import _ from "lodash";

const apiEndpoint = apiUrl + "/aiLane";

export function getAiLanes() {
	return http.get(apiEndpoint);
}

export function saveAiLane(aiLane) {
	if (aiLane._id) {
		const body = { ...aiLane };
		//console.log("AiLaneService: saveAiLane: Update:", body);
		return http.put(`${apiEndpoint}/${aiLane._id}`, body);
	} else {
		//console.log("AiLaneService: saveAiLane: Save new:", aiLane);
		return http.post(apiEndpoint, aiLane);
	}
}

export function deleteAiLane(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}
