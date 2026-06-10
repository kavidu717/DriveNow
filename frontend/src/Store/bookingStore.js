import { create } from "zustand";
import API from "../api/axios.js";

const useBookingStore = create((set, get) => ({
  booking: null,
  loading: false,
  error: null,

  // SET BOOKING (from VehicleDetails)
  setBooking: (data) => set({ booking: data }),

  clearBooking: () => set({ booking: null }),

  
  createBooking: async () => {
    try {
      set({ loading: true, error: null });

      const booking = get().booking;

      const { data } = await API.post("/bookings/create", {
        userId: booking.userId,
        vehicleId: booking.vehicleId,
        startDate: booking.startDate,
        estimatedKm: booking.estimatedKm,
        totalAmount: booking.totalAmount,
      });

      set({ loading: false });

      return data.booking;
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          "Booking creation failed",
      });

      return null;
    }
  },
}));

export default useBookingStore;