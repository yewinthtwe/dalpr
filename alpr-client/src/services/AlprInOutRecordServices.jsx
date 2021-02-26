import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/inOutRecord";

function inOutRecordUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
export function getInOutRecords(source) {
    return http.get(apiEndpoint,{
      cancelToken: source.token,
    });
}

export function getInOutRecord(inOutRecordId, source) {
    return http.get(inOutRecordUrl(inOutRecordId),{
      cancelToken: source.token,
    });
  }