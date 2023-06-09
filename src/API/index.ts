import axios from "axios";

const apiCall = axios.create({
  baseURL: "http://localhost:8080",
});

apiCall.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiCall;
