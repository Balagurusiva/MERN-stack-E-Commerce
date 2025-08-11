import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const customError = error.response?.data?.message || error.message;
		return Promise.reject(new Error(customError));
	}
);

export default axiosInstance;
