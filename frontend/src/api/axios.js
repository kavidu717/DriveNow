import axios from "axios";
import useAuthStore from "../Store/authStore.js";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1", 
});


API.interceptors.request.use(
  (config) => {
   
    const token = useAuthStore.getState().token;

    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;