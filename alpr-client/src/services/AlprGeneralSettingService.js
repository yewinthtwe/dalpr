import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/generalSetting";

export async function getGeneralSetting(source) {
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

export async function saveGeneralSetting(generalSetting, source) {
      try {
          if (generalSetting._id) {
            const body = {...generalSetting};
            const response = await http.put(`${apiEndpoint}/${generalSetting._id}`, body, { cancelToken: source.token });
            const {data} = response;
            return data;
          } 
          const response = await http.post(apiEndpoint, generalSetting, { cancelToken: source.token });
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

export async function deleteGeneralSetting(id, source) {
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






