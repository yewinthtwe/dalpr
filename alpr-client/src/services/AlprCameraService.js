import http from './httpService';
import { apiUrl } from '../config.json';

const cameraApiEndPoint = apiUrl + "/camera";

export async function getCameras(source) {
      try {
        const response = await http.get(cameraApiEndPoint,{
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

export async function saveCamera(camera, source) {
      try {
          if (camera._id) {
            const body = {...camera};
            const response = await http.put(`${apiUrl}/camera/${camera._id}`, body, { cancelToken: source.token });
            const {data} = response;
            return data;
          } 
          const response = await http.post(`${apiUrl}/camera`, camera, { cancelToken: source.token });
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

export async function deleteCamera(id, source) {
  try {
        const response = await http.delete(`${apiUrl}/camera/${id}`, { cancelToken: source.token });
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



