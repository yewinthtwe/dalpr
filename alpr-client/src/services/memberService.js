import http from "./httpService";
import { apiUrl } from "../config.json";
import _ from "lodash";

const apiEndpoint = apiUrl + "/members";

function memberUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export async function getMembers() {
	try {
		const response = await http.get(apiEndpoint);
		return response;
	} catch (error) {
		console.log("MemberServiceJs: getMembers: Error:", error);
	}
}

export async function getMember(id) {
	try {
		const response = await http.get(memberUrl(id));
		return response;
	} catch (error) {
		console.log("MemberServiceJs: getMember: Error:", error);
	}
}

export async function saveMember(data) {
	let member = _.pick(data[0], [
		"_id",
		"memberName",
		"memberType",
		"address",
		"lp",
		"obuObjectId",
		"mobile",
		"email",
		"isActive",
	]);
	try {
		if (member._id) {
			const response = await http.put(memberUrl(member._id), member);
			//console.log("memberServiceJs: saveMember:", member);
			return response;
		} else {
			const response = await http.post(apiEndpoint, member);
			//console.log("memberServiceJs: Save new member:", member);
			return response;
		}
	} catch (error) {
		if (error.response) {
			/*
			 * The request was made and the server responded with a
			 * status code that falls out of the range of 2xx
			 */
			//console.log("error response data:", error.response.data);
			//console.log("error response status:", error.response.status);
			//console.log("error response headers:", error.response.headers);
			return error.response;
		} else if (error.request) {
			/*
			 * The request was made but no response was received, `error.request`
			 * is an instance of XMLHttpRequest in the browser and an instance
			 * of http.ClientRequest in Node.js
			 */
			//console.log(error.request);
			return error.request;
		} else {
			// Something happened in setting up the request and triggered an Error
			//console.log("Error", error.message);
			return error.message;
		}
	}
}

export function deleteMember(id) {
	return http.delete(memberUrl(id));
}
