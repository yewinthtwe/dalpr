import http from "./httpService";
import { apiUrl } from "../config.json";

const priceApiEndPoint = apiUrl + "/price";

export async function getPrice() {
	try {
		const response = await http.get(priceApiEndPoint);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("getPrice:", error);
	}
}

export async function savePrice(price) {
	try {
		if (price._id) {
			const body = { ...price };
			const response = await http.put(`${apiUrl}/price/${price._id}`, body);
			const { data } = response;
			return data;
		}
		const response = await http.post(`${apiUrl}/price`, price);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("savePrice:", error);
	}
}

export async function deletePrice(id) {
	try {
		const response = await http.delete(`${apiUrl}/price/${id}`);
		const { data } = response;
		return data;
	} catch (error) {
		console.log("deletePrice:", error);
	}
}
