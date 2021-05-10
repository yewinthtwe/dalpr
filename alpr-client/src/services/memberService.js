import http from "./httpService";
import { apiUrl } from "../config.json";
import _ from "lodash";

const apiEndpoint = apiUrl + "/members";

function memberUrl(id) {
	return `${apiEndpoint}/${id}`;
}

// export async function getMembers() {
// 	try {
// 		const response = await http.get(apiEndpoint);
// 		//const { data } = response;

// 		return response;
// 	} catch (error) {}
// }

// export async function getMember(id) {
// 	try {
// 		const response = await http.get(memberUrl(id));
// 		//const { data } = response;

// 		return response;
// 	} catch (error) {
// 		console.log("memberService: getMember:", error);
// 	}
// }

// export async function saveMember(member) {
// 	try {
// 		if (member.id === 0) {
// 			//console.log("AlprMemberService: NEW saveMember:", member);
// 			const body = { ...member };
// 			delete body.id;
// 			//return http.put(memberUrl(member._id), body);
// 			return http.post(apiEndpoint, body);
// 		} else {
// 			//console.log("AlprMemberService: UPDATE saveMember:", member);
// 			return http.put(memberUrl(member._id), member);
// 		}
// 	} catch (error) {
// 		console.log("memberService: saveMember:", error);
// 	}
// }

// export async function deleteMember(id) {
// 	try {
// 		const response = await http.delete(memberUrl(id));
// 		//const { data } = response;

// 		return response;
// 	} catch (error) {
// 		console.log("memberService: deleteMember:", error);
// 	}
// }

// export async function updateMember(member) {
// 	try {
// 		if (member._id) {
// 			const body = { ...member };
// 			delete body._id;
// 			await http.put(memberUrl(member._id), body);
// 		}
// 		const response = await http.post(apiEndpoint, member);
// 		//const { data } = response;

// 		return response;
// 	} catch (error) {
// 		console.log("memberService: updateMember:", error);
// 	}
// }

// export function deleteMember(id, ) {
//     return http.delete(memberUrl(id),{
//       cancelToken: .token,
//     });
// }

export function getMembers() {
	return http.get(apiEndpoint);
}

export function getMember(id) {
	return http.get(memberUrl(id));
}

export function saveMember(data) {
	let member = _.pick(data[0], [
		"_id",
		"memberName",
		"memberType",
		"address",
		"lp",
		"mobile",
		"email",
		"isActive",
	]);
	if (member._id) {
		console.log("memberService: Update:", member);
		return http.put(memberUrl(member._id), member);
	} else {
		console.log("memberService: Save new member:", member);
		return http.post(apiEndpoint, member);
	}
}

export function deleteMember(id) {
	return http.delete(memberUrl(id));
}
