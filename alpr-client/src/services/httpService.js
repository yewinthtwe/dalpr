import axios from "axios";
// import { toast } from "react-toastify";
import logger from "./logService";
import { apiUrl } from "../config.json";

function getCancelToken() {
	const source = axios.CancelToken.source();
	return source;
}

// axios.defaults.headers.common["x-auth-token"] = jwt;
const authAxios = axios.create({
	baseURL: apiUrl,
	withCredentials: true,
	//headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
});

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		logger.log(error);
	}
	return Promise.reject(error);
});

export default {
	get: authAxios.get,
	post: authAxios.post,
	put: authAxios.put,
	patch: authAxios.patch,
	delete: authAxios.delete,
	loginPost: axios.post,
	getCancelToken,
};
