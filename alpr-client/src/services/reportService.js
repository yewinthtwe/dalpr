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
		const { data } = response;
		//console.log("AlprReportService:", data);
		return data;
	} catch (error) {
		console.log("AlprReportService:", error);
	}
}
