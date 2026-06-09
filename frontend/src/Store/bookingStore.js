import { create } from "zustand";
import API from "../api/axios.js";

const useBookingStore = create((set) => ({
  bookings: [],
  booking: null,
  loading: false,

  createBooking: async (bookingData) => {
    try {
      set({ loading: true });

      const { data } = await API.post(
        "/bookings",
        bookingData
      );

      set({
        booking: data.booking,
        loading: false,
      });

      return data.booking;
    } catch (error) {
      set({ loading: false });

      throw (
        error.response?.data?.message ||
        "Booking creation failed"
      );
    }
  },

  getMyBookings: async () => {
    try {
      set({ loading: true });

      const { data } = await API.get("/bookings/my");

      set({
        bookings: data.bookings,
        loading: false,
      });
    } catch (error) {
        console.log(error)
      set({ loading: false });
    }
  },
}));

export default useBookingStore;