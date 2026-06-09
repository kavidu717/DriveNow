import { create } from "zustand";
import API from "../api/axios";

const useBookingStore = create((set) => ({
  booking: null,
  loading: false,

  createBooking: async (bookingData) => {
    try {
      set({ loading: true });

      const { data } = await API.post("/bookings", bookingData);

      set({
        booking: data.booking,
        loading: false,
      });

      // IMPORTANT: return ONLY booking
      return data.booking;
    } catch (error) {
      set({ loading: false });
      throw error.response?.data?.message || error.message;
    }
  },
}));

export default useBookingStore;