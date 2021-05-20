import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/ioModule";

export function getIoModules() {
	return http.get(apiEndpoint);
}

export function saveIoModule(ioModule) {
	//console.log("ioModuleService: IoModule:", ioModule);
	if (ioModule._id) {
		//console.log("ioModuleService: Updating:", ioModule);
		const body = { ...ioModule };
		return http.put(`${apiEndpoint}/${ioModule._id}`, body);
	} else {
		//console.log("ioModuleService: Creating:", ioModule);
		return http.post(apiEndpoint, ioModule);
	}
}

export function updateRelayStatus(body) {
	return http.patch(`${apiEndpoint}/${body.ioModule}`, {
		relay: body.relay,
		inUsed: body.inUsed,
	});
}

export function getRelays() {
	return http.get(`${apiEndpoint}/relays`);
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
