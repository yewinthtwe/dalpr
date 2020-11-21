import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + "/lane";

export function getLaneStatus( ioModuleId ) {
    return http.get(`${apiEndpoint}/${ioModuleId}`);
}

export function setLaneValue( ioModuleId, relayId, relayValue ) {
    const body = {};
    body.ioModuleId = ioModuleId;
    body.relayId = relayId;
    body.relayValue = relayValue;
    return http.post(apiEndpoint, body);
}

