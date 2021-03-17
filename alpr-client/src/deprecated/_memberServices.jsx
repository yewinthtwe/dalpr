import http from './httpService';
import {apiUrl} from '../config.json';

const apiEndpoint = apiUrl + "/members";

function memberUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMembers() {
    return http.get(apiEndpoint);
  }

export function getMember(id) {
    return http.get(memberUrl(id));
  }

  export function saveMember(member) {
    if (member._id) {
      const body = {...member};
      delete body._id;
      return http.put(memberUrl(member._id), body);
    }
    return http.post(apiEndpoint, member);
  }

export function deleteMember(id) {
    return http.delete(memberUrl(id));
}
