import { create } from "zustand";
import API from "../api/axios";

const usePaymentStore = create((set) => ({
  loading: false,

  createOrder: async (amount) => {
    try {
      set({ loading: true });

      const res = await API.post(
        "/payment/create-order",
        { amount }
      );

      set({ loading: false });

      return res.data.orderID;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  captureOrder: async (orderID) => {
    try {
      set({ loading: true });

      const res = await API.post(
        "/payment/capture-order",
        { orderID }
      );

      set({ loading: false });

      return res.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));

export default usePaymentStore;