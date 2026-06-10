import { create } from "zustand";
import API from "../api/axios.js";

const usePaymentStore = create((set) => ({
  loading: false,

  createOrder: async (amount) => {
    try {
      set({ loading: true });

      const res = await API.post("/payment/create-order", { amount });

      return res.data.orderID;
    } finally {
      set({ loading: false });
    }
  },

  captureOrder: async (orderID) => {
    try {
      set({ loading: true });

      const res = await API.post("/payment/capture", { orderID });

      return res.data;
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePaymentStore;
