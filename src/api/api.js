import axios from "axios";

const api = axios.create({
  baseURL: "https://deutime-backend-spring.onrender.com",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response || error.message);
    return Promise.reject(error);
  }
);

const ApiService = {
  get: (endpoint, params) => api.get(endpoint, { params }),
  post: (endpoint, data) => api.post(endpoint, data),
  put: (endpoint, data) => api.put(endpoint, data),
  delete: (endpoint) => api.delete(endpoint),
};

export default ApiService;
