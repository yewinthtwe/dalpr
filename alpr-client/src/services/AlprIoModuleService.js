import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/ioModule";

export async function getIoModules(source) {
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

// export async function getIoModule(_id,source) {
//   try {
//     const response = await http.get(apiEndpoint/_id,{
//       cancelToken: source.token,
//     });
//     const { data } = response;
//     return data;
//   } catch (error) {
//     if (http.isCancel(error)) {
//       return error;
//     } else {
//       throw error;
//     }
//   }
// }

export async function saveIoModule(ioModule, source) {
	try {
		if (ioModule._id) {
			const body = { ...ioModule };
			const response = await http.put(`${apiEndpoint}/${ioModule._id}`, body, {
				cancelToken: source.token,
			});
			const { data } = response;
			return data;
		}
		const response = await http.post(apiEndpoint, ioModule, {
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

export async function deleteIoModule(id, source) {
	try {
		const response = await http.delete(`${apiEndpoint}/${id}`, {
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
