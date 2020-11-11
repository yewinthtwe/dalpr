import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/gateUsers";

function gateuserUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
export function getGateUsers() {
    return http.get(apiEndpoint);
}

export function getGateUser(gateuserId) {
    return http.get(gateuserUrl(gateuserId));
  }