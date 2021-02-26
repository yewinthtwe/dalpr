import http from './httpService';
import { apiUrl } from '../config.json';

const cameraApiEndPoint = apiUrl + "/configAlpr/camera";
const laneApiEndPoint = apiUrl + "/configAlpr/lane";
const relayApiEndPoint = apiUrl + "/configAlpr/relay";
const ioModuleApiEndPoint = apiUrl + "/configAlpr/iomodule";
const configAlpr = apiUrl + "/configAlpr/config";


export async function getConfig(source) {
        try {
          const response = await http.get(configAlpr,{
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

export async function getLanes(source) {
  try {
    const response = await http.get(laneApiEndPoint,{
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

export async function getRelays(source) {
  try {
    const response = await http.get(relayApiEndPoint,{
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

export async function getIoModules(source) {
  try {
    const response = await http.get(ioModuleApiEndPoint,{
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

export async function saveConfig(config, source) {
      try {
          if (config._id) {
            const body = {...config};
            const response = await http.put(`${apiUrl}/configAlpr/config/${config._id}`, body, { cancelToken: source.token });
            const {data} = response;
            return data;
          } 
          const response = await http.post(`${apiUrl}/configAlpr/config`, config, { cancelToken: source.token });
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

export async function deleteConfig(id, source) {
  try {
        const response = await http.delete(`${apiUrl}/configAlpr/config/${id}`, { cancelToken: source.token });
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



