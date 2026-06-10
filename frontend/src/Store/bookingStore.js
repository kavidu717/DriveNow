import { create } from "zustand";
import API from "../api/axios";

const useBookingStore = create((set) => ({
  loading: false,

  createBooking: async (bookingData) => {
    try {
      set({ loading: true });

      const res = await API.post(
        "/bookings",
        bookingData
      );

      set({ loading: false });

      return res.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));

export default useBookingStore;