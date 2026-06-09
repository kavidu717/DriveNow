import { create } from "zustand";
import API from "../api/axios.js";

const usePaymentStore = create((set) => ({
  orderID: null,
  loading: false,

  createPayPalOrder: async (bookingId) => {
    try {
      set({ loading: true });

      const { data } = await API.post(
        "/payment/create-order",
        { bookingId }
      );

      set({
        orderID: data.orderID,
        loading: false,
      });

      return data.orderID;
    } catch (error) {
      set({ loading: false });

      throw (
        error.response?.data?.message ||
        "Failed to create PayPal order"
      );
    }
  },

  capturePayment: async (orderID, bookingId) => {
    try {
      set({ loading: true });

      const { data } = await API.post(
        "/payment/capture-payment",
        {
          orderID,
          bookingId,
        }
      );

      set({ loading: false });

      return data;
    } catch (error) {
      set({ loading: false });

      throw (
        error.response?.data?.message ||
        "Payment capture failed"
      );
    }
  },
}));

export default usePaymentStore;