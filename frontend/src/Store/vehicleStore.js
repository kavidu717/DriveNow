import { create } from "zustand";
import API from "../api/axios.js";

const useVehicleStore = create((set, get) => ({
  vehicles: [],
  latestVehicles: [], // 💡 Home page එකට විතරක් අලුත් state එකක්
  vehicle: null,
  loading: false,

  filters: {
    type: "",
    brand: "",
  },

  setFilters: (filters) => {
    set({ filters });
  },

  fetchVehicles: async () => {
    set({ loading: true });
    try {
      const { filters } = get();
      const { data } = await API.get("/vehicles", {
        params: filters,
      });
      set({
        vehicles: data.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

 
  fetchLatestVehicles: async () => {
    set({ loading: true });
    try {
     
      const { data } = await API.get("/vehicles", {
        params: { limit: 12, sort: '-createdAt' } 
      });
      
   
      const latest12 = data.data.slice(0, 12);

      set({
        latestVehicles: latest12,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  fetchVehicleById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await API.get(`/vehicles/${id}`);
      set({
        vehicle: data.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  clearVehicle: () => {
    set({ vehicle: null });
  },
}));

export default useVehicleStore;