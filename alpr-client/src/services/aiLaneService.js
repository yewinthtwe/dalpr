import http from "./httpService";
import { apiUrl } from "../config.json";
// import _ from "lodash";

const apiEndpoint = apiUrl + "/aiLane";

export function getAiLanes() {
	return http.get(apiEndpoint);
}

export function saveAiLane(aiLane) {
	if (aiLane._id) {
		const body = { ...aiLane };
		console.log("AiLaneService: saveAiLane: Update:", body);
		return http.put(`${apiEndpoint}/${aiLane._id}`, body);
	} else {
		console.log("AiLaneService: saveAiLane: Save new:", aiLane);
		return http.post(apiEndpoint, aiLane);
	}
}

export function deleteAiLane(id) {
	return http.delete(`${apiEndpoint}/${id}`);
}

// export function syncKey() {
// 	const aiLanes = [
// 		{
// 			name: "aiLane1",
// 			description: "AI lane 1",
// 			camera: "camera1",
// 			relay: "relay1",
// 			relayIdSlot: "1",
// 			dualKey: "aiLane1relay1",
// 			status: false,
// 			inUsed: false,
// 		},
// 		{
// 			name: "aiLane2",
// 			description: "AI lane 2",
// 			camera: "camera2",
// 			relay: "relay2",
// 			relayIdSlot: "2",
// 			dualKey: "aiLane2relay2",
// 			status: false,
// 			inUsed: false,
// 		},
// 		{
// 			name: "aiLane3",
// 			description: "AI lane 3",
// 			camera: "camera3",
// 			relay: "relay3",
// 			relayIdSlot: "3",
// 			dualKey: "aiLane3relay3",
// 			status: false,
// 			inUsed: false,
// 		},
// 	];

// 	const relays = [
// 		{
// 			relayId: 1,
// 			relayValue: 1,
// 			name: "relay1",
// 			description: "Relay 1",
// 			ioModule: "objectStringsample1",
// 			inUsed: false,
// 			laneIdSlot: "aiLane1",
// 			dualKey: "aiLane1relay1",
// 		},
// 		{
// 			relayId: 2,
// 			relayValue: 0,
// 			name: "relay2",
// 			description: "Relay 2",
// 			ioModule: "objectStringsample2",
// 			inUsed: false,
// 			laneIdSlot: "aiLane2",
// 			dualKey: "aiLane2relay2",
// 		},
// 		{
// 			relayId: 3,
// 			relayValue: 0,
// 			name: "relay3",
// 			description: "Relay 3",
// 			ioModule: "objectStringsample3",
// 			inUsed: false,
// 			laneIdSlot: "aiLane3",
// 			dualKey: "aiLane3relay3",
// 		},
// 	];

// 	let dualKey = "aiLane3relay3";
// 	let laneIdSlot = "aiLane3";

// 	_.forEach(relays, (relay) => {
// 		if (
// 			relay.dualKey === dualKey
// 				? ((relay.inUsed = true), (relay.laneIdSlot = laneIdSlot))
// 				: ((relay.inUsed = false), (relay.laneIdSlot = "empty"))
// 		);
// 		console.log("Relays:", relays);
// 	});
// }
