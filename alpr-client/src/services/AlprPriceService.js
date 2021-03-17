import http from './httpService';
import { apiUrl } from '../config.json';

const priceApiEndPoint = apiUrl + "/price";

export async function getPrice(source) {
      try {
        const response = await http.get(priceApiEndPoint,{
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

export async function savePrice(price, source) {
      try {
          if (price._id) {
            const body = {...price};
            const response = await http.put(`${apiUrl}/price/${price._id}`, body, { cancelToken: source.token });
            const {data} = response;
            return data;
          } 
          const response = await http.post(`${apiUrl}/price`, price, { cancelToken: source.token });
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

export async function deletePrice(id, source) {
  try {
        const response = await http.delete(`${apiUrl}/price/${id}`, { cancelToken: source.token });
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
