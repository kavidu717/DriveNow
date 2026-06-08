import { create } from "zustand";
import API from "../api/axios.js";

const useVehicleStore = create((set, get) => ({
  vehicles: [],
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