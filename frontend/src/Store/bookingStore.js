import { create } from "zustand";
import API from "../api/axios.js";

const useBookingStore = create((set, get) => ({
  booking: null, // Temporary storage for checkout preview
  loading: false,
  error: null,

  // VehicleDetails පිටුවෙන් දත්ත ගබඩා කිරීමට
  setBooking: (bookingData) => set({ booking: bookingData }),

  // Backend එකට Booking එක සාර්ථකව යැවීමට
  createBooking: async () => {
    set({ loading: true, error: null });
    try {
      const currentBooking = get().booking;

      if (!currentBooking) {
        throw new Error("No booking details found");
      }

      // Backend එක බලාපොරොත්තු වන විදිහටම Request Body එක සකසා යැවීම
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