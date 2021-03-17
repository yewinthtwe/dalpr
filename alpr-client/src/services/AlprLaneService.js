import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/lane";

export async function getLanes(source) {
      try {
        const response = await http.get(apiEndpoint,{
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

export async function saveLane(lane, source) {
      try {
          if (lane._id) {
            const body = {...lane};
            const response = await http.put(`${apiEndpoint}/${lane._id}`, body, { cancelToken: source.token });
            const {data} = response;
            return data;
          } 
          const response = await http.post(apiEndpoint, lane, { cancelToken: source.token });
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

export async function deleteLane(id, source) {
  try {
        const response = await http.delete(`${apiEndpoint}/${id}`, { cancelToken: source.token });
        const {data} = response;
        return data;
      }  catch (error) {
        if (http.isCancel(error)) {
        return error;  
        } else {
          throw error;
        }
      }
}






