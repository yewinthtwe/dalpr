import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/users";


function usersUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers(source) {
    return http.get(apiEndpoint,{
      cancelToken: source.token,
    });
}

export function getUser(userId, source) {
    return http.get(usersUrl(userId),{
      cancelToken: source.token,
    });
}

export function saveUser(user, source) {
    if (user._id) {
      const body = {...user};
      delete body._id;
      return http.put(usersUrl(user._id), body);
    }
    return http.post(apiEndpoint, user,{
      cancelToken: source.token,
    });
}

export function deleteUser(userId, source) {
    return http.delete(usersUrl(userId),{
      cancelToken: source.token,
    });
}


