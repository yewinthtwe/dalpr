import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';
import http from "./httpService";

const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(username, password) {
    // console.log('AlprAuthService:',username, password);
    try {
        const { data: jwt } = await http.post(apiUrl + '/auth', { username, password });
        // console.log('AlprAuthService:',jwt);
        localStorage.setItem(tokenKey, jwt);
    } catch (ex) {
        console.log(ex);
    }
}

export function loginWithjwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout () {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser (){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
        
      }
      catch (ex) {  return null; }
}

export function getJwt (){
 return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithjwt,
    logout,
    getJwt,
    getCurrentUser 
}