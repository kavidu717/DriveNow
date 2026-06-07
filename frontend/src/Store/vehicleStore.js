import { create } from "zustand";

const useVehicleStore = create((set) => ({
  vehicles: [],

  setVehicles: (vehicles) => {
    set({ vehicles });
  },
}));

export default useVehicleStore;