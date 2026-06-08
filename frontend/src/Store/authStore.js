import { create } from "zustand";
import API from "../api/axios.js";

let user = null;

try {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  user = null;
}

const useAuthStore = create((set) => ({

  user,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  // register...
  // verifyOtp...
  // login...
  // logout...

   register: async (firstName, lastName, email, password) => {
    try {
      const { data } = await API.post(
        "/auth/register",
        {
          firstName,
          lastName,
          email,
          password
        }
      );

      return data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  },


  verifyOtp: async (email, otp) => {
    try {
      const { data } = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      return data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "OTP verification failed"
      );
    }
  },


  login: async (email, password) => {
    try {
      const { data } = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const { user, token } = data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
      localStorage.setItem("token", token);

      set({
        user,
        token,
        isAuthenticated: true,
      });

      return data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "Login failed"
      );
    }
  },

  
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));




 

export default useAuthStore;