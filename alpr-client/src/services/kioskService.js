import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/kiosk";

export async function getKioskTicket(ticketId) {
	//console.log("kioskService: ticketId:", ticketId);
	try {
		const response = await http.get(`${apiEndpoint}/${ticketId}`);
		const { data } = response;
		//console.log("kioskService: getKioskTicket:", data);
		return data;
	} catch (error) {
		console.log("getKioskTicket:", error);
	}
}

export async function setKioskTicket(ticketId) {
	try {
		const response = await http.post(`${apiEndpoint}`, {
			ticketId: ticketId,
			isPaid: true,
		});
		const { data } = response;
		return data;
	} catch (error) {
		console.log("setKioskTicket:", error);
	}
}
