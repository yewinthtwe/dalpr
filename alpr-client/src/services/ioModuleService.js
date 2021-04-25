import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/ioModule";

export function getIoModules() {
	return http.get(apiEndpoint);
}

export function saveIoModule(ioModule) {
	if (ioModule._id) {
		const body = { ...ioModule };
		return http.put(`${apiEndpoint}/${ioModule._id}`, body);
	} else {
		return http.post(apiEndpoint, ioModule);
	}
}

export function deleteIoModule(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}

// export  function getIoModule(_id,) {
//   try {
//     const response = await http.get(apiEndpoint/_id,{
//       cancelToken: .token,
//     });
//     const { data } = response;
//     return data;
//   } catch (error) {

//   }
// }
