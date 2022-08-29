import axios from "axios";

let token = null;
const root = JSON.parse(window.localStorage.getItem("persist:root"));

if (root) {
	const { auth } = root;
	const { user } = JSON.parse(auth);
	if (user) token = user.token;
}

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
		"x-auth-token": token ? token : "",
	},
});

axiosInstance.interceptors.request.use(
	(req) => {
		return Promise.resolve(req);
	},
	(error) => {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			
		} else {
			console.log(error);
			
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;