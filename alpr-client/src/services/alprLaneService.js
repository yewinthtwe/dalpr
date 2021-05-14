import http from "./httpService";
import { apiUrl } from "../config.json";
// import _ from "lodash";

const apiEndpoint = apiUrl + "/aiLane";

export async function getAiLanes() {
	try {
		const response = await http.get(apiEndpoint);
		return response;
	} catch (error) {
		if (error.response) {
			return error.response;
		} else if (error.request) {
			return error.request;
		} else {
			return error.message;
		}
	}
}

export async function saveAiLane(aiLane) {
	try {
		if (aiLane._id) {
			const body = { ...aiLane };
			const response = await http.put(`${apiEndpoint}/${aiLane._id}`, body);
			return response;
		} else {
			const response = await http.post(apiEndpoint, aiLane);
			return response;
		}
	} catch (error) {
		if (error.response) {
			return error.response;
		} else if (error.request) {
			return error.request;
		} else {
			return error.message;
		}
	}
}

export async function deleteAiLane(id) {
	try {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		return response;
	} catch (error) {
		if (error.response) {
			return error.response;
		} else if (error.request) {
			return error.request;
		} else {
			return error.message;
		}
	}
}
