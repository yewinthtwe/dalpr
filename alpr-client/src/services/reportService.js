import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/report";

export async function getAllReport() {
	const body = {
		dateFrom: null,
		dateTo: null,
		member: false,
		nonMember: false,
	};

	try {
		const response = await http.post(apiEndpoint, body);
		//console.log("AlprReportService:", data);
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
