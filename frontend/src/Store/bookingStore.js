import { create } from "zustand";
import API from "../api/axios.js";

const useBookingStore = create((set, get) => ({
  booking: null, // Temporary storage for checkout preview
  loading: false,
  error: null,

 
  setBooking: (bookingData) => set({ booking: bookingData }),

  createBooking: async () => {
    set({ loading: true, error: null });
    try {
      const currentBooking = get().booking;

      if (!currentBooking) {
        throw new Error("No booking details found");
      }

     
      const response = await API.post("/bookings/create", {
        userId: currentBooking.userId,       // Real User ID from Auth
        vehicleId: currentBooking.vehicleId, // Real Vehicle ID
        startDate: currentBooking.startDate,
        estimatedKm: currentBooking.estimatedKm,
        totalAmount: currentBooking.totalAmount,
      });

      set({ loading: false });
      return response.data; // Returns { success: true, booking: { ... } }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Booking creation failed";
      set({ error: errorMsg, loading: false });
      return null;
    }
  },
}));

export default useBookingStore;