import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/axios.js";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      register: async (firstName, lastName, email, password) => {
        const { data } = await API.post("/auth/register", {
          firstName,
          lastName,
          email,
          password,
        });

        return data;
      },

      verifyOtp: async (email, otp) => {
        const { data } = await API.post("/auth/verify-otp", {
          email,
          otp,
        });

        return data;
      },

      login: async (email, password) => {
        const { data } = await API.post("/auth/login", {
          email,
          password,
        });

        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        });

        return data;
      },

      fetchProfile: async () => {
        try {
         
          const { data } = await API.get("/auth/profile"); 
          
          set({ user: data.user });
          return data;
        } catch (error) {
          console.error("Profile fetch error:", error);
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;