import http from '../services/httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/inOutRecord";

function inOutRecordUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
export function getInOutRecords() {
    return http.get(apiEndpoint);
}

export function getInOutRecord(inOutRecordId) {
    return http.get(inOutRecordUrl(inOutRecordId));
  }