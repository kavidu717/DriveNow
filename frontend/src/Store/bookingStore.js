import { create } from "zustand";
import API from "../api/axios.js";

const useBookingStore = create((set, get) => ({

  booking: null, 
  currentBooking: null, 
  loading: false,
  error: null,

  setBooking: (bookingData) => set({ booking: bookingData }),

  // 1. Create a new booking
  createBooking: async () => {
    set({ loading: true, error: null });
    try {
      const currentBookingData = get().booking;

      if (!currentBookingData) {
        throw new Error("No booking details found");
      }

      const response = await API.post("/bookings/create", {
        userId: currentBookingData.userId,       // Real User ID from Auth
        vehicleId: currentBookingData.vehicleId, // Real Vehicle ID
        startDate: currentBookingData.startDate,
        estimatedKm: currentBookingData.estimatedKm,
        totalAmount: currentBookingData.totalAmount,
      });

      set({ loading: false });
      return response.data; // Returns { success: true, booking: { ... } }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Booking creation failed";
      set({ error: errorMsg, loading: false });
      return null;
    }
  },

 
  fetchBookingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await API.get(`/bookings/${id}`);
      set({
        currentBooking: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      const errorMsg = error.response?.data?.message || "Failed to fetch booking details";
      set({ error: errorMsg, loading: false });
    }
  },

 
  clearCurrentBooking: () => set({ currentBooking: null }),

}));

export default useBookingStore;