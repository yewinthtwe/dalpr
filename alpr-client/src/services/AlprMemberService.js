import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/members";

function memberUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export async function getMembers(source) {
	try {
		const response = await http.get(apiEndpoint, {
			cancelToken: source.token,
		});
		const { data } = response;

		return data;
	} catch (error) {
		if (http.isCancel(error)) {
			return error;
		} else {
			throw error;
		}
	}
}

export async function getMember(id, source) {
	try {
		const response = await http.get(memberUrl(id), {
			cancelToken: source.token,
		});
		const { data } = response;

		return data;
	} catch (error) {
		if (http.isCancel(error)) {
			return error;
		} else {
			throw error;
		}
	}
}

export async function saveMember(member, source) {
	try {
		if (member._id) {
			const body = { ...member };
			delete body._id;
			const response = await http.put(memberUrl(member._id), body, {
				cancelToken: source.token,
			});
			const { data } = response;
			return data;
		}
		const response = await http.post(apiEndpoint, member, {
			cancelToken: source.token,
		});
		const { data } = response;
		return data;
	} catch (error) {
		if (http.isCancel(error)) {
			return error;
		} else {
			throw error;
		}
	}
}

export async function deleteMember(id, source) {
	try {
		const response = await http.delete(memberUrl(id), {
			cancelToken: source.token,
		});
		const { data } = response;

		return data;
	} catch (error) {
		if (http.isCancel(error)) {
			return error;
		} else {
			throw error;
		}
	}
}

export async function updateMember(member, source) {
	try {
		if (member._id) {
			const body = { ...member };
			delete body._id;
			await http.put(memberUrl(member._id), body, {
				cancelToken: source.token,
			});
		}
		const response = await http.post(apiEndpoint, member, {
			cancelToken: source.token,
		});
		const { data } = response;

		return data;
	} catch (error) {
		if (http.isCancel(error)) {
			return error;
		} else {
			throw error;
		}
	}
}

// export function deleteMember(id, source) {
//     return http.delete(memberUrl(id),{
//       cancelToken: source.token,
//     });
// }
