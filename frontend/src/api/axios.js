import axios from "axios";
import useAuthStore from "../Store/authStore.js"; // ⚠️ ඔයාගේ authStore එක තියෙන නිවැරදි path එක දෙන්න

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1", // ඔයාගේ Backend base URL එක
});

// ✅ AXIOS INTERCEPTOR
// Backend එකට ඕනෑම Request එකක් යන්න කලින් මේ කොටස ක්‍රියාත්මක වෙනවා
API.interceptors.request.use(
  (config) => {
    // ඔයාගේ Zustand Auth Store එකෙන් කෙලින්ම වත්මන් token එක ලබා ගන්නවා
    const token = useAuthStore.getState().token;

    if (token) {
      // සාර්ථකව token එක තිබේ නම් එය Authorization Header එකට auto එකතු කරනවා
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;